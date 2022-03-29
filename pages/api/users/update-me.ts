import { getSession } from "next-auth/react";
import { hasPassword, verifyPassword } from "../../../lib/auth";

import Request from "../../../utils/interfaces/Request.interface";
import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import UserService from "../../../server/resources/user/user.service";
// import withRoles from "../../../middleware/withRoles.middleware";
import protect from "../../../middleware/withProtect.middleware";

import NextConnectHandler from "../../../middleware/handler.middleware";
import { UserCreateOptions } from "../../../server/resources/user/user.interface";
const nch = new NextConnectHandler();

export default nch.handler
  .use(protect)
  .patch(async (req: Request, res: NextApiResponse) => {
    console.log("update-me handler.....");
    // const { UserUpdateOptions } = req.body as UserCreateOptions;
    console.log(req.body);

    console.log(req.user);

    // const userService = new UserService();
    // const result = await userService.updateMe(user);
    // res
    //   .status(200)
    //   .json({ status: "success", results: "result.length", data: "result" });
  });

// async function handler(req, res) {
//   if (req.method !== "PATCH") return;

//   const session = await getSession({ req: req });
//   if (!session) {
//     return res.status(401).json({
//       message: "Not authenticated!",
//     });
//   }

//   const userEmail = session.user.email;
//   const { oldPassword, newPassword } = req.body;

//   const client = await connectToDatabase();
//   const usersCollection = await client.db().collection("users");
//   const user = await usersCollection.findOne({ email: userEmail });

//   if (!user) {
//     client.close();
//     return res.status(404).json({
//       message: "User not found!",
//     });
//   }
//   const currentPassword = user.password;
//   const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

//   if (!passwordAreEqual) {
//     client.close();
//     return res.status(403).json({
//       message: "Invalid old password!",
//     });
//   }
//   const hashedPassword = await hasPassword(newPassword);
//   await usersCollection.updateOne(
//     { email: userEmail },
//     { $set: { password: hashedPassword } }
//   );

//   client.close();
//   return res.status(200).json({
//     message: "Password updated!",
//   });
// }

// export default handler;
