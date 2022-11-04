// Generics
interface Annotations{
  bold: boolean
  underline: boolean
  strikethrough: boolean
  code: boolean
  italic: boolean
  color: string
  language?: string
}

interface Text{
  plain_text: string,
  annotations: Annotations
}

interface Image{
  caption: string,
  url: string
}

type TextOrImage = Text | Image;

interface Timeframe{
  start: string,
  end?: string
}

// Blog / Projects
interface BlogInfo{
  id: string,
  lastEdited: string,
  name: string,
  timeline?: string,
  type?: string[],
  languages?: string[],
  frameworks?: string[],
  github?: string,
  external?: string,
  description?: string,
  published?: string,
  isBlog?: boolean,
  isProject?: boolean,
  readTime?: number,
  category?: string
}

interface BlogCategory{
  category?: string,
  posts: BlogInfo[]
}


interface FilterParams{
  frameworks: string[],
  type: string[],
  languages: string[]
}

interface ContentBlock{
  type: string,
  content: TextOrImage[]
}

// Experience
interface Experience{
  company: string,
  role: string,
  description: Text[]
  type: string
  skills: string[],
  timeframe: Timeframe
}


// ========== QUERIES ==========
interface ProjectInfo{
  ProjectInfo: BlogInfo[]
}


interface FilterBy{
  FilterBy: FilterParams
}

interface ExperienceInfo{
  ExperienceInfo: Experience[]
}

interface BlogInfo{
  BlogInfo: BlogCategory[]
}

interface BlogContent{
  BlogContent: ContentBlock[]
}