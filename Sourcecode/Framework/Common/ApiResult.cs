﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Framework.Common
{
    public class ApiResult
    {

        public object Data { get; set; }
        public string Message { get; set; }
        public HttpStatus Status { get; set; }

    }
}