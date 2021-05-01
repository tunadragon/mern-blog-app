import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux';

import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });
    const post = useSelector(
        (state) => currentId 
        ? state.posts.find(p => p._id === currentId) 
        : null);
    const user = JSON.parse(localStorage.getItem('profile'))
    const classes = useStyles();
    const dispatch = useDispatch();


    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) { // != null
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
        } else {
            dispatch(createPost({...postData, name: user?.result?.name}));
        }
        clearForm();
    }

    const clearForm = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: ''});
    }

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">Please sign in to create and like posts.</Typography>
            </Paper>
        )
    } 

    return (
        <Paper className={classes.paper}>
            <form 
                autoComplete="off" 
                noValidate 
                className={`${classes.root} ${classes.form}`} 
                onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Edit ' : 'Create a '} Post</Typography>
                {/* <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth 
                    value={postData.creator}
                    onChange={e => setPostData({ ...postData, creator: e.target.value })}
                ></TextField> */}
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth 
                    value={postData.title}
                    onChange={e => setPostData({ ...postData, title: e.target.value })}
                ></TextField>
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message" 
                    fullWidth 
                    value={postData.message}
                    onChange={e => setPostData({ ...postData, message: e.target.value })}
                ></TextField>
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags" 
                    fullWidth 
                    value={postData.tags}
                    onChange={e => setPostData({ ...postData, tags: e.target.value.split(',') })}
                ></TextField>
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >Submit</Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={clearForm}
                >Clear</Button>
            </form>
        </Paper>
    )
}

export default Form