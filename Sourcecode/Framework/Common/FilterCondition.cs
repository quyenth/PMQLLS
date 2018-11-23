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

    /// <summary>
    /// OperationType:
    /// 0:EqualTo,
    /// 1:NotEqualTo,
    /// 2:GreaterThan,
    /// 3:GreaterThanEqualTo,
    /// 4:LessThan,
    /// 5:LessThanEqualTo,
    /// 6:Contains,
    /// 7:StartsWith,
    /// 8:EndsWith
    /// </summary>
    public class SearchInfo
    {
        public string FieldName { get; set; }
        /// <summary>
        /// 0:EqualTo,
        /// 1:NotEqualTo,
        /// 2:GreaterThan,
        /// 3:GreaterThanEqualTo,
        /// 4:LessThan,
        /// 5:LessThanEqualTo,
        /// 6:Contains,
        /// 7:StartsWith,
        /// 8:EndsWith
        /// </summary>
        public OperationType OperationType { get; set; }
        public object Value { get; set; }
    }
}
