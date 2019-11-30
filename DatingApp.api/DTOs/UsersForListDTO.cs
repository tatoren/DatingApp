using System;

namespace DatingApp.api.DTOs
{
    public class UsersForListDTO
    {
        public int id {get;set;}
        public string Username {get;set;}
        public string Gender {get;set;}
        public string KnownAs {get;set;}
        public int Age {get;set;}
        public DateTime Created {get;set;}
        public DateTime LastLoggedIn {get;set;}
        public string City {get;set;}
        public string Country {get;set;}
        public string PhotoUrl {get;set;}
    }
}