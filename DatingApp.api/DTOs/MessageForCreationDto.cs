using System;

namespace DatingApp.api.DTOs
{
    public class MessageForCreationDto
    {
        public int SenderId { get; set;}
        public int RecipientId { get; set;}
        public DateTime MessageSent { get; set;}
        public string Contents { get; set;}
        public MessageForCreationDto(){
            MessageSent = DateTime.Now;
        }
    }
}