using Microsoft.AspNetCore.SignalR;
namespace backend.NotifyHub;

public class RegoHub : Hub
{
    /*public async Task SendRegoNotification(string message)
    {
        await Clients.All.SendAsync("ReceiveRegoNotification", message);
    }*/
}