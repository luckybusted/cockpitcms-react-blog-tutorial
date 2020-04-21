import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { AccessAlarm, LocalOffer } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    postWrapper: {
        marginTop: theme.spacing(4),
    },
    post: {
        borderRadius: '0',
        //backgroundColor: '#151515',
        marginBottom: theme.spacing(4),
        border: '1px solid' + theme.palette.common.orange,
        color: theme.palette.common.darkGrey,
        transition: 'all .3s ease',
        '&:hover': {
            cursor: 'pointer',
            boxShadow:
                'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
        },
    },
    metaWrapper: {
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
    metaData: {
        marginLeft: theme.spacing(1),
    },
}));

const Home = ({ entries }) => {
    let history = useHistory();
    const classes = useStyles();

    function toPost(title, id) {
        let url = title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');

        history.push('/post/' + url + '-' + id);
    }

    function parseTime(stamp) {
        let date = new Date(stamp * 1000),
            day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();
        return (
            day +
            '.' +
            (month.toString().length <= 1 ? '0' + month : month) +
            '.' +
            year
        );
    }

    const renderTags = (tags) => (tags ? tags.join(', ') : '');

    return (
        <Grid container spacing={3}>
            <Grid className={classes.postWrapper} item xs={12}>
                {entries.map((post) => (
                    <Card
                        key={post._id}
                        className={classes.post}
                        onClick={() => toPost(post.Title, post._id)}
                    >
                        <CardContent>
                            <Grid container>
                                <Grid
                                    container
                                    item
                                    sm={6}
                                    direction='row'
                                    justify='start'
                                    alignItems='center'
                                >
                                    <h2>{post.Title}</h2>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    sm={6}
                                    direction='column'
                                    justify='start'
                                    alignItems='start'
                                >
                                    <div className={classes.metaWrapper}>
                                        <AccessAlarm />
                                        <div className={classes.metaData}>
                                            {parseTime(post._created)}
                                        </div>
                                    </div>
                                    <div className={classes.metaWrapper}>
                                        <LocalOffer />
                                        <div className={classes.metaData}>
                                            {renderTags(post.Tags)}
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </Grid>
    );
};

export default Home;
