import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("huludb");

  switch (req.method) {
    case "POST":
      try {
        if (!req.query.id) {
          res.status(500).json({ error: "id is required" });
        } else if (!req.body) {
          res.status(500).json({ error: "body is required" });
        } else {
          await db
            .collection("tickets")
            .updateOne(
              { _id: new ObjectId(req.query.id) },
              { $push: { slots: req.body } }
            );
          res.json({ status: 200, data: req.body });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }
}
