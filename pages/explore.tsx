import Header from '@/components/Header'
import PostFeed from '@/components/posts/PostFeed'
import React from 'react'

const explore = () => {
    return (
        <>
            <Header label="Explore" isExplore />
            <PostFeed />
        </>
    )
}

export default explore