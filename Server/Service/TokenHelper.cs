using System.Net;

namespace AspCoreServer.Server.Service
{
    public static class TokenHelper
    {
        public static string GetToken()
        {
            string res =  System.IO.File.ReadAllText("secret.txt");
            return res;
        }
    }
}
