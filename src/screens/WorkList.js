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
import { DataGrid } from '@material-ui/data-grid';
import { Link } from "react-router-dom";
import routes from "../routes";
import { Button } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';

//data grid for work
// id == essential value
const columns = [
  { field: 'id', 
  headerName: 'ID', 
  width: 120,
  editable: false,
  },
  {
    field: 'work_name',
    headerName: '워크 이름',
    width: 150,
    editable: false,
   
  },
// ${params.getValue("id")}
  {
    field: 'group_name',
    headerName: '워크 그룹',
    width: 150,
    editable: false,
  },
  {
    field: 'user_name',
    headerName: '그룹장',
    width: 120,
    editable: false,
  },
  {
    field: 'team',
    headerName: '팀명',
    width: 150,
    editable: false,
  },
  {
    field: 'group_number',
    headerName: '그룹원 수',
    width: 150,
    editable: false,
  },
  {
    field: 'created_date',
    headerName: '생성일',
    width: 150,
    editable: false,
  },
  {
    field: 'to_date',
    headerName: '마감기한',
    width: 150,
    editable: false,
  },
];

const rows = [
  { id: 1, work_name: 'Snow' ,group_name: 'Jon', user_name: 'Jon', team: 'Jon', group_number: 35, created_date: '2021-11-30',to_date: '2021-12-17' },
  { id: 2, work_name: 'Lannister', group_name: 'Cersei', user_name: 'Jon',team: 'Jon',  group_number: 42, created_date: '2021-11-30',to_date: '2021-12-17' },
  { id: 3, work_name: 'Lannister', group_name: 'Jaime', user_name: 'Jon',team: 'Jon',  group_number: 45 , created_date: '2021-11-30',to_date: '2021-12-17'},
  { id: 4, work_name: 'Stark', group_name: 'Arya', user_name: 'Jon', team: 'Jon', group_number: 16, created_date: '2021-11-30' ,to_date: '2021-12-17'},
  { id: 5, work_name: 'Targaryen', group_name: 'Daenerys', user_name: 'Jon', team: 'Jon', group_number: null, created_date: '2021-11-30' ,to_date: '2021-12-17'},
  { id: 6, work_name: 'Melisandre', group_name: null, user_name: 'Jon', team: 'Jon', group_number: 150, created_date: '2021-11-30' ,to_date: '2021-12-17'},
  { id: 7, work_name: 'Clifford', group_name: 'Ferrara', user_name: 'Jon', team: 'Jon', group_number: 44, created_date: '2021-11-30' ,to_date: '2021-12-17'},
  { id: 8, work_name: 'Frances', group_name: 'Rossini', user_name: 'Jon', team: 'Jon', group_number: 36 , created_date: '2021-11-30',to_date: '2021-12-17'},
  { id: 9, work_name: 'Roxie', group_name: 'Harvey', user_name: 'Jon', team: 'Jon', group_number: 65, created_date: '2021-11-30' ,to_date: '2021-12-17'},
];

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
  },
  fixedHeight: {
    height: 240,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function WorkList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //insert main dashboard
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
            나의 워크 리스트
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


        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            
            {/* Work list */}
            <Grid item xs={12}>

              <Link to={routes.workRegist}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                등록
              </Button>
              </Link>

              <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
              />
              </div>
            </Grid>

     

          </Grid>

        </Container>
      </main>
    </div>
  );
}