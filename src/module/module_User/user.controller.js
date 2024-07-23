const { Controller, Get, Delete, Post, Put, Params } = require('../../decorator/common.decorator')
const { UserService } = require('./user.service');

@Controller('/user')
class UserController {
    constructor() { this.userService = new UserService(); }

    @Get('/')
    async getAllUser(req, res) {
        res.send(await this.userService.getAllUser('user'));
    }

    @Get('/:id')
    async getuser(req, res) {
        const { id } = req.params;
        res.send(await this.userService.getUser('user', id));
    }

    @Put('/:id')
    async update(req, res) {
        const { id } = req.params;
        const { body } = req;
        res.send(await this.userService.updateUser('user', id, body))
    }

    @Post('/')
    async addUser(req, res) {

        const { body } = req;
        res.send(await this.userService.addUser('user', body))
    }

    @Delete('/:id')
    async deleteUser(req, res) {
        const { id } = req.params;
        res.send(await this.userService.deleteUser('user', id))
    }

}

module.exports = UserController;
