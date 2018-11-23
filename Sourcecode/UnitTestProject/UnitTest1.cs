using Application.Domain.Entity;
using Application.Domain.Services;
using Framework.Common;
using Framework.DynamicQuery;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Serilog;
using Serilog.Events;

using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace UnitTestProject
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().AddJsonFile(AppDomain.CurrentDomain.BaseDirectory  + @"\appsettings.json").Build();

            Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger();

            //Log.Logger = new LoggerConfiguration()
            // .MinimumLevel.Is(LogEventLevel.Verbose)

            // .WriteTo.RollingFile(pathFormat: "log-{Date}.txt", restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Information, retainedFileCountLimit: 30, flushToDiskInterval: TimeSpan.FromSeconds(15), shared: true,
            // outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level}] {Message} {Properties}{NewLine}{Exception}")
            // .Enrich.WithProperty("process", "Worker")
            // .CreateLogger();
            var loggerFactory = new LoggerFactory().AddSerilog(Log.Logger);//.AddConsole(includeScopes: true, minLevel: LogLevel.Debug);


            var provider = new ServiceCollection();
            provider.AddSingleton<IPupilService, PupilService>()
                .AddSingleton(loggerFactory)
                .AddLogging();
            provider.AddDbContext<ApplicationContext>(options => options.UseInMemoryDatabase("ESchool"));
          var t =  provider.BuildServiceProvider();
            var service = t.GetService<IPupilService>();
            ApplicationContext applicationContext = t.GetService<ApplicationContext>();
            //IPupilService service = new PupilService(logger);
            IList<Pupil> pupils = new List<Pupil>(){
                new Pupil()
            {
                ClassName = "FU",
                PupilName = "DongNA7"
            },
            new Pupil()
            {
                ClassName = "FU",
                PupilName = "DongNA2"
            },
            new Pupil()
            {
                ClassName = "FU2",
                PupilName = "DongNA3"
            },
            new Pupil()
            {
                ClassName = "FU2",
                PupilName = "DongNA4"
            }

            };
            service.Add(pupils);
            var filter = Query<Pupil>.Create("ClassName", OperationType.Contains, "FU");
            filter = filter.And(Query<Pupil>.Create("PupilName", OperationType.Contains, "dongna"));
            //var orderFilter = filter.OrderBy(c => c.Desc("PupilName"));


            var result = filter.Filter(applicationContext.Pupils).OrderByProperty("ClassName").OrderByPropertyDescending("PupilName");

            int total = 0;
            var filterConditions = new FilterCondition()
            {
                Paging = true,
                PageIndex = 2,
                PageSize = 2,
                Orders = new List<OrderInfo>
                {
                    new OrderInfo(){FieldName="PupilName"}
                },
                SearchCondition = new List<SearchInfo>
                {
                    new SearchInfo(){FieldName="PupilName",OperationType = OperationType.Contains, Value="dongna"}
                }
            };
            var result2 = service.Filter(filterConditions, out total);

            var pupil = service.Get(c => c.PupilID == 1).FirstOrDefault();
            Console.WriteLine(pupil.PupilName);
        }
    }
}
