const { db } = require("@vercel/postgres");
const {
  centers,
  sports,
  sport_images,
  tags,
  groups, // Add groups from placeholder data
} = require("../app/lib/placeholder-data.js");

async function seedDatabase(client) {
  try {
    // Create UUID extension if not exists
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Create centers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS centers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);

    // Create sports table
    await client.query(`
      CREATE TABLE IF NOT EXISTS sports (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        center_id UUID REFERENCES centers(id)
      );
    `);

    // Create images table
    await client.query(`
      CREATE TABLE IF NOT EXISTS images (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        sport_id UUID REFERENCES sports(id),
        image_url VARCHAR(255) NOT NULL
      );
    `);

    // Create tags table
    await client.query(`
      CREATE TABLE IF NOT EXISTS tags (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        last_edited TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create groups table
    await client.query(`
      CREATE TABLE IF NOT EXISTS groups (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);

    // Associative table for sports and tags
    await client.query(`
      CREATE TABLE IF NOT EXISTS sport_tags (
        sport_id UUID REFERENCES sports(id) ON DELETE CASCADE,
        tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (sport_id, tag_id)
      );
    `);

    // Associative table for centers and tags
    await client.query(`
      CREATE TABLE IF NOT EXISTS center_tags (
        center_id UUID REFERENCES centers(id) ON DELETE CASCADE,
        tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (center_id, tag_id)
      );
    `);

    // Associative table for groups and tags
    await client.query(`
      CREATE TABLE IF NOT EXISTS group_tags (
        group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
        tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (group_id, tag_id)
      );
    `);

    console.log("Database schema created successfully.");

    // Insert data into the "centers" table
    await Promise.all(
      centers.map(async (center) => {
        await client.query({
          text: `
            INSERT INTO centers (id, name)
            VALUES ($1, $2)
            ON CONFLICT (id) DO NOTHING
          `,
          values: [center.id, center.name],
        });
      })
    );

    // Insert data into the "sports" table
    await Promise.all(
      sports.map(async (sport) => {
        await client.query({
          text: `
            INSERT INTO sports (id, name, center_id)
            VALUES ($1, $2, $3)
            ON CONFLICT (id) DO NOTHING
          `,
          values: [sport.id, sport.name, sport.center_id],
        });
      })
    );

    // Insert data into the "images" table
    await Promise.all(
      sport_images.map(async (image) => {
        await client.query({
          text: `
            INSERT INTO images (id, sport_id, image_url)
            VALUES ($1, $2, $3)
            ON CONFLICT (id) DO NOTHING
          `,
          values: [image.id, image.sport_id, image.image_url],
        });
      })
    );

    // Insert data into the "tags" table
    await Promise.all(
      tags.map(async (tag) => {
        await client.query({
          text: `
        INSERT INTO tags (id, name, last_edited)
        VALUES ($1, $2, NOW())
        ON CONFLICT (id) DO UPDATE
        SET name = EXCLUDED.name, last_edited = NOW()
      `,
          values: [tag.id, tag.name],
        });
      })
    );
    // Insert data into the "groups" table
    await Promise.all(
      groups.map(async (group) => {
        await client.query({
          text: `
            INSERT INTO groups (id, name)
            VALUES ($1, $2)
            ON CONFLICT (id) DO NOTHING
          `,
          values: [group.id, group.name],
        });
      })
    );

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  try {
    await seedDatabase(client);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
