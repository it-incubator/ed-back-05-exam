import { Request, Response, Router } from 'express';
import { userService } from '../services/user-service';

export const userRouter = Router({});

userRouter.get('/', async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.send(users);
});

userRouter.post('/', async (req: Request, res: Response) => {
  const name = req.body.name;
  const login = req.body.login;
  const password = req.body.password;
  const user = await userService.createUser(name, login, password);

  if (user) {
    res.status(201).send(user);
  } else {
    res.sendStatus(400);
  }
});
