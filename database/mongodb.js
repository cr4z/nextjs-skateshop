import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://stevencr4z:5HZxhjfCj3PYqbn@thecluster.rvcf3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
