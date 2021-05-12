import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

// contains the logic for each route

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    } catch (err) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({
        ...post, 
        creator: req.userId, 
        createdAt: new Date().toISOString()
    });

    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (err) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params; // extract id and rename to _id
    const post = req.body;
    
    // check if valid id
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id.')

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {_id, ...post}, {new: true});
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(409).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id.')

    try {
        await PostMessage.findByIdAndRemove(_id);
        res.status(200).json({ message: 'Post deleted sucessfully.'});
    } catch (err) {
        res.status(409).json({ message: error.message })
    }
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    // check if authenticated
    if(!req.userId) return res.json({ message: 'Unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id.')

    try {
        const post = await PostMessage.findById(_id);

        // check if user already liked the post
        const index = post.likes.findIndex(id => id === String(req.userId))
        if(index === -1) {
            // like the post
            post.likes.push(req.userId)
        } else {
            // un-like the post
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(409).json({ message: error.message })
    }
}

