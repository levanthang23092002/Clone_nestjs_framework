"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18n = exports.deleteUser = exports.updateDeUser = exports.updateUser = exports.addUser = exports.getById = exports.getAlls = exports.getAll = void 0;

var _require = require('../../redis/cache.service'),
    getCache = _require.getCache,
    setCache = _require.setCache,
    delCache = _require.delCache;

var posts = [{
  id: 1,
  name: 'thang',
  title: 'is member NodeJS',
  description: 'Homework 79',
  email: 'levanthang@gmail.com'
}, {
  id: 2,
  name: 'Phúc',
  title: 'is member NodeJS',
  description: 'Homework 26',
  email: 'nguyenhuuphuc@gmail.com'
}];

var getAll = function getAll() {
  return posts;
};

exports.getAll = getAll;

var getAlls = function getAlls() {
  var cachedPosts;
  return regeneratorRuntime.async(function getAlls$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(getCache('allPost'));

        case 3:
          cachedPosts = _context.sent;

          if (!cachedPosts) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", cachedPosts);

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(setCache('allPost', posts, 3600));

        case 8:
          return _context.abrupt("return", posts);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            error: _context.t0.message
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getAlls = getAlls;

var getById = function getById(id) {
  return regeneratorRuntime.async(function getById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          post = posts.find(function (post) {
            return post.id == id;
          });

          if (post) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", "Not found user id : ".concat(id));

        case 4:
          return _context2.abrupt("return", post);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", {
            error: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getById = getById;

var addUser = function addUser(post) {
  return regeneratorRuntime.async(function addUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (post) {
            _context3.next = 2;
            break;
          }

          return _context3.abrupt("return", "Not found post");

        case 2:
          posts.push(post);
          _context3.next = 5;
          return regeneratorRuntime.awrap(delCache('allPost'));

        case 5:
          return _context3.abrupt("return", post);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.addUser = addUser;

var updateUser = function updateUser(id, post) {
  var index;
  return regeneratorRuntime.async(function updateUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          index = posts.findIndex(function (post) {
            return post.id == id;
          });

          if (!(index == -1)) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", "Not found id : ".concat(id));

        case 3:
          posts[index] = post;
          _context4.next = 6;
          return regeneratorRuntime.awrap(delCache('allPost'));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(delCache('Post'));

        case 8:
          return _context4.abrupt("return", post);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.updateUser = updateUser;

var updateDeUser = function updateDeUser(id, post) {
  var index;
  return regeneratorRuntime.async(function updateDeUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          index = posts.findIndex(function (post) {
            return post.id == id;
          });

          if (!(index == -1)) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", "Not found id : ".concat(id));

        case 3:
          posts[index].description = post.description;
          _context5.next = 6;
          return regeneratorRuntime.awrap(delCache('allPost'));

        case 6:
          _context5.next = 8;
          return regeneratorRuntime.awrap(delCache('Post'));

        case 8:
          return _context5.abrupt("return", posts[index]);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.updateDeUser = updateDeUser;

var deleteUser = function deleteUser(id) {
  var index;
  return regeneratorRuntime.async(function deleteUser$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (id) {
            _context6.next = 2;
            break;
          }

          return _context6.abrupt("return", "Not found id : ".concat(id));

        case 2:
          index = posts.findIndex(function (post) {
            return post.id == id;
          });
          posts.splice(index, 1);
          _context6.next = 6;
          return regeneratorRuntime.awrap(delCache('allPost'));

        case 6:
          _context6.next = 8;
          return regeneratorRuntime.awrap(delCache('Post'));

        case 8:
          return _context6.abrupt("return", "delete success user id : ".concat(id));

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.deleteUser = deleteUser;

var i18n = function i18n(callback) {
  callback(posts);
};

exports.i18n = i18n;