using System;
using System.Linq;

namespace Framework.DynamicQuery
{
    public interface IQuery<T>
    {
        IQueryable<T> Filter(IQueryable<T> items);
    }
}