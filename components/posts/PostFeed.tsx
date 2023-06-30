import usePosts from '@/hook/usePosts';
import React from 'react';
import PostItem from './PostItem';

interface PostFeedProps {
  userId?:string;
}

const PostFeed = ({userId}:PostFeedProps) => {
  const {data : posts = [] } = usePosts(userId);
  return (
    <>
    
    {
      posts.map((post:Record<string,any>)=>(
        <PostItem
          userId={userId}
          key={post.id}
          data={post}
        />
      ))
    }
    </>
  )
}

export default PostFeed