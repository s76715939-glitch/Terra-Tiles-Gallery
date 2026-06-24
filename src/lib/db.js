import { MongoClient } from "mongodb";
import localBackupTiles from "@/src/data/tiles.json";

let client = null;
let db = null;

export { localBackupTiles };

export async function connectToDatabase() {
  if (db) return { client, db };

  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("<username>")) {
    console.warn("MongoDB connection URI not configured or using default template. Operating in local backup mode.");
    return { client: null, db: null };
  }

  try {
    if (!client) {
      client = new MongoClient(uri, {
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000,
      });
      await client.connect();
    }
    db = client.db();
    console.log("Successfully connected to MongoDB via Atlas Client.");
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas database:", error);
    return { client: null, db: null };
  }
}
