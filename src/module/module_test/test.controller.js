const { Controller, Get, Delete, Post, Put, Patch, Params, Body } = require('../../decorator/common.decorator')
const service = require('./test.service');

@Controller('/sample')
class SampleController {
  @Get('/')
  getSample(req, res) {
    service.getAlls()
      .then((result) => { res.send(result) })
      .catch((error) => {
        res.send(error);
      })
  }

  @Get('/:id')
  @Params('id')
  getSampleById(req, res, id) {
    service.getById(parseInt(id))
      .then((result) => { res.send(result); })
      .catch((err) => {
        res.send(err);
      })

  }

  @Post('/')
  @Body()
  createSample(req, res, body) {
    service.addUser(body)
    .then((body) => { res.send(body) })
    .catch((err) => {
      res.send(err);
    })
  }

  @Delete('/:id')
  @Params('id')
  deleteUser(req, res, id) {
    service.deleteUser(id)
    .then((result) => { res.send(result) })
    .catch((err) => {
      res.send(error);
    })
  }

  @Put('/:id')
  @Params('id')
  @Body()
  updateSample(req, res, id, body) {
    service.updateUser(id,body)
    .then((body) => { res.send(body) })
    .catch((err) => {
      res.send(err);
    })
  }


  @Patch('/de/:id')
  @Params('id')
  @Body()
  updateDeSample(req, res, id, body) {
    service.updateDeUser(id,body)
    .then((body) => { res.send(body) })
    .catch((err) => {
      res.send(err);
    })
  }




}

module.exports = SampleController;
