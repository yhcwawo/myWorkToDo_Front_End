import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from '../components/listItems';
import { useHistory } from 'react-router-dom';
import WorkRecent from '../components/WorkRecent';
import Title from '../components/Title';
import API from '../components/axios';
import axios from 'axios';
import { SERVER_URL } from '../config';
import styled from 'styled-components';
import ListCard from '../components/ListCard';
import useUser from '../hooks/useUser';

//logout
import routes from '../routes';
import { LogUserOut, user_id_token } from '../auth';
import { Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//네비게션바 가로 크기 지정
const drawerWidth = 240;
const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [userName,setUserName] = useState("");

  //when start page
  //replace loginvar
  const user_id = user_id_token;

  useEffect(()=>{

  //login user info
  axios.get(`${SERVER_URL}/user/${user_id}`, {
    params: {
      user_id: user_id,
    }
  })
  .then(function (response) {
      console.log(response.data);
      setUserName(response?.data?.name);
            
  }).catch(function (error) {

  }).then(function() {

  });
  //end


  axios.get(SERVER_URL+`/static/main/${user_id}`, {
    params: {
      user_id: user_id,
    }
    })
    .then(function (response) {
      // response  
      console.log("static summary");

    }).catch(function (error) {
      // 오류발생시 실행
    }).then(function() {
      // 항상 실행
    });

    }, []);

  


  //main dashboard 랜더링
  //main은 컨테이너만 잡고 컴포넌트 호출로 2단 구성
  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            메인
          </Typography>

          <IconButton color="inherit">
            <Badge color="secondary">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<ExitToAppIcon />}
                  onClick={()=> {
                    LogUserOut();
                    history.push(routes.signIn);
                  }}
                >
                  {userName} 님
              </Button>
            </Badge>
          </IconButton>

        </Toolbar>
      </AppBar>


      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />

      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />


        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            
            {/* Recent My Work */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <WorkRecent />
              </Paper>
            </Grid>

            {/* Group Task Chart */}
            <Grid item xs={12}>
      
              <Paper className={fixedHeightPaper}>
                {/* Summary Card section */}
                
              </Paper>
              
             
            </Grid>

          </Grid>

        </Container>
      </main>
    </div>
  );
}