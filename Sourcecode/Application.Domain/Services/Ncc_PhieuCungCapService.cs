using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class Ncc_PhieuCungCapService : BaseService<Ncc_PhieuCungCap, PupilContext>, INcc_PhieuCungCapService
    {
        public Ncc_PhieuCungCapService(ILogger<Ncc_PhieuCungCapService> logger) : base(logger)
        {
        }
    }
}

