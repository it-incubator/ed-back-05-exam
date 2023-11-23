import { userRepository } from '../repository/user-repository';
import { ObjectId, WithId } from 'mongodb';
import { cryptoService } from './crypto-service';

export type UserType = {
  name: string;
  login: string;
  passwordHash: string;
};

export type UserViewType = Omit<WithId<UserType>, 'passwordHash'>;

export const userService = {
  async createUser(name: string, login: string, password: string): Promise<UserViewType> {
    //TODO: create correct hash
    //const salt =
    const passwordHash = password;

    const createdId = await userRepository.createUser(name, login, passwordHash);

    return { _id: createdId, login, name };
  },
  async getUsers(): Promise<UserViewType[]> {
    const result = await userRepository.getUsers();

    return result.map(u => ({ name: u.name, login: u.login, _id: u._id }));
  },

  async getUser(login: string): Promise<UserViewType | null> {
    const result = await userRepository.getUser(login);

    if (!result) throw new Error('user not found');

    return { _id: result._id, login: result.login, name: result.name };
  },

  async updateUser(id: string, login: string, name: string): Promise<UserViewType> {
    await userRepository.updateUser(id, { login, name });

    return { _id: new ObjectId(id), name, login };
  },
};
