/* eslint-disable */
declare namespace NodeJS {
  interface Global {
    _mongoClientPromise?: Promise<MongoClient>;
  }
} 

// global.d.ts
import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// This ensures the file is treated as a module.
export {};
