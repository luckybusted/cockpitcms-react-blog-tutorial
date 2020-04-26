import React, { useState, useEffect } from 'react';

// Material UI style dependencies

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    singleton: {
        color: theme.palette.common.darkerGrey,
    },
}));

const Legal = () => {
    let classes = useStyles();

    const [data, setData] = useState({});

    async function fetchApi() {
        let response = await fetch(
            'https://cockpit.ushmorov.de/backend/api/singletons/get/Legal'
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
        <div className={classes.singleton}>
            <h1>{data.Title}</h1>
            {renderHTML(data.content)}
        </div>
    );
};

export default Legal;
