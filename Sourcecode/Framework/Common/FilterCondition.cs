using Framework.DynamicQuery;
using System;
using System.Collections.Generic;
using System.Text;

namespace Framework.Common
{
    public class FilterCondition
    {
        public bool Paging { get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public List<OrderInfo> Orders { get; set; }
        public List<SearchInfo> SearchCondition { get; set; }
    }

    public class OrderInfo
    {
        public string FieldName { get; set; }
        public bool OrderDesc { get; set; }
    }
    public class SearchInfo
    {
        public string FieldName { get; set; }
        public OperationType OperationType { get; set; }
        public object Value { get; set; }
    }
}
