"use strict";

require('reflect-metadata');

function extractParameters(req, res, target, propertyKey) {
  const bodyParameters = Reflect.getMetadata('body', target, propertyKey) || [];
  const paramsParameters = Reflect.getMetadata('params', target, propertyKey) || [];

  const args = [];

  // Extract body parameters
  bodyParameters.forEach(index => {
    args[index] = req.body;
  });

  // Extract route parameters
  paramsParameters.forEach(param => {
    args[param.index] = req.params[param.paramName];
  });

  return args;
}

function initializeControllers(app, controllers) {
  controllers.forEach(controller => {
    const instance = new controller();
    const prefix = Reflect.getMetadata('prefix', controller) || '';
    const routes = Reflect.getMetadata('routes', controller) || [];

    routes.forEach(route => {
      if (typeof app[route.method] === 'function') {
        app[route.method](`${prefix}${route.path}`, route.middleware || [], (req, res) => {
          const args = extractParameters(req, res, controller.prototype, route.handler.name);
          route.handler.apply(instance, [req, res, ...args]);
        });
      } else {
        console.error(`Invalid method: ${route.method} for route: ${prefix}${route.path}`);
      }
    });
  });
}

function initializeModules(app, modules) {
  modules.forEach(module => {
    const controllers = Reflect.getMetadata('controllers', module) || [];
    initializeControllers(app, controllers);
  });
}

module.exports = {
  initializeControllers,
  initializeModules
};
