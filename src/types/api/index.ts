export type RichText = {
  plainText: string;
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
