interface IAnnotations{
  bold: boolean
  underline: boolean
  strikethrough: boolean
  code: boolean
  italic: boolean
  color: string
  language?: string,
}

interface IText{
  plainText: string,
  annotations: Annotations
}

interface IImage{
  url: string,
  caption: string
}

type TextOrImageType = IText | IImage

interface IContent{
  type: string,
  content: TextOrImageType[] 
}

interface IFilterOpts{
  frameworks: string[],
  type: string[],
  languages: string[],
  category: string[]
}

interface IMetadata{
  id: string
  lastEdited: number
  name: string,
  pathname?: string,
  timeline?: string
  type?: string[]
  languages?: string[]
  frameworks?: string[]
  github?: string
  external?: string
  description?: string
  published?: number
  isBlog?: boolean
  isProject?: boolean
  readTime?: number
  category?: string
  isPublished?: boolean
}



// EXPERIENCE
interface ITimeframe{
  start: number,
  end?: number
}

interface IExperience{
  company: string;
  role: string;
  description: IText[];
  type: string;
  skills: string[];
  timeframe: ITimeframe;
}

// SKILLS
interface ISkill{
  name: string;
  type: string;
  value: number;
}
