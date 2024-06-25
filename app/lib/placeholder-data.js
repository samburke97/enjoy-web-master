const { v4: uuidv4 } = require("uuid");

const centers = [
  {
    id: uuidv4(),
    name: "Hackney Football Club",
    last_edited: new Date().toISOString(),
  },
];

const center_images = [
  {
    id: uuidv4(),
    center_id: centers[0].id,
    image_url: "/sports/football.jpg",
  },
];

const sports = [
  {
    id: uuidv4(),
    name: "Football",
  },
];

const sport_images = [
  {
    id: uuidv4(),
    sport_id: sports[0].id,
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

const groups = [
  {
    id: uuidv4(),
    name: "Relaxation Facilities",
  },
];

const group_tags = [
  {
    group_id: groups[0].id,
    tag_id: tags[0].id,
  },
  {
    group_id: groups[0].id,
    tag_id: tags[1].id,
  },
];

module.exports = {
  centers,
  center_images,
  sports,
  sport_images,
  tags,
  groups,
  group_tags,
};
