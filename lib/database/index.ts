import mongoose, { Mongoose } from "mongoose";

const url = process.env.MONGO_URI as string;

type CachedType = {
  conn: Mongoose;
  promise: Promise<Mongoose>;
};

let cached: CachedType = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose || { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) return cached.conn;
  if (!url) return new Error("NO MONGO_URI");

  cached.promise =
    cached.promise ||
    mongoose.connect(url, {
      dbName: "ogsoft-solutions",
      bufferCommands: false,
    } as mongoose.ConnectOptions);

  // cached.conn is always what cached.promise returns
  cached.conn = await cached.promise;

  return cached.conn;
};

export default connectDb;
