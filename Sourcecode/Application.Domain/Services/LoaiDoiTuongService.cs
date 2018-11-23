using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class LoaiDoiTuongService : BaseService<LoaiDoiTuong, ApplicationContext>, ILoaiDoiTuongService
    {
        public LoaiDoiTuongService(ILogger<LoaiDoiTuongService> logger, ApplicationContext context) : base(logger,context)
        {
        }
    }
}

