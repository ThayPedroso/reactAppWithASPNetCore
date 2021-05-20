using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Scrambler.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScrambleController : ControllerBase
    {
        private readonly ILogger<ScrambleController> _logger;

        public ScrambleController(ILogger<ScrambleController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{unscrambled}")]
        public String Get(String unscrambled)
        {
            Random r = new Random();
            String random = new String(unscrambled.ToCharArray().OrderBy(s => (r.Next(2) % 2) == 0).ToArray());
            return random;
        }
    }
}