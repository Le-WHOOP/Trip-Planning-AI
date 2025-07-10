using Backend.Bll.Clients.Interfaces;
using static Backend.Bll.Clients.Interfaces.ILlmClient;
using static Backend.Bll.Clients.Interfaces.ILlmClient.Message;

namespace Backend.Bll;

public class Class1
{
    private readonly ILlmClient _llmClient;

    public Class1(ILlmClient llmClient)
    {
        _llmClient = llmClient;
    }

    public Task<string> Test()
    {
        return _llmClient.SendMessageAsync(
            [
                new Message(MessageRole.System, "Be concise"),
                new Message(MessageRole.User, "What color is the sky ?"),
            ]
        );
    }
}
