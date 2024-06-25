"use server";

import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

interface SportData {
  name?: string;
  image: string;
}

// Delete Center
export async function deleteCenter(centerId: string) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // Delete sport records associated with the center
    await client.query({
      text: `
        DELETE FROM sports
        WHERE center_id = $1
      `,
      values: [centerId],
    });

    // Delete center images associated with the center
    await client.query({
      text: `
        DELETE FROM center_images
        WHERE center_id = $1
      `,
      values: [centerId],
    });

    // Delete center record itself
    await client.query({
      text: `
        DELETE FROM centers
        WHERE id = $1
      `,
      values: [centerId],
    });

    await client.query("COMMIT");

    revalidatePath("/centers");
    console.log("Center and associated records deleted successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting center and associated records:", error);
    throw error;
  } finally {
    client.release();
  }
}

//Create Sport

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

    // Insert data into the "sport_images" table
    await client.query({
      text: `
        INSERT INTO sport_images (id, sport_id, image_url)
        VALUES (uuid_generate_v4(), $1, $2)
      `,
      values: [sportId, data.image],
    });

    await client.query("COMMIT");
    revalidatePath("/sports"); // Optional: revalidate the sports path after creating a new sport
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

    await client.query({
      text: `
          DELETE FROM sport_images
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

// Create Tag Action

interface TagData {
  name?: string;
  sportId?: string;
  groupId?: string;
}

export async function createTag(data: TagData) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // Check if the tag name already exists
    const existingTagQuery = await client.query({
      text: `
        SELECT id
        FROM tags
        WHERE name = $1
      `,
      values: [data.name],
    });

    if (existingTagQuery.rows.length > 0) {
      throw new Error("Tag name already exists.");
    }

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

      // Calculate the tag count for the associated group
      const tagCountQuery = await client.query({
        text: `
          SELECT COUNT(*)
          FROM group_tags
          WHERE group_id = $1
        `,
        values: [data.groupId],
      });

      const tagCount = parseInt(tagCountQuery.rows[0].count);

      // Update the tag count for the associated group
      await client.query({
        text: `
          UPDATE groups
          SET tag_count = $1
          WHERE id = $2
        `,
        values: [tagCount, data.groupId],
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

//Create Group

export async function createGroup(
  name: string,
  tagIds: string[],
  sportIds: string[]
): Promise<void> {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const result = await client.query(
      `
      INSERT INTO groups (id, name)
      VALUES (uuid_generate_v4(), $1)
      RETURNING id
      `,
      [name]
    );

    const groupId = result.rows[0].id;

    // Insert tags into group_tags table
    await Promise.all(
      tagIds.map(async (tagId) => {
        await client.query(
          `
          INSERT INTO group_tags (group_id, tag_id)
          VALUES ($1, $2)
          `,
          [groupId, tagId]
        );
      })
    );

    // Insert sports into sport_groups table
    await Promise.all(
      sportIds.map(async (sportId) => {
        await client.query(
          `
          INSERT INTO sport_groups (sport_id, group_id)
          VALUES ($1, $2)
          `,
          [sportId, groupId]
        );
      })
    );

    await client.query("COMMIT");
    revalidatePath("/tags");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

//Delete Group

export async function deleteGroup(groupId: string) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // Delete the group record from the "groups" table
    await client.query({
      text: `
        DELETE FROM groups
        WHERE id = $1
      `,
      values: [groupId],
    });

    await client.query("COMMIT");
    revalidatePath("/groups");
    console.log("Group deleted successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting group:", error);
    throw error;
  } finally {
    client.release();
  }
}

interface updateGroupData {
  id: string | number;
  name: string;
  sportIds: Array<string | number>;
  tagIds: Array<string | number>;
}

export async function updateGroup(data: updateGroupData) {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    // Update group name if provided
    if (data.name !== undefined) {
      await client.query({
        text: `
          UPDATE groups
          SET name = $1, last_edited = NOW()
          WHERE id = $2
        `,
        values: [data.name, data.id],
      });
    }

    // Update group's sport associations if provided
    if (data.sportIds !== undefined) {
      // Clear existing sport associations
      await client.query({
        text: `
          DELETE FROM sport_groups
          WHERE group_id = $1
        `,
        values: [data.id],
      });

      // Insert new sport associations
      await Promise.all(
        data.sportIds.map(async (sportId) => {
          await client.query({
            text: `
              INSERT INTO sport_groups (group_id, sport_id)
              VALUES ($1, $2)
            `,
            values: [data.id, sportId],
          });
        })
      );
    }

    // Update group's tag associations if provided
    if (data.tagIds !== undefined) {
      // Clear existing tag associations
      await client.query({
        text: `
          DELETE FROM group_tags
          WHERE group_id = $1
        `,
        values: [data.id],
      });

      // Insert new tag associations
      await Promise.all(
        data.tagIds.map(async (tagId) => {
          await client.query({
            text: `
              INSERT INTO group_tags (group_id, tag_id)
              VALUES ($1, $2)
            `,
            values: [data.id, tagId],
          });
        })
      );

      // Update tag count for the group
      const tagCountQuery = await client.query({
        text: `
          SELECT COUNT(*)
          FROM group_tags
          WHERE group_id = $1
        `,
        values: [data.id],
      });

      const tagCount = parseInt(tagCountQuery.rows[0].count);

      await client.query({
        text: `
          UPDATE groups
          SET tag_count = $1
          WHERE id = $2
        `,
        values: [tagCount, data.id],
      });
    }

    await client.query("COMMIT");
    revalidatePath("/groups");
    console.log("Group updated successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating group:", error);
    throw error;
  } finally {
    client.release();
  }
}
