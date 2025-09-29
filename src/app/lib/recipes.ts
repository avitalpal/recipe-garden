import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import type { Recipe } from "../types";

export async function fetchAllRecipes(): Promise<Recipe[]> {
  const snap = await getDocs(collection(db, "recipes"));
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Recipe) }));
}
