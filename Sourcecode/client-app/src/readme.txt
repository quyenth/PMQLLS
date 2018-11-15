|-- app
    |-- modules
        |-- module 1
            |-- +compoments
            |-- module1.module.ts
            |-- module1-routing.module.ts
    |-- core
        |-- + authentication
        |-- + guards
            |-- auth.guard.ts
            |-- no-auth.guard.ts
            |-- admin.guard.ts
        |-- + interceptors
            |-- api-prefix.interceptor.ts
            |-- error-handler.interceptor.ts
            |-- http.token.interceptor.ts
    |-- http //work with httpclient to retrieve data
        |-- base.api.ts // has baseUrl.
        |-- user.service.ts inherit from base.api
        |-- other service....

    |-- shared // chứa các thành phần dùng chung cho dự án.
        |-- + compoments
        |-- + directives
        |-- + pipes
    |-- configs
        |-- app-settings.config.ts
|-- assets: //chứa thư viện jquerys,javascript,css,images...
