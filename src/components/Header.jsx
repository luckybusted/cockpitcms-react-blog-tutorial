import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontSize: 'calc(10px + 2vmin)',
        color: theme.palette.common.darkGrey,
    },
    headline: {
        textAlign: 'center',
    },
    navigation: {
        listStyle: 'none',
        padding: '0',
    },
    link: {
        color: theme.palette.common.darkGrey,
        textDecoration: 'none',
        border: '1px solid' + theme.palette.common.darkGrey,
        display: 'block',
        marginBottom: theme.spacing(4),
        textAlign: 'center',
        padding: '1rem 0',
        '&:hover': {
            background: '#aaa',
            fontStyle: 'italic',
        },
    },
}));

const Header = () => {
    const classes = useStyles();

    return (
        <header className={classes.header}>
            <h1 className={classes.headline}>
                <Link to='/'>John Doe</Link>
            </h1>
            <nav>
                <ul className={classes.navigation}>
                    <li>
                        <Link className={classes.link} to='/about'>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link className={classes.link} to='/legal'>
                            Legal
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default withRouter(Header);
