import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

    const handleClick = (tag) => {
        document.location.search = tag
    };

    entries.forEach((post) => {
        if (post.Tags.length)
            post.Tags.map((tag) =>
                newTags.length ? compare(tag) : newTags.push(tag)
            );
    });

    return (
        <div>
            <h3>Tags: </h3>
        <div className={classes.tags}>
            {newTags.map((tag) => (
                <Chip onClick={() => handleClick(tag)} label={tag} key={tag} />
            ))}
        </div>
        </div>
    );
};

export default Sidebar;
