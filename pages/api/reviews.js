import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("huludb");

  switch (req.method) {
    case "POST":
      try {
        res.setHeader("Content-Type", "application/json");
        await db.collection("reviews").insertOne(req.body);
        await res.json({ status: 200, data: req.body });
      } catch (error) {
        await res.status(500).json({ error: "Something went wrong !" });
      }
      break;
    case "GET":
      try {
        if (!req.query.number) {
          res.status(500).json({ error: "number is Required in Params" });
        } else if (!req.query.movieId) {
          res.status(500).json({ error: "movie id is Required in Params" });
        } else {
          const reviews = await db
            .collection("reviews")
            .find({ movieId: parseInt(req.query.movieId) })
            .toArray();
          res.json({ status: 200, data: reviews });
        }
      } catch (error) {
        // console.log(error);
        res.status(500).json({ error: "Something went Wrong !" });
      }
      break;
  }
}
