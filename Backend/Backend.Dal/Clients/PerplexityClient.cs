using Backend.Dal.Configuration;
using Microsoft.Extensions.Options;

namespace Backend.Dal.Clients;

public class PerplexityClient : LlmClient
{
    protected override string Path => $"{_llmConfiguration.Host}/chat/completions";
    protected override string Model => "sonar-pro";

    public PerplexityClient(IOptions<LlmConfiguration> llmConfiguration) : base(llmConfiguration)
    {
        Console.WriteLine(llmConfiguration.Value.Host);
    }
}
