import mongoose from "mongoose";

export default class Mongoose {
  public async initialiseDatabaseConnection() {
    const DB = String(process.env.MONGO_PATH)
      .replace("<USERNAME>", String(process.env.MONGO_USER))
      .replace("<PASSWORD>", String(process.env.MONGO_PASSWORD));
    mongoose
      .connect(DB)
      .then(() => {
        console.log("Online DB connection successful!");
      })
      .catch(() => {
        mongoose.connect(String(process.env.MONGO_LOCAL)).then(() => {
          console.log("Local DB connection successful!");
        });
      });
  }

  protected async closeConnection() {
    mongoose.connection.close();
  }
}
