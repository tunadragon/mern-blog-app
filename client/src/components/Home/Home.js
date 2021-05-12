import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';

import './styles.scss'

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch])

    return (
        <Grow in>
            <Container className="home">
                <Grid container justify="space-between" alignItems="stretch" spacing={3} >
                    <Grid item xs={12} sm={12} md={7}> {/* XS=extra-small devices, SM=small-medium -> 7/12 spaces on small-medium devices*/}
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}> 
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
