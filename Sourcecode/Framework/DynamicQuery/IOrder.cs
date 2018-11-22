using System;
using System.Linq;
using System.Linq.Expressions;

namespace Framework.DynamicQuery
{
    public interface IOrder<T>
    {
        IOrderedQueryable<T> Apply(IQueryable<T> queryable);
    }
}