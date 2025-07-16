using Backend.Bll.Configuration;
using Microsoft.Extensions.Options;

namespace Backend.Bll.Clients;

public class PerplexityClient : LlmClient
{
    protected override string Path => $"{_llmConfiguration.Host}/chat/completions";
    protected override string Model => "sonar-pro";

    public PerplexityClient(IOptions<LlmConfiguration> llmConfiguration) : base(llmConfiguration) { }
}
