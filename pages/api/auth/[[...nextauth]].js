import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongoclient";
import { verifyPassword } from "@/src/auth/encryption";

export const authOptions = {
  secret: "ggbaijuliolbyiuytgbljihyiuiukj",
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async function (credentials, req) {
        const client = await clientPromise;
        const db = await client.db("chat");
        const collection = db.collection("users");

        const { username, password } = credentials;
        const existingUser = await collection.findOne({ username });
        if (existingUser) {
          const hashedPass = existingUser.password;
          const verified = await verifyPassword(password, hashedPass);
          if (verified) {
            return { name: username, email: username };
          }
        }

        return { id: 1, name: "GG", email: "GG" };
      },
    }),
  ],
  database: "mongodb://localhost:27017/chat",
};

export default NextAuth(authOptions);
