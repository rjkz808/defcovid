import { Request, Response, NextFunction } from 'express';
import { InternalServerError, NotFound } from 'http-errors';
import UserModel, { User } from '../models/UserModel';

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  let user: User | null;

  try {
    user = await UserModel.findById(req.params.id);
  } catch (err) {
    if (err instanceof Error) {
      next(new InternalServerError(err.message));
      return;
    }

    next(new InternalServerError('Unknown error'));
    return;
  }

  if (user === null) {
    next(new NotFound('User not found'));
  } else {
    res.send(user);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  let user: User;

  try {
    user = await new UserModel({ ...req.body, points: 0 }).save();
  } catch (err) {
    if (err instanceof Error) {
      next(new InternalServerError(err.message));
      return;
    }

    next(new InternalServerError('Unknown error'));
    return;
  }

  res.send(user);
}

export async function updatePoints(req: Request, res: Response, next: NextFunction) {
  let user: User | null;

  try {
    user = await UserModel.findByIdAndUpdate(req.params.id, { points: req.body.points }).exec();
  } catch (err) {
    if (err instanceof Error) {
      next(new InternalServerError(err.message));
      return;
    }

    next(new InternalServerError('Unknown error'));
    return;
  }

  if (user === null) {
    next(new NotFound('User not found'));
    return;
  }

  user.points = req.body.points;
  res.send(user);
}
