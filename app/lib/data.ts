import { sql } from "@vercel/postgres";
import { Sport, Tags, Group } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchSports() {
  noStore();

  try {
    const data = await sql<Sport>`
      SELECT s.id, s.name, i.image_url
      FROM sports s
      JOIN images i ON s.id = i.sport_id;
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch sports data.");
  }
}

export async function fetchTags() {
  noStore();

  try {
    const data = await sql<Tags>`
    SELECT t.id, t.name, t.last_edited
    FROM tags t`;

    return data.rows;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch tags data");
  }
}

export async function fetchGroups() {
  noStore();

  try {
    const data = await sql<Group>`
    SELECT id, name
    FROM groups`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch groups data.");
  }
}
