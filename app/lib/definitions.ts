export type Sport = {
  id: string | number;
  name: string;
  image_url: string;
};

export type Tags = {
  id: string | number;
  name: string;
  last_edited: Date;
};

export type Group = {
  id: string | number;
  name: string;
  last_edited: Date;
  tag_count: number; // Add the tag_count property
};
