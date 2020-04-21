import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    post: {
        borderRadius: '0',
        backgroundColor: '#151515',
        border: '1px solid' +  theme.palette.common.orange,
        color: '#aaa',
        '&:hover' : {
            cursor: 'pointer',
            background: '#222'
        }
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

    return (
        <Grid container spacing={3}>
            {entries.map((post) => (
                <Grid key={post._id} item xs={12}>
                    <Card className={classes.post} onClick={() => toPost(post.Title, post._id)}>
                    <CardContent>
                        <h3>{post.Title}</h3>
                        <span className='date'>{parseTime(post._created)}</span>
                        <div>{post.Tags}</div>
                    </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Home;
