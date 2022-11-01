
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

interface ProjectInfo{
  ProjectInfo: BlogInfo[]
}

interface FilterParams{
  frameworks: string[],
  type: string[],
  languages: string[]
}

interface FilterBy{
  FilterBy: FilterParams
}