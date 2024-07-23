const { Module } = require('../../decorator/common.decorator');
const UserController = require('./user.controller')
const DatabaseModule = require('../../database/data.module');
DatabaseModule.initialize()

@Module({
  imports: [DatabaseModule],
  controllers: [UserController]

})
class UserModule { }
module.exports = UserModule;