import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import {
  POST_CONTENT_BY_SLUG,
  PostContentBySlug,
} from '../../graphql/queries/Post'
import { useThemeValue } from '../../hooks/theme'
import {
  IRichText,
  BlockType,
  IEquation,
  IList,
  IImage,
} from '@ammarahmedca/types'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import RichText from '../../components/RichText'
import RecursiveListItem from '../../components/RecursiveListItem'
import {
  Image,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react'
import Latex from '../../components/Latex'
import TextSkeleton from '../../components/TextSkeleton'
import { extractHeadings, Heading } from '../../utils/content'
import PostHeadings from './PostHeadings'
import { createHeadingID } from '../../utils/content'

export type PostContentProps = {
  slug: string
}

export const blockClasses: {
  [K in BlockType]?: string
} = {
  heading_1: 'md:text-3xl text-2xl font-bold font-display',
  heading_2: 'md:text-2xl text-xl font-bold font-display',
  heading_3: 'md:text-xl text-lg font-bold font-display',
  paragraph: 'md:text-lg text-base text-default-600',
  quote:
    'md:text-lg text-base p-4 border-s-4 border-default-700 bg-default-300/50 rounded-e-md',
  bulleted_list:
    'list-disc list-inside text-default-600 md:text-lg text-base ms-4',
  numbered_list:
    'list-decimal list-inside text-default-600 md:text-lg text-base ms-4',
  equation: 'md:text-lg text-base',
  callout:
    'md:text-lg text-base text-default-600 bg-default-200/75 flex w-full items-start p-4 space-x-4 rounded-md',
}

const PostContentSkeleton: React.FC = () => {
  return (
    <>
      <TextSkeleton
        height='h-4'
        spacing='space-y-3'
        randomLines
        min={3}
        max={8}
      />
      <TextSkeleton height='h-8' width='w-2/5' noOfLines={1} />
      <TextSkeleton
        height='h-4'
        spacing='space-y-3'
        randomLines
        min={3}
        max={8}
      />
      <TextSkeleton height='h-6' width='w-3/5' noOfLines={1} />
      <TextSkeleton
        height='h-4'
        spacing='space-y-3'
        randomLines
        min={3}
        max={8}
      />
    </>
  )
}

const PostContent: React.FC<PostContentProps> = ({ slug }) => {
  const { data, loading } = useQuery<
    PostContentBySlug.Response,
    PostContentBySlug.Variables
  >(POST_CONTENT_BY_SLUG, { variables: { slug } })
  const codeStyle = useThemeValue(oneLight, oneDark)
  const imageModalDisclosure = useDisclosure()
  const [headings, setHeadings] = useState<Heading[]>()

  useEffect(() => {
    if (data) {
      setHeadings(extractHeadings(data.postBySlug.content))
    }
  }, [data])

  return (
    <div className='flex flex-col space-y-5 mb-12 relative'>
      {headings && <PostHeadings headings={headings} />}
      {loading && !data && <PostContentSkeleton />}
      {data &&
        headings &&
        data.postBySlug.content.map((block, idx) => {
          const { type, content } = block
          const key = `block-${idx}`
          switch (type) {
            case 'heading_1':
            case 'heading_2':
            case 'heading_3':
            case 'paragraph':
            case 'quote':
              let [as, num] = type.split('_')
              let richText = content as IRichText[]
              let id
              if (!num && type !== 'quote') {
                as = 'p'
              } else if (type.includes('heading')) {
                as = as[0] + (parseInt(num) + 1)
                const plainText = richText
                  .map((rt) => rt.plainText)
                  .join('')
                let h: Heading = {
                  level: parseInt(num) as 1 | 2 | 3,
                  plainText,
                }
                id = createHeadingID(h, headings!)
              } else {
                as = 'blockquote'
              }

              return (
                <RichText
                  key={key}
                  as={as as React.ElementType}
                  data={richText}
                  className={blockClasses[type]}
                  id={id}
                />
              )
            case 'equation':
              let equation = content[0] as IEquation
              return (
                <Latex
                  expression={equation.expression}
                  display
                  as='div'
                  className={blockClasses[type]}
                />
              )
            case 'bulleted_list':
            case 'numbered_list':
              const ListElement =
                type === 'bulleted_list' ? 'ul' : 'ol'
              const list = content[0] as IList
              return (
                <ListElement className={blockClasses[type]} key={key}>
                  {list.children.map((item) => {
                    return (
                      <RecursiveListItem
                        item={item}
                        listType={type}
                      />
                    )
                  })}
                </ListElement>
              )
            case 'code':
              let code = content[0] as IRichText
              let language = code.annotations.language as string
              return (
                <SyntaxHighlighter
                  language={language}
                  style={codeStyle}
                  showLineNumbers
                  key={key}
                >
                  {code.plainText}
                </SyntaxHighlighter>
              )
            case 'image':
              let image = content[0] as IImage
              const { isOpen, onOpen, onClose } = imageModalDisclosure
              return (
                <div className='flex flex-col w-full items-center'>
                  <Image
                    key={key}
                    src={image.url}
                    isBlurred
                    isZoomed
                    classNames={{
                      wrapper: 'w-4/5 hover:cursor-pointer',
                    }}
                    onClick={() => onOpen()}
                  />
                  <RichText
                    as='caption'
                    className='text-default-500 md:text-base text-xs'
                    data={image.caption}
                  />
                  <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    backdrop='blur'
                    size='5xl'
                  >
                    <ModalContent>
                      {(onClose) => (
                        <ModalBody>
                          <div className='flex flex-col w-full items-center p-5'>
                            <Image key={key} src={image.url} />
                            <RichText
                              as='caption'
                              className='text-default-500 md:text-base text-xs'
                              data={image.caption}
                            />
                          </div>
                        </ModalBody>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
              )
            case 'callout':
              let callout = content as IRichText[]
              return (
                <aside className={blockClasses[type]}>
                  <span className='md:text-xl text-lg'>
                    {callout[0].calloutIcon}
                  </span>
                  <RichText as='p' data={callout} />
                </aside>
              )
            default:
              return (
                <p key={key} className='text-red-500'>
                  ERROR: Unsupported type: {type}
                </p>
              )
          }
        })}
    </div>
  )
}

export default PostContent
