using System.Text.Json.Serialization;

namespace Backend.Bll.Clients.Interfaces;

public interface ILlmClient
{
    public class Message(Message.MessageRole role, string content)
    {
        public enum MessageRole
        {
            System,
            User,
            Tool,
        }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MessageRole Role { get; } = role;

        public string Content { get; } = content;
    }

    public Task<string> SendMessageAsync(IEnumerable<Message> messages);
}
