using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Backend.Bll.Clients.Interfaces;
using Backend.Bll.Configuration;
using Microsoft.Extensions.Options;

namespace Backend.Bll.Clients;

public abstract class LlmClient : ILlmClient
{
    private class CompletionResponse
    {
        public class Choice
        {
            public class MessageContent
            {
                public string Role { get; set; } = string.Empty;
                public string Content { get; set; } = string.Empty;
            }

            public MessageContent Message { get; set; } = new();
        }

        public List<Choice> Choices { get; set; } = new();
    }

    private readonly HttpClient _httpClient;
    protected readonly LlmConfiguration _llmConfiguration;

    protected abstract string Path { get; }
    protected abstract string Model { get; }

    public LlmClient(IOptions<LlmConfiguration> llmConfiguration)
    {
        _llmConfiguration = llmConfiguration.Value;

        _httpClient = new HttpClient();
        _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _llmConfiguration.ApiKey);
    }

    public async Task<string?> SendMessageAsync(IEnumerable<ILlmClient.Message> messages)
    {
        var requestBody = new
        {
            model = Model,
            messages = messages,
        };

        string json = JsonSerializer.Serialize(requestBody).ToLower();
        StringContent content = new StringContent(json, Encoding.UTF8, "application/json");

        HttpResponseMessage response = await _httpClient.PostAsync(Path, content);

        if (response.IsSuccessStatusCode)
        {
            string responseBody = await response.Content.ReadAsStringAsync();
            CompletionResponse? result = JsonSerializer.Deserialize<CompletionResponse>(responseBody, new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = true
            });
            return result?.Choices.FirstOrDefault()?.Message.Content;
        }
        else
        {
            string error = await response.Content.ReadAsStringAsync();
            throw new Exception($"Error {response.StatusCode}: {error}");
        }
    }
}
