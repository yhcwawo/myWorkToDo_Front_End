import React, { useEffect, useState } from "react";
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
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from '../components/listItems';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from "react-router-dom";
import routes from "../routes";
import { Button } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import useUser from "../hooks/useUser";
import { SERVER_URL } from "../config";
import axios from "axios";
import { user_id_token } from "../auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

//data grid for work
// id == essential value
//work_id, name, group_name, user_id, auth, group_number, group_master, team_name, created_date, to_date

const columns = [
  { field: 'id', 
    headerName: 'id', 
    width: 90,
    editable: false,
   // headerAlign: 'center',
  },
  {
    field: 'name',
    headerName: '워크 이름',
    width: 150,
    editable: false,
   
  },
  {
    field: 'group_name',
    headerName: '워크 그룹',
    width: 150,
    editable: false,
  },
  {
    field: 'group_master',
    headerName: '그룹장',
    width: 120,
    editable: false,
  },
  {
    field: 'team_name',
    headerName: '팀명',
    width: 110,
    editable: false,
  },
  {
    field: 'group_number',
    headerName: '인원',
    width: 110,
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
    headerName: '마감일',
    width: 150,
    editable: false,
  },
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
  const [rowData,setRowData] = useState([]);
  const history = useHistory();
  // data part

  const user_id = user_id_token;

  //didmount
  useEffect(()=>{
   //1 call

    axios.get(`${SERVER_URL}/work/workList/${user_id}`, {
      params: {
        user_id: user_id,
      }
    })
    .then(function (response) {
         // response  
         console.log("work list");
         setRowData(response.data);
         setRowData(response.data);
         //work_id, name, group_name, user_id, auth, group_number, group_master, team_name, created_date, to_date
         // rows rendering

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });

  },[]);

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
                rows={rowData}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                onRowClick={(params, event) => {
                  if (!event.ignore) {
                    console.log("push -> /roles/" + params.row.id);
                    history.push(`/work/${params.row.id}`);
                  }
                }}
              />
              </div>
            </Grid>

     

          </Grid>

        </Container>
      </main>
    </div>
  );
}