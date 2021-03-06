using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class LoaiDoiTuongService : BaseService<LoaiDoiTuong, PupilContext>, ILoaiDoiTuongService
    {
        public LoaiDoiTuongService(ILogger<LoaiDoiTuongService> logger) : base(logger)
        {
        }
    }
}

