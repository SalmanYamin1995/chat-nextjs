import clientPromise from "@/lib/mongoclient";
import { hashPassword } from "@/src/auth/encryption";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(403).json({ msg: "Not authorized" });
  }
  const { username, password } = JSON.parse(req.body);

  const client = await clientPromise;
  const db = client.db("chat");
  const collection = db.collection("users");
  const existingUser = await collection.findOne({
    username,
  });

  if (existingUser) {
    return res.status(403).json({ msg: "Username taken", alreadyExists: true });
  }

  const insertRes = await collection.insertOne({
    username,
    password: await hashPassword(password),
  });

  if (insertRes.acknowledged) {
    return res.status(200).json({ success: true });
  }
  return res.status(403).json({ msg: "Unknown Error", error: true });
}
