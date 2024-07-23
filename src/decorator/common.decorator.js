"use strict";
require('reflect-metadata');

function Controller(prefix = '') {
  return function (target) {
    Reflect.defineMetadata('prefix', prefix, target);
  };
}

function Module(metadata) {
  return function (target) {
    Reflect.defineMetadata('controllers', metadata.controllers, target);
    Reflect.defineMetadata('imports', metadata.imports || [], target);
    Reflect.defineMetadata('exports', metadata.exports || [], target);
  };
}
function createRouteDecorator(method) {
  return function (path, middleware = []) {
    return function (target, propertyKey, descriptor) {
      const routes = Reflect.getMetadata('routes', target.constructor) || [];
      routes.push({
        method: method,
        path: path,
        handler: descriptor.value,
        middleware: Array.isArray(middleware) ? middleware : [middleware],
      });
      Reflect.defineMetadata('routes', routes, target.constructor);
    };
  };
}
function Params(paramName) {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (req, res, ...args) {
      const paramValue = req.params[paramName];
      args.unshift(paramValue);
      return originalMethod.apply(this, [req, res, ...args]);
    };
    return descriptor;
  };
}

function Body() {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (req, res, ...args) {
      const body = req.body;
      args.push(body);
      return originalMethod.apply(this, [req, res, ...args]);
    };
    return descriptor;
  };
}




  const Get = createRouteDecorator('get')
  const Delete = createRouteDecorator('delete')
  const Post = createRouteDecorator('post')
  const Put = createRouteDecorator('put')
  const Patch = createRouteDecorator('patch')

module.exports =  { Controller, Module , Get, Delete, Post, Put, Patch , Params, Body};
