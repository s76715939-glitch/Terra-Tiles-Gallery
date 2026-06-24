import { NextResponse } from "next/server";
import { connectToDatabase, localBackupTiles } from "@/src/lib/db.js";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const id = searchParams.get("id") || "";

  try {
    const { db } = await connectToDatabase();
    let tiles = [];

    if (db) {
      const collection = db.collection("tiles");
      // Ensure the collection is fully populated with all 16 fallback tiles
      const count = await collection.countDocuments();
      if (count < localBackupTiles.length) {
        try {
          await collection.deleteMany({});
          await collection.insertMany(localBackupTiles);
        } catch (err) {
          console.warn("Seeding database failed, proceeding with available cards", err);
        }
      }
      
      let query = {};
      
      if (id) {
        query.id = id;
      } else {
        if (q) {
          query.title = { $regex: q, $options: "i" };
        }
        if (category && category !== "All") {
          query.category = { $regex: category, $options: "i" };
        }
      }
      
      tiles = await collection.find(query).toArray();
    } else {
      // Fallback local operations
      tiles = [...localBackupTiles];
      if (id) {
        tiles = tiles.filter(t => t.id === id);
      } else {
        if (q) {
          tiles = tiles.filter(t => t.title.toLowerCase().includes(q.toLowerCase()));
        }
        if (category && category !== "All") {
          tiles = tiles.filter(t => t.category.toLowerCase() === category.toLowerCase());
        }
      }
    }

    // Return single tile object if specifically requested
    if (id) {
      if (tiles.length > 0) {
        return NextResponse.json(tiles[0]);
      }
      return NextResponse.json({ error: "Tile not found" }, { status: 404 });
    }

    return NextResponse.json(tiles);
  } catch (error) {
    console.error("API Tiles error:", error);
    // Fallback if some query fails
    return NextResponse.json(localBackupTiles);
  }
}
