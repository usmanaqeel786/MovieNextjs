import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("huludb");

  switch (req.method) {
    case "POST":
      try {
        let bodyObject =
          typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        await db.collection("users").insertOne(bodyObject);
        res.json({ status: 200, data: bodyObject });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    case "GET":
      try {
        const user = await db
          .collection("users")
          .findOne({ number: req.query.number });
        if (!req.query.number) {
          res.status(500).json({ error: "Number is Required in Params" });
        } else if (!user) {
          res.status(500).json({ error: "No User Found !" });
        } else res.json({ status: 200, data: user });
      } catch (error) {
        res.status(500).json({ error: "Something went Wrong !" });
      }
  }
}
