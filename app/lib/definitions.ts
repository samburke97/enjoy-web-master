export type Center = {
  id: string;
  name: string;
  image_url?: string;
  last_edited: Date;
};

export type Sport = {
  id: string;
  name: string;
  image_url?: string;
  last_edited?: Date;
};

export type Tags = {
  id: string;
  name: string;
  last_edited?: Date;
};

export type Group = {
  id: string;
  name: string;
  last_edited: Date;
  tag_count: number;
  sports: Array<{ id: string; name: string }>;
  tags: Array<{ id: string; name: string }>;
};
