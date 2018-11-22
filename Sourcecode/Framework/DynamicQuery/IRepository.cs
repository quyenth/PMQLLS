﻿using System;
using System.Linq;

namespace Framework.DynamicQuery
{
    public interface IRepository
    {
        void Attach<T>(T entity) where T : class;

        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        T FindByKey<T>(object key) where T : class;

        T FirstOrDefault<T>(IQuery<T> query) where T : class;

        int Count<T>(IQuery<T> query) where T : class;

        IQueryable<T> GetAll<T>() where T : class;

        IQueryable<T> Get<T>(IQuery<T> query) where T : class;

        IQueryable<T> Get<T>(IQuery<T> query, int pageIndex, int pageSize) where T : class;
        void Save();
    }
}