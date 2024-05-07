const { v4: uuidv4 } = require("uuid");

const centers = [
  {
    id: "1e56d9f7-97ef-4bb1-bbb7-5cc04dc8be76",
    name: "Hackney Football Club",
  },
];

const sports = [
  {
    id: "8e173c77-9f48-4561-a1d0-e2e109a499a7",
    name: "Football",
    center_id: "1e56d9f7-97ef-4bb1-bbb7-5cc04dc8be76",
  },
];

const sport_images = [
  {
    id: uuidv4(),
    sport_id: "8e173c77-9f48-4561-a1d0-e2e109a499a7",
    image_url: "/sports/football.jpg",
  },
];

const tags = [
  {
    id: uuidv4(),
    name: "Sauna",
    last_edited: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Restaurant",
    last_edited: new Date().toISOString(),
  },
];

// Define placeholder data for groups
const groups = [
  {
    id: uuidv4(),
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
