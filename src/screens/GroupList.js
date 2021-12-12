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
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from '../components/listItems';

//linked data grid

import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from "axios";
import { SERVER_URL } from "../config";


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* here */}
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>

{/* work_id as id, name, group_name, user_id, auth, group_number, group_master, team_name, created_date, to_date */}

        <TableCell align="right">{row.group_name}</TableCell>
        <TableCell align="right">{row.group_number}</TableCell>
        <TableCell align="right">{row.created_date}</TableCell>
        <TableCell align="right">{row.to_date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {row.group_name}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>그룹장</TableCell>
                    <TableCell>멤버이름</TableCell>
                    <TableCell>권한</TableCell>
                    <TableCell>삭제</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {/* group part */}
                  {/* {row.groupRow.map((groupRow) => (
                    <TableRow key={groupRow.group_id}>
                      <TableCell component="th" scope="row">
                        {groupRow.group_id}
                      </TableCell>
                      <TableCell>{groupRow.group_master}</TableCell>
                      <TableCell align="right">{groupRow.group_member}</TableCell>
                      <TableCell align="right">
                        {groupRow.auth}
                      </TableCell>
                      <TableCell align="right">
                        {groupRow.auth}
                      </TableCell>
                    </TableRow>
                  ))} */}


                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

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
}));


export default function GroupList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  function createData(name, calories, fat, carbs, protein, price) {
    return {
      name,
      price,
      history: [
        { date: '2020-01-05', customerId: '11091700', amount: 3 },
        { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
      ],
    }
  };

  //grid
  //query 2개를 동시 호출하여 해결
  
  const [rowData,setRowData] = useState([]);
  const [groupData,setGroupData] = useState([]);

  // data part
  // const { data } = useUser();
  // console.log(data);
  const user_id = 20;

 //didmount
 useEffect(()=>{

    axios.get(`${SERVER_URL}/work/workList/${user_id}`, {
      params: {
        user_id: user_id,
      }
    })
    .then(function (work_result) {
        // response  
        console.log("work data");
        console.log(work_result.data);

        const work_data = work_result.data;
        
        //group data
        axios.get(`${SERVER_URL}/group/list/${user_id}`, {
          params: {
            group_member: user_id,
          }
        })
        .then(function (group_result) {
            // response  
            console.log("group data");
            console.log(group_result.data);
            const group_data = group_result.data;
          

            setRowData(work_data);
            setGroupData(group_result.data);

            //setVehicleData(old => [...old, ...newArrayData]);

            //group_id, group_name, auth, group_master, group_member, group_work_id
    
            //group_id, group_name, auth, group_master, group_member, group_work_id
    
        }).catch(function (error) {
            // 오류발생시 실행
        }).then(function() {
            // 항상 실행
        });


        //setRowData(response.data);
        //setVehicleData(old => [...old, ...newArrayData]);

        //group_id, group_name, auth, group_master, group_member, group_work_id

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
            그룹 리스트
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
            
            {/* Linked data grid */}
            <Grid item xs={12}>
              
              <TableContainer component={Paper}>
                <Table aria-label="linked table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>워크 이름</TableCell>
                      <TableCell align="right">워크그룹</TableCell>
                      <TableCell align="right">워크 그룹원 수</TableCell>
                      <TableCell align="right">생성일</TableCell>
                      <TableCell align="right">마감기한</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowData.map((row) => (
                       <Row key={row.id} row={row} />
                     ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

          </Grid>

        </Container>
      </main>
    </div>
  );
}