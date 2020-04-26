import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    sidebarWrapper: {
        marginTop: theme.spacing(4),
    },
    headline: {
        textAlign: 'center',
    },
    tags: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const Sidebar = ({ entries }) => {
    let history = useHistory();
    const classes = useStyles();
    let newTags = [];

    function compare(term) {
        if (
            !newTags.filter(
                (tag) =>
                    term.toLowerCase().localeCompare(tag.toLowerCase()) === 0
            ).length
        )
            newTags.push(term);
    }

    entries.forEach((post) => {
        if (post.Tags.length)
            post.Tags.map((tag) =>
                newTags.length ? compare(tag) : newTags.push(tag)
            );
    });

    const handleClick = (tag) => {
        history.push({ pathname: '/', search: tag });
    };

    return (
        <div className={classes.sidebarWrapper}>
            <h3 className={classes.headline}>Tags: </h3>
            <div className={classes.tags}>
                {newTags.map((tag) => (
                    <Chip
                        onClick={() => handleClick(tag)}
                        clickable
                        color='primary'
                        label={tag}
                        key={tag}
                        variant='outlined'
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
