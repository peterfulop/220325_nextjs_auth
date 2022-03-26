import mongoose from "mongoose";
import { RequestHandler } from "next/dist/server/next";

const connectDB =
  (handler: Function) => async (req: Request, res: Response) => {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.mongodburl as string, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    return handler(req, res);
  };

export default connectDB;
