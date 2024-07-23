
const { Module } = require('../../decorator/common.decorator');
const SampleController = require('./test.controller');

@Module({
  imports: [],
  controllers: [SampleController]

})
class TestModule { }

module.exports = TestModule;
