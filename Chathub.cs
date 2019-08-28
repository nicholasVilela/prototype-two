using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub {
        public async Task SendMessage(string user, string message) {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task JoinChannel(string groupName) {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("ReceiveMessage", $"{Context.ConnectionId} has joined the group {groupName}");
        }

        public async Task SendSelfMessage(string user, string message) {
            await Clients.Users(user).SendAsync("ReceiveMessage", user, message);
        }

        public async Task SendChannelMessage(string groupName, string user, string message) {
            await Clients.Group(groupName).SendAsync("ReceiveMessage", user, message);
        }
    }
}