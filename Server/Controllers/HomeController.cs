using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using AspCoreServer.Server.Service;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using YandexDisk.Client;
using YandexDisk.Client.Http;
using YandexDisk.Client.Protocol;

namespace Asp2017.Server.Controllers
{
    public class HomeController : Controller
    {
        protected readonly IHostingEnvironment HostingEnvironment;
        public HomeController(IHostingEnvironment hostingEnv) => this.HostingEnvironment = hostingEnv;

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return this.View();
        }

        [HttpGet("~/GetRoot")]
        public async Task<JsonResult> GetYandexDiskRoot()
        {
            string token = await HttpContext.GetTokenAsync("access_token");
            IDiskApi diskApi = new DiskHttpApi(token);
            Resource rootResource = await diskApi.MetaInfo.GetInfoAsync(new ResourceRequest
            {
                Limit = 80,
                Offset = 0,
                Path = "/Photo",
            }, CancellationToken.None);
            return Json(rootResource.Embedded.Items.Select(i => i.Name));
        }

//        [HttpGet("~/GetImage")]
//        public async Task<ActionResult> GetAnImage()
//        {
//            string token = TokenHelper.GetToken();
//            IDiskApi diskApi = new DiskHttpApi(token);
//
//            Resource rootResource = await diskApi.MetaInfo.GetInfoAsync(new ResourceRequest
//            {
//                Limit = 80,
//                Offset = 0,
//                Path = "/Photo",
//            }, CancellationToken.None);
//            var t = new Link
//            {
//                Method = "GET",
//                Href = rootResource.Embedded.Items.First().Preview
//            };
//            var preview = await diskApi.Files.DownloadAsync(t);
//            return File(preview, "image/jpeg");
//        }

        [HttpGet("~/GetFullById")]
        public async Task<ActionResult> GetFullImage(string Id)
        {
            string token = TokenHelper.GetToken();
            IDiskApi diskApi = new DiskHttpApi(token);
            Resource rootResource = await diskApi.MetaInfo.GetInfoAsync(new ResourceRequest
            {
                Limit = 80,
                Offset = 0,
                Path = "/Photo",
            }, CancellationToken.None);
            var item = rootResource.Embedded.Items.FirstOrDefault(i => i.Path == Id);
            if (item != null)
            {
                var patchedString = item.Preview.Replace("size=S", "size=XL");
                var link = new Link()
                {
                    Href = patchedString,
                    Method = "Get"
                };
                var image = await diskApi.Files.DownloadAsync(link);
                string b64String = "data:image/jpg;base64," +
                                   Convert.ToBase64String(( image as MemoryStream ).ToArray());
                return Json(b64String);
            }

            throw new FileNotFoundException();
        }

        [HttpGet("~/GetPreviewImages")]
        public async Task<ActionResult> GetPreviewImages(int take = 80, int skip = 0)
        {
            string token = TokenHelper.GetToken();
            IDiskApi diskApi = new DiskHttpApi(token);
            Resource resource = await diskApi.MetaInfo.GetInfoAsync(new ResourceRequest
            {
                Limit = take,
                Offset = skip,
                Path = "/Photo",
            }, CancellationToken.None);
            var links = resource.Embedded.Items.Select(i =>
                new
                {
                    Link = new Link()
                    {
                        Href = i.Preview,
                        Method = "GET"
                    },
                    Id = i.Path
                }
            );
            var tasks = links.Select(i => new
            {
                Task = diskApi.Files.DownloadAsync(i.Link),
                Id = i.Id
            }).ToArray();
            Task.WaitAll(tasks.Select(i => i.Task).ToArray());
            var strings = tasks.Select(i => new {Stream = i.Task.Result as MemoryStream, i.Id})
                .Select(i => new
                {
                    Base64String = "data:image/jpg;base64," + Convert.ToBase64String(i.Stream.ToArray()),
                    Id = i.Id
                });

            return this.Json(strings);
        }


        public IActionResult Error() => this.View();
    }
}
