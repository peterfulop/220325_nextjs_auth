import { NextApiRequest } from "next";
import { UserOptions } from "../../server/resources/user/user.interface";

type User = {
  user: UserOptions;
};

type Request = User & NextApiRequest;

export default Request;
