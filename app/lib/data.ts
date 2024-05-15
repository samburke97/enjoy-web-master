"use server";

import { sql } from "@vercel/postgres";
import { Sport, Tags, Group } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

//Fetch Sports

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

//Fetch Tags

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

//Fetch Groups

export async function fetchGroups() {
  noStore();

  try {
    const data = await sql<Group>`
      SELECT g.id, g.name, g.last_edited,
             (
               SELECT COUNT(*)
               FROM group_tags gt
               WHERE gt.group_id = g.id
             ) AS tag_count,
             (
               SELECT json_agg(json_build_object('id', s.id, 'name', s.name))
               FROM sport_groups sg
               LEFT JOIN sports s ON sg.sport_id = s.id
               WHERE sg.group_id = g.id
             ) AS sports,
             (
               SELECT json_agg(json_build_object('id', t.id, 'name', t.name))
               FROM group_tags gt
               LEFT JOIN tags t ON gt.tag_id = t.id
               WHERE gt.group_id = g.id
             ) AS tags
      FROM groups g;
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch groups data.");
  }
}
