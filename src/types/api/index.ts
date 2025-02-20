export type Annotations = {
  bold: boolean;
  code: boolean;
  italic: boolean;
  color: string;
  strikethrough: boolean;
  underline: boolean;
  href?: string;
  equation?: boolean;
};

export type RichText = {
  plainText: string;
  annotations: Annotations;
};

export type DateRange = {
  start: Date;
  end?: Date;
};

export type Project = {
  id: string;
  name: string;
  description: RichText[];
  date?: DateRange;
  languages: string[];
  frameworks: string[];
  type: string[];
  github?: string;
  external?: string;
  publish: boolean;
  image?: string;
};

export type Experience = {
  id: string;
  icon?: string;
  company: string;
  role?: string;
  description: RichText[];
  type?: string;
  skills: string[];
  timeframe?: DateRange;
};

export type PostMetadata = {
  id: string;
  name: string;
  description: RichText[];
  category?: string;
  tags: string[];
  date?: Date;
  slug: string;
};
