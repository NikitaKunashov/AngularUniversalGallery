using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace Asp2017.Server.Controllers
{
    public class AuthController : Controller
    {
        [HttpGet("~/signin")]
        public async Task<IActionResult> SignIn()
        {
            AuthenticationProperties authenticationProperties = new AuthenticationProperties {RedirectUri = "/"};
            
            var res = this.Challenge(authenticationProperties, "Yandex");
            
            return res;
        }
    }
}
