using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.api.Helpers
{
    public static class extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message){
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
        public static int CalculateAge(this DateTime theBD){
            var age = DateTime.Today.Year - theBD.Year;
            if(theBD.AddYears(age) > DateTime.Today) {
                age--;
            }
            return age;
        }
    }
}