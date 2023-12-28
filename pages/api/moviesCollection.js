import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db("huludb");

  switch (req.method) {
    case "POST":
      try {
        const { imgUrl } = JSON.parse(req.body);
        const bodyObject = JSON.parse(req.body);

        const existingMovie = await db
          .collection("myCollection")
          .findOne({ imgUrl });

        if (existingMovie) {
          await db
            .collection("myCollection")
            .updateOne({ imgUrl }, { $set: bodyObject });
          res.json({ status: 200, message: "success", data: "success" });
        } else {
          await db.collection("myCollection").insertOne(bodyObject);
          res.json({ status: 200, message: "success", data: "success" });
        }
      } catch (error) {
        console.error("Error processing POST request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "GET":
      if (!req.query.number) {
        res.status(500).json({ error: "Number is Required in Params" });
        return;
      }
      try {
        const allCollections = await db
          .collection("myCollection")
          .find({ userNumber: req.query.number })
          .toArray();
        res.json({ status: 200, data: allCollections });
      } catch (error) {
        console.error("Error processing GET request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
}
