using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Application.Domain.Services;
using Framework.AspNetIdentity;
using Framework.Common;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Swashbuckle.AspNetCore.Swagger;

namespace Application.IdentityServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("AspNetCore")));
            services.AddDbContext<Application.Domain.Entity.ApplicationContext>(options =>
              options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("Application.IdentityServer")));
            //add aspnet identity
            services.AddIdentity<Framework.AspNetIdentity.ApplicationUser, ApplicationRole>(o =>
                    {
                        // configure identity options
                        o.Password.RequireDigit = false;
                        o.Password.RequireLowercase = false;
                        o.Password.RequireUppercase = false;
                        o.Password.RequireNonAlphanumeric = false;
                        o.Password.RequiredLength = 5;
                    })
                .AddEntityFrameworkStores<ApplicationContext>()
                .AddUserManager<ApplicationUserManager>()
                .AddDefaultTokenProviders();

            //var clients = Configuration.GetSection("ClientSettings").Get<Client[]>();
            //foreach (var item in clients)
            //{
            //    item.ClientSecrets = new List<Secret>{
            //        new Secret("secret".Sha256())
            //        };
            //}

            //var apiResources = Configuration.GetSection("ApiResources").Get<ApiResource[]>();
            ////add identityserver
            //services.AddIdentityServer()
            //   .AddDeveloperSigningCredential()
            //   .AddInMemoryPersistedGrants()
            //   .AddInMemoryIdentityResources(Config.GetIdentityResources())
            //   .AddInMemoryApiResources(apiResources)
            //   //.AddInMemoryClients(Config.GetClients())
            //   .AddInMemoryClients(clients)
            //   .AddAspNetIdentity<ApplicationUser>();

            services.AddTransient<IProfileService, IdentityClaimsProfileService>();
            services.AddTransient<IChucVuService, ChucVuService>();
            services.AddTransient<ICapBacService, CapBacService>();
            services.AddTransient<IDiemCaoService, DiemCaoService>();
            services.AddTransient<IDoiTuongService, DoiTuongService>();
            services.AddTransient<IDonViService, DonViService>();
            services.AddTransient<IHuyenService, HuyenService>();
            services.AddTransient<ILietSyService, LietSyService>();
            services.AddTransient<ILoaiDoiTuongService, LoaiDoiTuongService>();
            services.AddTransient<IMatTranService, MatTranService>();
            services.AddTransient<IThoiKyService, ThoiKyService>();
            services.AddTransient<ITinhService, TinhService>();
            services.AddTransient<IXaService, XaService>();

            services.AddTransient<IUserRoleService, UserRoleService>();
            services.AddTransient<ISoQuyenService, SoQuyenService>();
            services.AddTransient<IUserProvincerService, UserProvincerService>();

            var JwtSettings = Configuration.GetSection("JwtSettings").Get<JwtSettings>();

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.SecurityKey)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    LifetimeValidator = LifetimeValidator
                };
            });


            services.AddMvc();
            //  .AddRazorPagesOptions(options =>
            //  {
            //      options.Conventions.AuthorizeFolder("/Account/Manage");
            //      options.Conventions.AuthorizePage("/Account/Logout");
            //  }) ;


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Aplication API",
                    Description = "Aplication API",
                    TermsOfService = "None",
                    Contact = new Contact
                    {
                        Name = "QuyenTH",
                        Email = string.Empty
                    },
                    License = new License
                    {
                        Name = "Use under LICX"
                    }
                });

                c.SwaggerDoc("v2", new Info
                {
                    Version = "v2",
                    Title = "Aplication API",
                    Description = "Aplication API",
                    TermsOfService = "None",
                    Contact = new Contact
                    {
                        Name = "QuyenTH",
                        Email = string.Empty
                    },
                    License = new License
                    {
                        Name = "Use under LICX"
                    }
                });

                c.AddSecurityDefinition("Bearer", new ApiKeyScheme()
                {
                    Description = "Authorization header using the Bearer scheme",
                    Name = "Authorization",

                    In = "header"
                });

                c.DocumentFilter<SwaggerSecurityRequirementsDocumentFilter>();


                // Set the comments path for the Swagger JSON and UI.
                //get all .document.xml in directory
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var d = new DirectoryInfo(AppContext.BaseDirectory);
                var files = d.GetFiles();
                foreach (var file in files)
                {
                    if (file.Name.EndsWith(".document.xml"))
                    {

                        c.IncludeXmlComments(file.FullName);
                    }
                }
                c.EnableAnnotations();
            });

            //add serilog
            Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(Configuration).CreateLogger();
            var loggerFactory = new Microsoft.Extensions.Logging.LoggerFactory().AddSerilog(Log.Logger);
            services.AddSingleton(loggerFactory).AddLogging();

            // Register no-op EmailSender used by account confirmation and password reset during development
            // For more information on how to enable account confirmation and password reset please visit https://go.microsoft.com/fwlink/?LinkID=532713
         

            ////add authentication
            //services.AddAuthentication("Bearer")
            //     .AddIdentityServerAuthentication(options =>
            //     {
            //         options.Authority = "http://localhost:57907";
            //         options.RequireHttpsMetadata = false;

            //         options.ApiName = "api2";
                     
            //     });

            services.AddScoped<IJwtTokenManagerService, JwtTokenManager>();
            services.Configure<JwtSettings>(options => Configuration.GetSection("JwtSettings").Bind(options));

            //end add authentication

        }

        public bool LifetimeValidator(DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters validationParameters)
        {
            if (expires != null)
            {
                if (DateTime.UtcNow < expires) return true;
            }
            return false;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.SwaggerEndpoint("/swagger/v2/swagger.json", "My API V2");
            });
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                );
            app.UseStaticFiles();
            app.UseAuthentication();
            //app.UseIdentityServer();

            app.UseAccessControlAllowOriginAlways();
            app.UseMvc();
        }



    }
}
