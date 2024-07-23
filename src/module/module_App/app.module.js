// modules/app.module.js
const { Module } = require('../../decorator/common.decorator');

const DatabaseModule = require('../../database/data.module')
const TestModule = require('../module_test/test.module')
const SampleController = require('../module_test/test.controller')
const UserModule = require('../module_User/user.module')
const UserController = require('../module_User/user.controller')



@Module({
  imports: [DatabaseModule, TestModule, UserModule],
  controllers: [SampleController, UserController]

})
class AppModule { }

module.exports = AppModule;
