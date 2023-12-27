import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db("huludb");

  await db
    .collection("market")
    .createIndex({ userNumber: 1, movieId: 1 }, { unique: true });
}
