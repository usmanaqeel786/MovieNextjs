import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("huludb");

  switch (req.method) {
    case "PATCH":
      try {
        let bodyObject =
          typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        await db
          .collection("market")
          .updateOne({ _id: new ObjectId(req.query.id) }, { $set: bodyObject });
        res.json({ status: 200, data: bodyObject });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "POST":
      try {
        let bodyObject =
          typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        await db.collection("market").insertOne(bodyObject);
        await res.json({ status: 200, data: bodyObject });
      } catch (error) {
        if (error.code === 11000) {
          res.status(500).json({ error: "Already Added to Market !" });
        } else {
          res.status(500).json({ error: error.message });
        }
      }
      break;
    case "GET":
      try {
        if (!req.query.movieId) {
          const market = await db
            .collection("market")
            .find()
            .sort({ price: -1 })
            .toArray();
          res.json({ status: 200, data: market });
        } else {
          const market = await db
            .collection("market")
            .find({ movieId: parseInt(req.query.movieId) })
            .sort({ price: -1 })
            .toArray();
          res.json({ status: 200, data: market });
        }
      } catch (error) {
        res.status(500).json({ error: "Something went Wrong !" });
      }
      break;
  }
}
