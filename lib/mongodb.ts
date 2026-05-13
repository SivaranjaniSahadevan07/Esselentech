import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Use a guaranteed string after the runtime check
const MONGODB_URI_STRING: string = MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache ?? (global.mongooseCache = { conn: null, promise: null });

async function dbConnect() {
  if (cached.conn) {
    console.log('MongoDB already connected');
    return cached.conn;
  }

  console.log('Connecting to MongoDB...', 'URI present');

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI_STRING);
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connected:', cached.conn.connection.host, cached.conn.connection.name);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;