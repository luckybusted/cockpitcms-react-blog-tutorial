import React, { useState, useEffect } from 'react';

// Material UI style dependencies
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    blogpost: {
        color: theme.palette.common.darkerGrey,
    },
}));

const Post = (props) => {
    const classes = useStyles();
    const [data, setData] = useState({ entries: [] });

    async function fetchApi() {
        let pathArr = window.location.pathname.split('-'),
            uid = pathArr[pathArr.length - 1];

        let response = await fetch(
            'https://cockpit.ushmorov.de/backend/api/collections/get/Posts',
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filter: { publish: true, _id: uid },
                    populate: 1,
                }),
            }
        );
        let data = await response.json();

        setData(data);
    }

    useEffect(() => {
        fetchApi();
    }, []);

    const renderHTML = (rawHTML) =>
        React.createElement('div', {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });

    return (
        <div className={classes.blogpost}>
            {data.entries.length > 0 && (
                <>
                    <h1>{data.entries[0].Title}</h1>
                    {renderHTML(data.entries[0].Content)}
                </>
            )}
        </div>
    );
};

export default Post;
