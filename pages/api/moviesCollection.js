import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db("huludb");

  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      await db.collection("myCollection").insertOne(bodyObject);
      break;
    case "GET":
      if (!req.query.number) {
        res.status(500).json({ error: "Number is Required in Params" });
      }
      const allCollections = await db
        .collection("myCollection")
        .find({ userNumber: req.query.number })
        .toArray();

      res.json({ status: 200, data: allCollections });
      break;
  }
}
