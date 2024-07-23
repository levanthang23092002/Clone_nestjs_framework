"use strict";

var client = require('./redisClient');

var getCache = function getCache(key) {
  var data;
  return regeneratorRuntime.async(function getCache$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(client.get(key));

        case 2:
          data = _context.sent;
          return _context.abrupt("return", data ? JSON.parse(data) : null);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var setCache = function setCache(key, data, expiration) {
  return regeneratorRuntime.async(function setCache$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(client.setEx(key, expiration, JSON.stringify(data)));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var delCache = function delCache(key) {
  return regeneratorRuntime.async(function delCache$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          client.del(key, function (err, response) {
            if (err) throw err;
            return response;
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports = {
  getCache: getCache,
  setCache: setCache,
  delCache: delCache
};