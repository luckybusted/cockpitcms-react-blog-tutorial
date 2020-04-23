import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
    let history = useHistory();

    const [data, setData] = useState({ entries: [] });
    let newEntries = [];

    // first of all: get all the posts:
    async function fetchApi() {
        let response = await fetch(
            'https://dev.ushmorov.de/backend/api/collections/get/Posts'
        );
        let data = await response.json();
        setData(data);
    }

    useEffect(() => {
        fetchApi();
    }, []);

    // sort the posts if a filter is active:
    if (document.location.search) {
        let activeTag = history.location.search.substr(1);

        data.entries.forEach((post) => {
            if (
                post.Tags.length &&
                post.Tags.filter(
                    (tag) =>
                        encodeURI(activeTag)
                            .toLowerCase()
                            .localeCompare(
                                encodeURIComponent(tag).toLowerCase()
                            ) === 0
                ).length
            ) {
                newEntries.push(post);
            }
        });
    } else {
        newEntries = data.entries;
    }

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
                                    <Home {...props} entries={newEntries} />
                                )}
                            />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/legal' component={Legal} />
                            <Route path='/post/:title' component={Post} />
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
