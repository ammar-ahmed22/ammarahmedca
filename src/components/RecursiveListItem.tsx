import React from 'react'
import RichText from './RichText'
import { IListItem } from '@ammarahmedca/types'
import { blockClasses } from '../pages/Post/PostContent'

export type RecursiveListItemProps = {
  item: IListItem
  listType: 'numbered_list' | 'bulleted_list'
}

const RecursiveListItem: React.FC<RecursiveListItemProps> = ({
  item,
  listType,
}) => {
  return (
    <li>
      <RichText data={item.content} as='span' />
      {item.children &&
        !!item.children.length &&
        listType === 'numbered_list' && (
          <ol className={blockClasses[listType]}>
            {item.children.map((item) => {
              return (
                <RecursiveListItem item={item} listType={listType} />
              )
            })}
          </ol>
        )}
      {item.children &&
        !!item.children.length &&
        listType === 'bulleted_list' && (
          <ul className={blockClasses[listType]}>
            {item.children.map((item) => {
              return (
                <RecursiveListItem item={item} listType={listType} />
              )
            })}
          </ul>
        )}
    </li>
  )
}

export default RecursiveListItem
