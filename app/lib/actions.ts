"use server";

import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

interface SportData {
  name?: string;
  image: string;
}

export async function createSport(data: SportData) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // Insert data into the "sports" table
    const insertedSport = await client.query({
      text: `
        INSERT INTO sports (name)
        VALUES ($1)
        RETURNING id
      `,
      values: [data.name],
    });

    const sportId = insertedSport.rows[0].id;

    // Insert data into the "images" table
    await client.query({
      text: `
        INSERT INTO images (sport_id, image_url)
        VALUES ($1, $2)
      `,
      values: [sportId, data.image],
    });

    await client.query("COMMIT");
    revalidatePath("/sports");

    console.log("Sport created successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating sport:", error);
    throw error;
  } finally {
    client.release();
  }
}

//Delete Sport

export async function deleteSport(sportId: string) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // We need to invert these two queries to enable the delete of the sport and the images.
    // This is befcause your DB is structured with FK and you need to follow the order;
    // Even better you should use ONDELETE (Cascade) to delete the images when the sport is deleted.
    // Delete the associated images from the "images" table
    await client.query({
      text: `
          DELETE FROM images
          WHERE sport_id = $1
        `,
      values: [sportId],
    });

    // Delete the sport record from the "sports" table
    await client.query({
      text: `
        DELETE FROM sports
        WHERE id = $1
      `,
      values: [sportId],
    });

    // Delete the associated images from the "images" table
    await client.query({
      text: `
        DELETE FROM images
        WHERE sport_id = $1
      `,
      values: [sportId],
    });

    await client.query("COMMIT");
    revalidatePath("/sports");
    console.log("Sport and associated images deleted successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting sport and associated images:", error);
    throw error;
  } finally {
    client.release();
  }
}

//Create Tag

interface TagData {
  name?: string;
  sportId?: string;
  groupId?: string;
}

export async function createTag(data: TagData) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // Insert data into the "tags" table
    const insertedTag = await client.query({
      text: `
        INSERT INTO tags (name, last_edited)
        VALUES ($1, NOW())
        RETURNING id
      `,
      values: [data.name],
    });

    const tagId = insertedTag.rows[0].id;

    // If a sport ID is provided, associate the tag with the sport
    if (data.sportId) {
      await client.query({
        text: `
          INSERT INTO sport_tags (sport_id, tag_id)
          VALUES ($1, $2)
        `,
        values: [data.sportId, tagId],
      });
    }

    // If a group ID is provided, associate the tag with the group
    if (data.groupId) {
      await client.query({
        text: `
          INSERT INTO group_tags (group_id, tag_id)
          VALUES ($1, $2)
        `,
        values: [data.groupId, tagId],
      });
    }

    await client.query("COMMIT");
    revalidatePath("/tags"); // Optional: revalidate the tags path after creating a new tag
    console.log("Tag created successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating tag:", error);
    throw error;
  } finally {
    client.release();
  }
}

//Delete Tag

export async function deleteTag(tagId: string) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // Delete the tag record from the "tags" table
    await client.query({
      text: `
        DELETE FROM tags
        WHERE id = $1
      `,
      values: [tagId],
    });

    await client.query("COMMIT");
    revalidatePath("/tags");
    console.log("Tag deleted successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting tag:", error);
    throw error;
  } finally {
    client.release();
  }
}
