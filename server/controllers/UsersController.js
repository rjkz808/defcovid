const { InternalServerError } = require('http-errors');
const UserModel = require('../models/UserModel');

class UsersController {
  static async getUserById(req, res, next) {
    let user;
    try {
      user = await UserModel.findById(req.params.id).exec();
    } catch (err) {
      return next(new InternalServerError(err.message));
    }

    res.send(user);
  }

  static async createUser(req, res, next) {
    let user;
    try {
      user = await new UserModel(req.body).save();
    } catch (err) {
      return next(new InternalServerError(err.message));
    }

    res.send(user);
  }
}

module.exports = UsersController;
