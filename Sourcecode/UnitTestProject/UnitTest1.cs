using Application.Domain.Entity;
using Application.Domain.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Serilog;
using Serilog.Events;

using System;
using System.Linq;


namespace UnitTestProject
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().AddJsonFile(@"C:\Working\DotnetCore\DotnetCore\UnitTestProject\appsettings.json").Build();

            Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger();

            //Log.Logger = new LoggerConfiguration()
            // .MinimumLevel.Is(LogEventLevel.Verbose)

            // .WriteTo.RollingFile(pathFormat: "log-{Date}.txt", restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Information, retainedFileCountLimit: 30, flushToDiskInterval: TimeSpan.FromSeconds(15), shared: true,
            // outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level}] {Message} {Properties}{NewLine}{Exception}")
            // .Enrich.WithProperty("process", "Worker")
            // .CreateLogger();
            var loggerFactory = new LoggerFactory().AddSerilog(Log.Logger);//.AddConsole(includeScopes: true, minLevel: LogLevel.Debug);
            
            
            var provider = new ServiceCollection().AddSingleton<IPupilService, PupilService>()
                .AddSingleton(loggerFactory)
                .AddLogging()
                .BuildServiceProvider();
            var service = provider.GetService<IPupilService>();
            //IPupilService service = new PupilService(logger);
            var p = service.Add(new Pupil()
            {
                ClassName = "FU",
                PupilName = "DongNA"
            });
            Console.WriteLine(p.PupilID);

            var pupil = service.Get(c => c.PupilID == 1).FirstOrDefault();
            Console.WriteLine(pupil.PupilName);
        }
    }
}
