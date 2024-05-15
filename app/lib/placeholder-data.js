const { v4: uuidv4 } = require("uuid");

// Define placeholder data for centers, sports, tags, and groups
const centers = [
  {
    id: uuidv4(), // Generate a unique UUID for each center
    name: "Hackney Football Club",
  },
];

const sports = [
  {
    id: uuidv4(), // Generate a unique UUID for each sport
    name: "Football",
    center_id: centers[0].id, // Assign the center UUID to the sport
  },
];

const sport_images = [
  {
    id: uuidv4(), // Generate a unique UUID for each sport image
    sport_id: sports[0].id, // Use the UUID of the first sport
    image_url: "/sports/football.jpg",
  },
];

const tags = [
  {
    id: uuidv4(), // Generate a unique UUID for each tag
    name: "Sauna",
    last_edited: new Date().toISOString(),
  },
  {
    id: uuidv4(), // Generate a unique UUID for each tag
    name: "Restaurant",
    last_edited: new Date().toISOString(),
  },
];

// Define placeholder data for groups
const groups = [
  {
    id: uuidv4(), // Generate a unique UUID for each group
    name: "Relaxation Facilities",
  },
];

// Define the group-tag associations
const group_tags = [
  {
    group_id: groups[0].id,
    tag_id: tags[0].id, // Sauna tag
  },
  {
    group_id: groups[0].id,
    tag_id: tags[1].id, // Restaurant tag
  },
];

module.exports = {
  centers,
  sports,
  sport_images,
  tags,
  groups,
  group_tags,
};
