import React, { useState } from "react";
import styled from "styled-components";
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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import routes from '../routes';
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import axios from "axios";
import { SERVER_URL } from "../config";
import { user_id_token } from "../auth";

//가로 크기 지정
const drawerWidth = 240;

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
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function WorkRegist() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const [userName,setUserName] = useState("");
  const user_id = user_id_token;
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  //insert main dashboard part

  //register db part
  //ajax form event
  let params = new URLSearchParams();
  let paramsGroup = new URLSearchParams();
  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = data => {
      let { name, group_name, user_id, auth,group_number, group_master, team_name, to_date} = getValues();

      user_id = user_id_token; 
      auth = '0';
      group_number = 1;
      group_master = user_id_token;

      params.append('name', name);
      params.append('group_name', group_name);
      params.append('user_id', user_id);
      params.append('auth', auth);
      params.append('group_number', group_number);
      params.append('group_master', group_master);
      params.append('team_name', team_name);
      params.append('to_date', to_date);

      const headers = {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      }

      axios.post(`${SERVER_URL}/work/post`, params, {headers}).then(function (response) {
          console.log(response);

          //group_work_id == sequence
          paramsGroup.append('group_name', group_name);
          paramsGroup.append('auth', auth);
          paramsGroup.append('group_master', user_id);
          paramsGroup.append('group_member', user_id);

          //워크 생성하면 워크그룹 -> 그룹 마스터 넣기
          axios.post(`${SERVER_URL}/group/post/master`, paramsGroup, {headers}).then(function (response) {
            console.log("success")
  
          }).catch(function (error) {
              // 오류발생시 실행
          }).then(function() {
              // 항상 실행
          });

          history.push(routes.workList);

      }).catch(function (error) {
          // 오류발생시 실행
      }).then(function() {
          // 항상 실행
      });
  };
  //end


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
            워크 등록
          </Typography>

          <IconButton color="inherit">
            <Badge color="secondary">

            <Typography component="h6" variant="h6" color="inherit" noWrap className={classes.title}>
              User
            </Typography>
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


        <Container maxWidth="sm" className={classes.container}>
          <Grid container spacing={3}>
            
            {/* Regist page */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
           

              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                  <Typography component="h1" variant="h5">
                    워크 등록
                  </Typography>
                  <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>

                      <Grid item xs={12}>
                        <Input
                          type="name" placeholder="워크명 *" {...register("name",{required: true})}
                        />

                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Input
                            type="name" placeholder="워크 그룹명 *" {...register("group_name",{required: true})}
                          />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Input
                            type="name" placeholder="팀명 *" {...register("team_name",{required: true})}
                          />
                      </Grid>
                      <Grid item xs={12}>
                        <Input
                            type="date" placeholder="마감기한 *" {...register("to_date",{required: true})}
                          />
                      </Grid>
     
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      등록하기
                    </Button>
                    </form>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link to={routes.workList} style={{ textDecoration: 'none' }}>
                          워크 리스트 돌아가기
                        </Link>
                      </Grid>
                    </Grid>
                  
                </div>

              </Container>

              </Paper>
            </Grid>

          </Grid>
        </Container>
      </main>
    </div>
  );
}