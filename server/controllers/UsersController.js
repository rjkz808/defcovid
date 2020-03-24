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
      user = await new UserModel({ ...req.body, points: 0 }).save();
    } catch (err) {
      return next(new InternalServerError(err.message));
    }

    res.send(user);
  }

  static async updatePoints(req, res, next) {
    let user;
    try {
      user = await UserModel.findByIdAndUpdate(req.params.id, { points: req.body.points }).exec();
    } catch (err) {
      return next(new InternalServerError(err.message));
    }

    user.points = req.body.points;
    res.send(user);
  }
}

module.exports = UsersController;
