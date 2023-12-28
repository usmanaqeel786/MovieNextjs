import clientPromise from "@/lib/mongodb";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("huludb");

  if (req.method === "POST") {
    const uploadMiddleware = upload.single("image");
    uploadMiddleware(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      try {
        const imageBuffer = req.file?.buffer;

        if (!imageBuffer || imageBuffer.length === 0) {
          return res.status(400).json({ error: "Invalid or empty image file" });
        }

        const collection = db.collection("images");

        const result = await collection.insertOne({
          image: { buffer: imageBuffer },
        });
        const insertedId = result.insertedId;
        const imageUrl = `/api/image/${insertedId}`;
        res.json({ success: true, imageUrl });
      } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ success: false, error: error.message });
      }
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
