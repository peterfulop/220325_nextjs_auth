import { UserCreateOptions, UserUpdateOptions } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcrypt";
import DBConnection from "../service/dbConnect";

class UserService extends DBConnection {
  constructor() {
    super();
    this.dbConnect();
  }
  public async login(username: string, password: string): Promise<any> {
    try {
      const user = await User.findOne({ username: username }).select(
        "+password"
      );
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return false;
      }
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async signup(newUser: UserCreateOptions) {
    try {
      const user = await User.create(newUser);
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async getUsers(): Promise<UserCreateOptions[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getUser(id: string): Promise<UserCreateOptions> {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async updateUser(
    id: string,
    userUpdate: UserUpdateOptions
  ): Promise<UserCreateOptions> {
    try {
      const user = await User.findByIdAndUpdate(id, userUpdate, {
        new: true,
        runValidators: true,
      });
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteUser(id: string): Promise<UserCreateOptions> {
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
