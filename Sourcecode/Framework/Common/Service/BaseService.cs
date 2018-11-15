using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Linq.Dynamic.Core;


namespace Framework.Common
{
    /// <summary>
    /// implement of IBaseService <see cref="IBaseService{T,DC}"/>
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <typeparam name="DC"></typeparam>
    public class BaseService<T, DC> : IBaseService<T, DC>
        where T : class, new()
        where DC : DbContext, new()
    {

        private readonly ILogger Logger;

        public BaseService(ILogger logger)
        {
            Logger = logger;
        }
        /// <summary>
        /// Adds a new record to the DB
        /// </summary>
        /// <param name="entity">Current Object</param>
        /// <param name="IdPropertyName">Name of the property containing identity Column or the ID returned by 
        /// the DB</param>
        /// <returns><see cref="System.Object"/> </returns>
        public virtual object Add(T entity, string IdPropertyName)
        {
            using (var db = OpenContext())
            {
                db.Set<T>().Add(entity);
                db.SaveChanges();
            }

            var property = entity.GetType().GetProperty(IdPropertyName);

            if (property != null)
                return property.GetValue(entity, null);

            return null;
        }

        /// <summary>
        /// Adds a new record to the DB
        /// </summary>
        /// <param name="entity">Object entity to add</param>
        /// <returns>Object entity return</returns>
        public virtual T Add(T entity)
        {
            try
            {
                using (var db = OpenContext())
                {
                    db.Set<T>().Add(entity);
                    db.SaveChanges();

                    return entity;
                }
            }
            catch (ValidationException ex)
            {
                Logger.LogInformation(ex, ex.Message);
                throw;
            }

        }

        /// <summary>
        /// Add list entity to the DB
        /// </summary>
        /// <param name="entities">a collection of entity</param>
        public virtual void Add(IList<T> entities)
        {
            using (var context = OpenContext())
            {
                foreach (var entity in entities)
                {
                    context.Set<T>().Add(entity);
                }

                context.SaveChanges();
            }
        }

        /// <summary>
        /// Get records from database with limit return records
        /// </summary>
        /// <param name="query">where condition</param>
        /// <returns>records with</returns>
        public virtual IList<T> Get(Expression<Func<T, bool>> query)
        {
            Logger.LogTrace("Get records from database with limit return records");
            Logger.LogInformation("Get records from database with limit return records");
            using (var db = OpenContext())
            {
                var q = db.Set<T>().AsQueryable();

                if (query != null)
                {
                    q = q.Where(query);
                }

                return q.ToList();
            }
        }

        /// <summary>
        /// Get records from database with limit return records
        /// </summary>
        /// <param name="query">where condition</param>
        /// <param name="limit">limit records</param>
        /// <returns>records with</returns>
        public virtual IList<T> Get(Expression<Func<T, bool>> query, int limit)
        {
            using (var db = OpenContext())
            {

                var q = db.Set<T>().AsQueryable();

                if (query != null)
                {
                    q = q.Where(query);
                }

                return q.Take(limit).ToList();
            }
        }

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
        public virtual IList<T> Get<TKey>(Expression<Func<T, bool>> query, Expression<Func<T, TKey>> orderBy, PagingInfo paging, bool sortAsc = true)
        {
            int pageIndex = 1;

            int pageSize = 10;

            if (paging.PageIndex > 0)
            {
                pageIndex = paging.PageIndex;
            }

            if (paging.PageSize > 0 && paging.PageSize < 100)
            {
                pageSize = paging.PageSize;
            }

            using (DC db = OpenContext())
            {
                var q = db.Set<T>().AsQueryable();

                if (null != query)
                {
                    q = q.Where(query);
                }

                paging.TotalCount = q.Count();

                if (orderBy != null)
                {
                    if (sortAsc)
                    {
                        q = q.OrderBy(orderBy);
                    }
                    else
                    {
                        q = q.OrderByDescending(orderBy);
                    }

                }

                q = q.Skip(pageSize * (pageIndex - 1)).Take(pageSize);

                return q.ToList();
            }
        }

        /// <summary>
        /// Select records from DB
        /// </summary>
        /// <typeparam name="TKey"></typeparam>
        /// <param name="orderBy"></param>
        /// <param name="paging"><see cref="PagingInfo"/></param>
        /// <returns>collection of the current type, <see cref="System.Collections.Generic.IList&lt;T&gt;"/></returns>
        /// <remarks>if "to" parameter was passed as 0, it will be defaulted to 100, you can replace it by
        /// a valued defined in the config, and another point of interest, if from > to, from will be
        /// reseted to 0</remarks>
        public virtual IList<T> Get<TKey>(Expression<Func<T, TKey>> orderBy, PagingInfo paging, bool sortAsc = true)
        {
            return Get(null, orderBy, paging, sortAsc);
        }

        public virtual IList<T> Get<TKey>(Expression<Func<T, TKey>> orderBy, PagingInfo paging, bool sortAsc = true, params string[] relates)
        {
            return Get(null, orderBy, paging, sortAsc, relates);
        }

        public virtual IList<T> Get<TKey>(Expression<Func<T, bool>> query, Expression<Func<T, TKey>> orderBy, PagingInfo paging, bool sortAsc = true, params string[] relates)
        {
            int pageIndex = 1;

            int pageSize = 10;

            if (paging.PageIndex > 0)
            {
                pageIndex = paging.PageIndex;
            }

            if (paging.PageSize > 0 && paging.PageSize < 100)
            {
                pageSize = paging.PageSize;
            }

            using (DC db = OpenContext())
            {
                var q = db.Set<T>().AsQueryable();

                if (null != query)
                {
                    q = q.Where(query);
                }

                foreach (var relate in relates)
                {
                    db.Set<T>().Include(relate);
                }

                paging.TotalCount = q.Count();

                if (orderBy != null)
                {
                    if (sortAsc)
                    {
                        q = q.OrderBy(orderBy);
                    }
                    else
                    {
                        q = q.OrderByDescending(orderBy);
                    }

                }

                q = q.Skip(pageSize * (pageIndex - 1)).Take(pageSize);

                return q.ToList();
            }
        }

        /// <summary>
        /// select all records from database
        /// </summary>
        /// <returns></returns>
        public virtual IList<T> All()
        {
            using (var db = OpenContext())
            {
                return db.Set<T>().ToList();
            }
        }

        public virtual bool Contains(Expression<Func<T, bool>> query)
        {
            using (var db = OpenContext())
            {
                return db.Set<T>().Any(query);
            }
        }

        /// <summary>
        /// Deletes the entity upon the defined query
        /// </summary>
        /// <param name="query">Delete Query</param>
        public virtual void Delete(Expression<Func<T, bool>> query)
        {
            using (var db = OpenContext())
            {
                IQueryable<T> result = db.Set<T>().Where(query);

                foreach (T item in result)
                {
                    db.Set<T>().Remove(item);
                }

                if (result.Count() > 0)
                    db.SaveChanges();
            }
        }

        /// <summary>
        /// Updates Entity
        /// </summary>
        /// <param name="entity">Entity which hold the updated information</param>
        /// <param name="query">query to get the same entity from db and perform the update operation</param>
        /// <remarks>this method will do dynamic property mapping between the passed entity
        /// and the entity retrieved from DB upon the query defined, ONLY ValueTypes and strings are
        /// mapped between both entities, NO nested objects will be mapped, you have to do
        /// the objects mapping nested in your entity before calling this method</remarks>
        public virtual void Update(T entity, Expression<Func<T, bool>> query)
        {
            using (DC db = OpenContext())
            {
                //T entityFromDB = db.Set<T>().Where(query).SingleOrDefault();

                //if (null == entityFromDB)

                //    throw new NullReferenceException("Query Supplied to Get entity from DB is invalid, NULL value returned");

                //var objectContext = ((IObjectContextAdapter)db).ObjectContext;

                //var objectSet = objectContext.CreateObjectSet<T>();

                //var keyNames = objectSet.EntitySet.ElementType.KeyMembers.Select(m => m.Name);

                //PropertyInfo[] properties = entityFromDB.GetType().GetProperties();

                //foreach (PropertyInfo property in properties)
                //{
                //    if (null != property.GetSetMethod() && !keyNames.Contains(property.Name))
                //    {
                //        MappingProvider.MapProperties(entity, entityFromDB, property);
                //    }
                //}

                //db.SaveChanges();
                throw new NotImplementedException("Chua implement function nay");
            }
        }

        /// <summary>
        /// Updates Entity
        /// </summary>
        /// <param name="category">Entity which hold the updated information</param>
        public virtual void Update(T category)
        {
            using (DC db = OpenContext())
            {
                db.Set<T>().Attach(category);

                db.Entry<T>(category).State = EntityState.Modified;

                db.SaveChanges();
            }
        }

        /// <summary>
        /// Singles the specified query.
        /// </summary>
        /// <param name="query">The query.</param>
        /// <returns></returns>
        public virtual T Single(Expression<Func<T, bool>> query)
        {
            using (DC db = OpenContext())
            {
                T result = db.Set<T>().Where(query).SingleOrDefault();

                return result;
            }
        }

        /// <summary>
        /// Finds the specified id.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <returns></returns>
        public virtual T Find(params object[] keyValues)
        {
            using (DC db = OpenContext())
            {
                //var objectContext = ((IObjectContextAdapter)db).ObjectContext;

                //var objectSet = objectContext.CreateObjectSet<T>();

                //var keyNames = objectSet.EntitySet.ElementType.KeyMembers.Select(m => m.Name);

                T result = db.Set<T>().Find(keyValues);

                return result;
            }
        }

        public virtual TreeNode GetGroupTree(params string[] fields)
        {
            using (var context = OpenContext())
            {
                var q = context.Set<T>().AsQueryable();
                foreach (var field in fields)
                {
                    q.Select(field);
                }

                return null;
            }
        }



        //public IPropertyService PropertyService { get; set; }
        //public IRegionService RegionService { get; set; }

        protected virtual DC OpenContext()
        {
            //if (typeof(DC) == typeof(CKFrameworkEntities))
            //{
            //    return new DC();
            //}

            //string regionId = PropertyService.GetValue<string>(HttpContext.Current.Session.CurrentUser().AccountName, Constant.USER_REGION);

            //int rId;
            //if (regionId != null && int.TryParse(regionId, out rId))
            //{
            //    Region r = RegionService.Single(c => c.Id == rId);

            //    var sqlBuilder = new SqlConnectionStringBuilder
            //    {
            //        DataSource = r.DataSource,
            //        InitialCatalog = r.InitialCatalog,
            //        IntegratedSecurity = false,
            //        PersistSecurityInfo = true,
            //        UserID = r.SchemaLogin,
            //        Password = r.SchemaPassword,
            //        MultipleActiveResultSets = true,
            //    };

            //    var entityBuilder = new EntityConnectionStringBuilder
            //    {
            //        Provider = "System.Data.SqlClient",
            //        ProviderConnectionString = sqlBuilder.ToString(),
            //        Metadata = r.Metadata,
            //    };

            //    DbConnection con = new EntityConnection(entityBuilder.ToString());

            //    var context = (DC)Activator.CreateInstance(typeof(DC), con);

            //    return context;
            //}

            var dc = new DC();
            return dc;
        }
    }
}
