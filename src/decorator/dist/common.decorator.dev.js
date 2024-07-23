"use strict";

require('reflect-metadata');

function Controller() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
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
  return function (path) {
    var middleware = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return function (target, propertyKey, descriptor) {
      var routes = Reflect.getMetadata('routes', target.constructor) || [];
      routes.push({
        method: method,
        path: path,
        handler: descriptor.value,
        middleware: Array.isArray(middleware) ? middleware : [middleware]
      });
      Reflect.defineMetadata('routes', routes, target.constructor);
    };
  };
}

function Params(paramName) {
  return function (target, key, descriptor) {
    var originalMethod = descriptor.value;

    descriptor.value = function (req, res) {
      var paramValue = req.params[paramName];

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      args.unshift(paramValue);
      return originalMethod.apply(this, [req, res].concat(args));
    };

    return descriptor;
  };
}

function Body() {
  return function (target, key, descriptor) {
    var originalMethod = descriptor.value;

    descriptor.value = function (req, res) {
      var body = req.body;

      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      args.push(body);
      return originalMethod.apply(this, [req, res].concat(args));
    };

    return descriptor;
  };
}

var Get = createRouteDecorator('get');
var Delete = createRouteDecorator('delete');
var Post = createRouteDecorator('post');
var Put = createRouteDecorator('put');
var Patch = createRouteDecorator('patch');
module.exports = {
  Controller: Controller,
  Module: Module,
  Get: Get,
  Delete: Delete,
  Post: Post,
  Put: Put,
  Patch: Patch,
  Params: Params,
  Body: Body
};