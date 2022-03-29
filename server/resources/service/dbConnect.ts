import mongoose from "mongoose";

type connections = {
  isConnected?: mongoose.ConnectionStates;
};

export default class DBConnection {
  public async dbConnect() {
    const connection: connections = {};
    if (connection.isConnected) {
      return;
    }
    const URI = String(process.env.MONGO_PATH)
      .replace("<USERNAME>", String(process.env.MONGO_USER))
      .replace("<PASSWORD>", String(process.env.MONGO_PASSWORD));

    const DB = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    connection.isConnected = DB.connections[0].readyState;
  }
}
