import { FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actionTypes'

const reducers = (posts = [], action) => { // posts = curr state
    switch(action.type) {
        case FETCH_ALL:
            return action.payload; // returns all posts
        case CREATE:
            return [...posts, action.payload]; // orig list with new post added
        case UPDATE:
            // action.payload is the newly updated post; post is the post without updates
            return posts.map(post => post._id === action.payload._id ? action.payload : post)
        case DELETE:
            return posts.filter(post => post._id !== action.payload)
        default:
            return posts;
    }
}

export default reducers;