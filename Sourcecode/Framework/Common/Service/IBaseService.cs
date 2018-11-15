
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Framework.Common
{
    /// <summary>
    /// Base service class, support for query to database
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <typeparam name="DC"></typeparam>
    public interface IBaseService<T, DC>
        where T : class, new()
        where DC : DbContext, new()
    {
        /// <summary>
        /// Adds a new record to the DB
        /// </summary>
        /// <param name="entity">Current Object</param>
        /// <param name="IdPropertyName">Name of the property containing identity Column or the ID returned by 
        /// the DB</param>
        /// <returns><see cref="System.Object"/> </returns>
        object Add(T entity, string IdPropertyName);

        /// <summary>
        /// Adds a new record to the DB
        /// </summary>
        /// <param name="entity">Object entity to add</param>
        /// <returns>Object entity return</returns>
        T Add(T entity);

        /// <summary>
        /// Add list entity to the DB
        /// </summary>
        /// <param name="entities">a collection of entity</param>
        void Add(IList<T> entities);

        /// <summary>
        /// Get records from database with limit return records
        /// </summary>
        /// <param name="query">where condition</param>
        /// <returns>records with</returns>
        IList<T> Get(Expression<Func<T, bool>> query);

        /// <summary>
        /// Get records from database with limit return records
        /// </summary>
        /// <param name="query">where condition</param>
        /// <param name="limit">limit records</param>
        /// <returns>records with</returns>
        IList<T> Get(Expression<Func<T, bool>> query, int limit);

        /// <summary>
        /// Select From DB on the defined query
        /// </summary>
        /// <param name="query">Select Query</param>
        /// <param name="orderBy">Order query</param>
        /// <param name="paging">paging info, page</param>
        /// <returns>collection of the current type, <see cref="System.Collections.Generic.IList&lt;T&gt;"/></returns>
        /// <remarks>if "to" parameter was passed as 0, it will be defaulted to 100, you can replace it by
        /// a valued defined in the config, and another point of interest, if from > to, from will be
        /// reseted to 0.
        /// 
        /// if there is no query defined, all results will be returned, and also if there is no load data options
        /// defined, the results will contain only the entity specified with no nested data (objects) within that entity.
        /// </remarks>
        IList<T> Get<TKey>(Expression<Func<T, bool>> query, Expression<Func<T, TKey>> orderBy, PagingInfo paging, bool sortAsc = true);

        /// <summary>
        /// Select records from DB
        /// </summary>
        /// <typeparam name="TKey"></typeparam>
        /// <param name="orderBy">Order by expression</param>
        /// <param name="paging"><see cref="PagingInfo"/></param>
        /// <returns>collection of the current type, <see cref="System.Collections.Generic.IList&lt;T&gt;"/></returns>
        /// <remarks>if "to" parameter was passed as 0, it will be defaulted to 100, you can replace it by
        /// a valued defined in the config, and another point of interest, if from > to, from will be
        /// reseted to 0</remarks>
        IList<T> Get<TKey>(Expression<Func<T, TKey>> orderBy, PagingInfo paging, bool sortAsc = true);

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TKey"></typeparam>
        /// <param name="orderBy"></param>
        /// <param name="paging"></param>
        /// <param name="relates"></param>
        /// <returns></returns>
        IList<T> Get<TKey>(Expression<Func<T, TKey>> orderBy, PagingInfo paging, bool sortAsc = true, params string[] relates);

        /// <summary>
        /// Select records from DB
        /// </summary>
        /// <typeparam name="TKey"></typeparam>
        /// <param name="orderBy">Order by expression</param>
        /// <param name="paging"><see cref="PagingInfo"/></param>
        /// <param name="relates">include relates</param>
        /// <returns>collection of the current type, <see cref="System.Collections.Generic.IList&lt;T&gt;"/></returns>
        /// <remarks>if "to" parameter was passed as 0, it will be defaulted to 100, you can replace it by
        /// a valued defined in the config, and another point of interest, if from > to, from will be
        /// reseted to 0</remarks>
        IList<T> Get<TKey>(Expression<Func<T, bool>> query, Expression<Func<T, TKey>> orderBy, PagingInfo paging, bool sortAsc = true, params string[] relates);

        /// <summary>
        /// Select all records from database
        /// </summary>
        /// <returns>All records</returns>
        IList<T> All();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        bool Contains(Expression<Func<T, bool>> query);

        /// <summary>
        /// Deletes the entity upon the defined query
        /// </summary>
        /// <param name="query">Delete Query</param>
        void Delete(Expression<Func<T, bool>> query);

        /// <summary>
        /// Updates Entity
        /// </summary>
        /// <param name="entity">Entity which hold the updated information</param>
        /// <param name="query">query to get the same entity from db and perform the update operation</param>
        /// <remarks>this method will do dynamic property mapping between the passed entity
        /// and the entity retrieved from DB upon the query defined, ONLY ValueTypes and strings are
        /// mapped between both entities, NO nested objects will be mapped, you have to do
        /// the objects mapping nested in your entity before calling this method</remarks>
        void Update(T entity, Expression<Func<T, bool>> query);


        /// <summary>
        /// Updates the specified entity.
        /// </summary>
        /// <param name="category">The entity to update</param>
        void Update(T category);


        /// <summary>
        /// Singles the specified query.
        /// </summary>
        /// <param name="query">The query expression</param>
        T Single(Expression<Func<T, bool>> query);


        /// <summary>
        /// Finds the specified key values.
        /// </summary>
        /// <param name="keyValues">The key values.</param>
        /// <returns></returns>
        T Find(params object[] keyValues);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fields"></param>
        /// <returns></returns>
        TreeNode GetGroupTree(params string[] fields);

    }
}
