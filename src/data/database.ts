import { open, writeFile } from "fs/promises";
import { Low, JSONFile } from "lowdb";
import { errorLogger } from "../util";

interface Database {
  items: { [id: string]: Data.Item };
  containers: { [id: string]: Data.Container };
  rooms: { [id: string]: Data.Room };
  locations: { [id: string]: Data.Location };
  quickSelect: { [id: string]: Data.QuickSelect };
  blueprints: { [id: string]: Data.Blueprint };
  lists: { [id: string]: Data.List };
}

type EntryName =
  | "items"
  | "containers"
  | "rooms"
  | "locations"
  | "quickSelect"
  | "blueprints"
  | "lists";

type UpdateEntry = (props: { id: number; type: EntryName; item: Data.EntryType }) => Promise<void>;

/** Main DB connection */
let db: Low<Database> | undefined;

/** Initialize the database, must be called first */
export const initDatabase = async (filePath: string) => {
  try {
    await open(filePath, "wx");
  } catch (error) {
    errorLogger(error);
  }

  const adapter = new JSONFile<Database>(filePath);
  db = new Low(adapter);
  await db.read();
};

/**
 * Called on application close to ensure data retension
 */
export const closeDatabaseConnection = async () => {
  await db?.write();
  db = undefined;
};

/**
 * Deletes the current database
 */
export const clearDatabase = () => {
  db = undefined;
};

/**
 * Update a single entry in the db
 */
export const updateEntry: UpdateEntry = async ({ id, item, type }) => {
  switch (type) {
    case "items":
  }
};
