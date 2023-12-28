import clientPromise from "@/lib/mongodb";
import { MongoClient, ObjectId, Binary } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("huludb");

  const { id } = req.query;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid image ID" });
  }

  const collection = db.collection("images");

  try {
    const result = await collection.findOne({ _id: new ObjectId(id) });

    if (!result || !result.image || !result.image.buffer) {
      return res.status(404).json({ error: "Image not found" });
    }

    const imageBuffer =
      result.image.buffer instanceof Binary
        ? result.image.buffer.buffer
        : result.image.buffer;

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Content-Length", imageBuffer.length);

    res.status(200).end(imageBuffer);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
