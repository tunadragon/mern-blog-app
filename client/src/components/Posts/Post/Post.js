import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
import placeholder from '../../../images/placeholderImage.jpg'


import './styles.scss';

const Post = ({ post, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch();

    // const Likes = () => {
    //     if (post.likes.length > 0) {
    //         return post.likes.find(like => like === (user?.result?.googleId || user?.result?._id)) ?
    //             (

    //             ) : (

    //             )
    //     }
    // }
    
    return (
        <Card className="post">
            <CardMedia 
                className="post__media" 
                image={post.selectedFile==='' ? placeholder : post.selectedFile}
                title={post.title} />
            <div className="post__overlay">
                <Typography variant="h6">
                    {post.name}
                </Typography>
                <Typography variant="body2">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className="post__overlay2">
                    <Button 
                        style={{color: 'white'}} 
                        size="small" 
                        onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
            )}
            <div className="post__tags">
                <Typography 
                    variant="body2"
                    color="textSecondary"
                >
                    {post.tags.length > 0 && post.tags[0]!=='' ? post.tags.map(tag => `#${tag.trim()} `) : 'No tags'}
                </Typography>
            </div>
            <Typography 
                className="post__title"
                variant="h5"
                gutterBottom
            >
                {post.title.trim() === '' ? 'Untitled' : post.title}
            </Typography>
            <CardContent className="post__body">
                <Typography 
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {post.message}
                </Typography>
            </CardContent>
            <CardActions className="post__actions">
                <Button 
                    className="post__likeButton"
                    disabled={!user?.result}
                    size="small" 
                    color="primary" 
                    onClick={() => { dispatch(likePost(post._id)) }}>
                    <ThumbUpAltIcon fontSize="small" />
                    Like {' '}
                    {post.likes.length}
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button 
                        size="small" 
                        color="primary" 
                        onClick={() => { dispatch(deletePost(post._id)) }}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post
