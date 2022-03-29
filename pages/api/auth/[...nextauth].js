import NextAuth, { IncomingRequest } from "next-auth";
import { verifyPassword } from "../../../lib/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserService from "../../../server/resources/user/user.service";

// // interface Credentials {
// //   email: string;
// //   password: string;
// //   name?: string;
// //   id?: string;
// // }

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         console.log(credentials);

//         const userService = new UserService();
//         const user = await userService.getUser(credentials.email);
//         if (!user) {
//           throw new Error("nouser");
//         }

//         const isValid = await verifyPassword(
//           credentials.password,
//           user.password
//         );

//         if (!isValid) {
//           throw new Error("Could not log in!");
//         }
//         return { email: user.email, name: user.username, role: user.roles };
//       },
//     }),
//   ],
// });
// import NextAuth from "next-auth";
// import { verifyPassword } from "../../../lib/auth";
// import connectToDatabase from "../../../lib/db";
// import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const userService = new UserService();
        const user = await userService.getUser(credentials.email);

        if (!user) {
          throw new Error("No user found!");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Could not log in!");
        }

        return { email: user.email };
      },
    }),
  ],
});
