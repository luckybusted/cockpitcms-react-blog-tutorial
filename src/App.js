import React, { useState, useEffect } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Post from './pages/Post';
import Container from '@material-ui/core/Container';
import CssBaseline from "@material-ui/core/CssBaseline";

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      common: {
        orange: '#ffd000',
        red: '#f00'
      }
    }
  });

const useStyles = makeStyles(() => ({
    body: {
        fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
        backgroundColor: '#111'
    },
  }));

function App() {
    const classes = useStyles();

    const [data, setData] = useState({ entries: [] });
    let newEntries = [];

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

    
    if (document.location.search) {
        let activeTag = document.location.search.substr(1);
        data.entries.forEach((post) => {
            if (
                post.Tags.length &&
                post.Tags.filter(
                    (tag) =>
                        activeTag
                            .toLowerCase()
                            .localeCompare(tag.toLowerCase()) === 0
                ).length
            ) {
                newEntries.push(post);
            }
        });
    } else {
      newEntries = data.entries;
    }
    
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth={false} className={classes.body}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <Header />
                    </Grid>
                    {data.entries && 
                    <Grid item xs={12} sm={6}>
                        <Route
                            exact
                            path='/'
                            render={props => (
                                <Home {...props} entries={newEntries} />
                            )}
                        />
                        <Route exact path='/about' component={About} />
                        <Route path='/post/:title' component={Post} />
                    </Grid>
                    }
                    <Grid item xs={12} sm={3}>
                        <Sidebar entries={data.entries} />
                    </Grid>
                </Grid>
            </Container>
        </MuiThemeProvider>
    );
}

export default withRouter(App);
