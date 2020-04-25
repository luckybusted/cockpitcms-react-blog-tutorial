import React, { useState, useEffect } from 'react';

// Material UI style dependencies
import { withRouter, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

//Our components:
import Header from './components/Header';
import Sidebar from './components/Sidebar';

//The pages:
import Home from './pages/Home';
import About from './pages/About';
import Post from './pages/Post';
import Legal from './pages/Legal';

const theme = createMuiTheme({
    palette: {
        common: {
            darkGrey: '#555',
            darkerGrey: '#444',
        },
    },
});

const useStyles = makeStyles(() => ({
    body: {
        fontFamily:
            'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
        backgroundColor: '#ddd',
    },
}));

const App = () => {
    const classes = useStyles();

    const [data, setData] = useState({ entries: [] });

    // first of all: get all the posts:
    async function fetchApi() {
        let response = await fetch(
            'https://cockpit.ushmorov.de/backend/api/collections/get/Posts',
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filter: { publish: true },
                }),
            }
        );
        let data = await response.json();
        setData(data);
    }

    useEffect(() => {
        fetchApi();
    }, []);

    //aaaaand render them in the layout:
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth={false} className={classes.body}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <Header />
                    </Grid>
                    {data.entries && (
                        <Grid item xs={12} sm={6}>
                            <Route
                                exact
                                path='/'
                                render={(props) => (
                                    <Home {...props} entries={data.entries} />
                                )}
                            />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/legal' component={Legal} />
                            <Route
                                path='/post/:title'
                                render={(props) => (
                                    <Post {...props} entries={data.entries} />
                                )}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12} sm={3}>
                        <Sidebar entries={data.entries} />
                    </Grid>
                </Grid>
            </Container>
        </MuiThemeProvider>
    );
};

export default withRouter(App);
