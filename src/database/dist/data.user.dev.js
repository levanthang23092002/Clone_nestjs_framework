"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DatabaseModule = require('../database/data.module');

var UserRepositorys =
/*#__PURE__*/
function () {
  function UserRepositorys() {
    _classCallCheck(this, UserRepositorys);
  }

  _createClass(UserRepositorys, [{
    key: "findAll",
    value: function findAll(tableName) {
      var result;
      return regeneratorRuntime.async(function findAll$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(DatabaseModule.query("SELECT * FROM \"".concat(tableName, "\"")));

            case 3:
              result = _context.sent;
              return _context.abrupt("return", result.rows);

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.error('Error fetching users:', _context.t0.message);
              throw _context.t0;

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }]);

  return UserRepositorys;
}();

function findAll(tableName) {
  var result;
  return regeneratorRuntime.async(function findAll$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(DatabaseModule.query("SELECT * FROM \"".concat(tableName, "\"")));

        case 3:
          result = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(result.rows);

        case 6:
          return _context2.abrupt("return", _context2.sent);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching users:', _context2.t0.message);
          throw _context2.t0;

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function findById(tableName, id) {
  var result;
  return regeneratorRuntime.async(function findById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(DatabaseModule.query("SELECT * FROM \"".concat(tableName, " WHERE id = $1\""), [id]));

        case 3:
          result = _context3.sent;
          return _context3.abrupt("return", result.rows);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error('Error fetching users:', _context3.t0.message);
          throw _context3.t0;

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

module.exports = {
  findAll: findAll,
  findById: findById,
  UserRepositorys: UserRepositorys
};