import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post'
import './styles.scss';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts); // defined as posts in reducer index.js

    return (
        !posts.length ? 
        <CircularProgress /> :
        <Grid 
            className="posts"
            container 
            alignItems="stretch" 
            spacing={3}>
            {posts.reverse().map(post => (
                <Grid key={post._id} item xs={12} sm={6}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    )
}

export default Posts
