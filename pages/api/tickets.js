import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("huludb");

  switch (req.method) {
    case "POST":
      try {
        let bodyObject =
          typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        await db.collection("tickets").insertOne(bodyObject);
        res.json({ status: 200, data: bodyObject });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    case "PATCH":
      if (!req.query.id) {
        res.status(500).json({ error: "id is required in params" });
      } else {
        try {
          let bodyObject =
            typeof req.body === "string" ? JSON.parse(req.body) : req.body;
          await db
            .collection("tickets")
            .updateOne({ _id: new ObjectId(req.query.id) }, { $set: req.body });
          res.json({ status: 200, data: bodyObject });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    case "GET":
      try {
        const tickets = await db
          .collection("tickets")
          .find({ movieId: parseInt(req.query.movieId) })
          .toArray();
        if (!req.query.movieId) {
          const tickets = await db.collection("tickets").find().toArray();
          res.json({ status: 200, data: tickets });
        } else {
          res.json({ status: 200, data: tickets });
        }
      } catch (error) {
        // console.log(error);
        res.status(500).json({ error: "Something went Wrong !" });
      }
  }
}
