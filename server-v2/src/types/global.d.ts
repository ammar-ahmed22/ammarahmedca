export {}

declare global {
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

  interface IMetadata{
    id: string
    lastEdited: Date
    name: string,
    pathname?: string,
    timeline?: string
    type?: string[]
    languages?: string[]
    frameworks?: string[]
    github?: string
    external?: string
    description?: string
    published?: string
    isBlog?: boolean
    isProject?: boolean
    readTime?: number
    category?: string
    isPublished?: boolean
  }
}