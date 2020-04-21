import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: '#111',
    borderRight: '1px solid ' + theme.palette.common.orange,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: '#fff'
  },
  appLink: {
    color: '#09d3ac'
  },
  avatar: {
    marginTop: '2rem',
    maxWidth: '50%',
    borderRadius: '50%'
  }
}));

const Header = () => {
    const classes = useStyles();

    return (
      <header className={classes.header}>
        <img className={classes.avatar} src="https://avatars0.githubusercontent.com/u/1639364?s=460&u=a167d9c3805c832250ee8a8ce9d50b97f6ee19e6&v=4" alt=""/>
        <nav>
          <ul>
            <li>
              <Link to='/about'>About</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
}

export default withRouter(Header);
