import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { IPostMetadata } from '@ammarahmedca/types'
import { useLazyQuery } from '@apollo/client'
import {
  POST_METADATA_BY_SLUG,
  PostMetadataBySlug,
} from '../../graphql/queries/Post'
import PostMetadata from './PostMetadata'
import PostContent from './PostContent'
import { Button } from '@nextui-org/react'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

const Post: React.FC = () => {
  const [metadata, setMetadata] = useState<IPostMetadata>()
  const params = useParams()
  const location = useLocation()
  const [getMetadata, { data, loading, error }] = useLazyQuery<
    PostMetadataBySlug.Response,
    PostMetadataBySlug.Variables
  >(POST_METADATA_BY_SLUG)
  const nav = useNavigate()

  useEffect(() => {
    if (location && location.state) {
      setMetadata(location.state as IPostMetadata)
    } else {
      if (params.slug) {
        getMetadata({ variables: { slug: params.slug } })
      }
    }
  }, [location, params, getMetadata])

  useEffect(() => {
    if (data) {
      setMetadata(data.postBySlug.metadata)
    }
  }, [data])

  return (
    <main className='relative transition min-h-screen'>
      <div className='flex w-full justify-start mt-12'>
        <Button
          variant='light'
          startContent={<ArrowLeftIcon className='size-4' />}
          onPress={() => nav('/blog')}
        >
          Back
        </Button>
      </div>
      {!metadata && loading && <>Loading...</>}
      {!metadata && !loading && error && (
        <>Error 404: Post not found!</>
      )}

      {metadata && (
        <>
          <PostMetadata metadata={metadata} />
          <PostContent slug={params.slug!} />
        </>
      )}
    </main>
  )
}

export default Post
