import React from 'react';
import { useHistory } from 'react-router-dom';

// Material UI style dependencies
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    blogpost: {
        color: theme.palette.common.darkerGrey,
    },
}));

const Post = ({ entries }) => {
    let history = useHistory(),
        classes = useStyles(),
        pathArr = history.location.pathname.split('-'),
        uid = pathArr[pathArr.length - 1],
        post = entries.filter((entry) => entry._id === uid);

    const renderHTML = (rawHTML) =>
        React.createElement('div', {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });

    return (
        <div className={classes.blogpost}>
            {post.length > 0 && (
                <>
                    <h1>{post[0].Title}</h1>
                    {renderHTML(post[0].Content)}
                </>
            )}
        </div>
    );
};

export default Post;
