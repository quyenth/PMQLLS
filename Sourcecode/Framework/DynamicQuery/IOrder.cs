using System.Linq;

namespace Framework.DynamicQuery
{
    public interface IOrder<T>
    {
        IOrderedQueryable<T> Apply(IQueryable<T> queryable);
    }
}