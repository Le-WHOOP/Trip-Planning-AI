using System.Text.Json;
using Backend.Bll.Clients.Interfaces;
using Backend.Bll.Models;
using Microsoft.Extensions.Logging;
using NJsonSchema;

namespace Backend.Bll.Services;

public class TravelService
{
    private static string Prompt(int attractionCount) => @$"
You will be given a JSON schema that defines the structure of a travel plan. Based on this schema, you must generate a complete trip itinerary using the user-provided input.

The travel plan must:
- Include cities to visit, with associated start and end dates.
- Each city must include a list of attractions that align with the user's stay dates. Provide no fewer than {attractionCount} distinct attractions, while keeping in mind the user's interests.
- For each attraction, provide:
  - Its name
  - A short description
  - A website link (if available)
- Include one accommodation per city, with its name and a link to its website.
- Include clear travel instructions for how to move from one city to the next.
- Ensure that the attractions match the travel period and city they are assigned to.
- Match the style and purpose specified in the user input (e.g. interest in traditional places, specific sites like the Tokyo Skytree, etc.).

Strictly adhere to the given JSON schema in your output. Do not include any extra commentary or formatting outside of the JSON object.
";

    private readonly ILogger<TravelService> _logger;
    private readonly ILlmClient _llmClient;

    public TravelService(ILogger<TravelService> logger, ILlmClient llmClient)
    {
        _logger = logger;
        _llmClient = llmClient;
    }

    private string GetResponseStructure()
    {
        return JsonSchema.FromType<Response>().ToJson();
    }

    private Response? ParseResponse(string? response)
    {
        if (response is null)
        {
            _logger.LogWarning("Response is null");
            return null;
        }

        Response? result;
        try
        {
            result = JsonSerializer.Deserialize<Response>(response, new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = true
            });
        }
        catch
        {
            result = null;
        }

        if (result is null)
            _logger.LogWarning("Response couldn't be parsed");

        return result;
    }

    private Task<string?> GenerateSuggestion(string prompt, string format, string data)
    {
        try
        {
            return _llmClient.SendMessageAsync(
            [
                new ILlmClient.Message(ILlmClient.Message.MessageRole.System, prompt),
                new ILlmClient.Message(ILlmClient.Message.MessageRole.System, format),
                new ILlmClient.Message(ILlmClient.Message.MessageRole.User, data),
            ]);
        }
        catch
        {
            return Task.FromResult<string?>(null);
        }
    }

    public async Task<Response> DoYourThing(Request request)
    {
        // Should suggest at least one attraction for each day of the duration
        int requestedAttractionCount = (request.To - request.From).Days;
        string prompt = Prompt(requestedAttractionCount);
        string responseStructure = GetResponseStructure();
        string data = JsonSerializer.Serialize(request);

        Response? result;
        do
        {
            result = ParseResponse(await GenerateSuggestion(prompt, responseStructure, data));
        } while (result is null);

        int suggestedAttractionCount = result.InterestPoints.Attractions.Count;
        if (suggestedAttractionCount < requestedAttractionCount)
            _logger.LogWarning("Expected {Requested} attractions, but got only {Suggested}", requestedAttractionCount, suggestedAttractionCount);
        return result;
    }
}
