import { cryptoService } from '../services/crypto-service';
import { UserType } from '../services/user-service';
import { ObjectId, WithId } from 'mongodb';
import { usersCollection } from '../db/runDb';

export const userRepository = {
  async getUsers(): Promise<WithId<UserType>[]> {
    return usersCollection.find().toArray();
  },

  getUser(login: string): Promise<WithId<UserType> | null> {
    return usersCollection.findOne({ login });
  },

  async createUser(name: string, login: string, passwordHash: string): Promise<ObjectId> {
    const result = await usersCollection.insertOne({ name, login, passwordHash });

    return result.insertedId;
  },

  async updateUser(id: string, { name, login }: Omit<UserType, 'passwordHash'>): Promise<void> {
    await usersCollection.updateOne({ _id: new ObjectId(id) }, { name, login });
  },
};
