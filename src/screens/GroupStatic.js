import React, { useEffect, useState } from 'react';
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { SERVER_URL, USER } from '../config';
import { useHistory } from 'react-router';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//통계 쿼리 파트
//drawer 가로 크기 지정
const drawerWidth = 240;

//전체 그룹원 테스크량 통계를 보여주기
//전체 그룹원 대비 본인의 테스크량 비율 보여주기

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  table: {
    minWidth: 700,
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

//소수점 정리
function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

//row setting
function createRow(name, daypre4, daypre3, daypre2,daypre1,daytoday,daypost1,daypost2,daypost3,daypost4) {

  return { name, daypre4, daypre3, daypre2,daypre1,daytoday,daypost1,daypost2,daypost3,daypost4 };
}

const rows = [
];

// today 기준으로 전후 4일에 대한 통계쿼리 출력

// total 통계정보는 전체 테스크 대비 로그인한 사용자의 테스트 비율을 보여줄 예정  - rest api /static getGroupStaticInfo 쓰기
//axios.get
//+ 좀 더 고민해보기

export default function GroupStatic() {
  const classes = useStyles();
  const history = useHistory();
  const [userName,setUserName] = useState("");
  const [myTaskRatio,setMyTaskRatio] = useState(0);
  const [allTaskRatio,setAllTaskRatio] = useState(0);

  
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [rowData,setRowData] = useState([]);
  // data part
  const user_id = localStorage.getItem(USER);

  //didmount
  useEffect(()=>{

    //grid query
    axios.get(`${SERVER_URL}/static/group/${user_id}`, {
      params: {
        user_id: user_id,
      }
    })
    .then(function (response) {
         // response  
         console.log("static list");
         console.log(response.data);
         setRowData(response.data);

         // rows rendering

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });

    //total query
    axios.get(`${SERVER_URL}/static/total/${user_id}`, {
      params: {
        user_id: user_id,
      }
    })
    .then(function (response) {
         // response  
         console.log("static total");
         console.log(response.data);

         setMyTaskRatio(response.data.myTaskRatio);
         setAllTaskRatio(response.data.allTaskRatio);


         // total rendering

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });


    

  },[]);
  //axios part

  //main dashboard 랜더링
  //main은 컨테이너만 잡고 컴포넌트 호출로 2단 구성 할 예정
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
            그룹 통계
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
            
            {/* group statistics */}
            <Grid item xs={12}>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={10}>
                    주간 워크 그룹 통계
                  </TableCell>
                
                </TableRow>
                <TableRow>
                  <TableCell>워크 멤버</TableCell>
                  <TableCell align="right">d-4</TableCell>
                  <TableCell align="right">d-3</TableCell>
                  <TableCell align="right">d-2</TableCell>
                  <TableCell align="right">d-1</TableCell>
                  <TableCell align="right">today</TableCell>
                  <TableCell align="right">d+1</TableCell>
                  <TableCell align="right">d+2</TableCell>
                  <TableCell align="right">d+3</TableCell>
                  <TableCell align="right">d+4</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.daypre4}</TableCell>
                    <TableCell align="right">{row.daypre3}</TableCell>
                    <TableCell align="right">{row.daypre2}</TableCell>
                    <TableCell align="right">{row.daypre1}</TableCell>
                    <TableCell align="right">{row.daytoday}</TableCell>
                    <TableCell align="right">{row.daypost1}</TableCell>
                    <TableCell align="right">{row.daypost2}</TableCell>
                    <TableCell align="right">{row.daypost3}</TableCell>
                    <TableCell align="right">{row.daypost4}</TableCell>
             
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={2} />
                  <TableCell colSpan={8}>전체 대비 나의 테스크 할당률</TableCell>
                  <TableCell align="right">{ ccyFormat(myTaskRatio)+"%"}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={8}>전체 테스크 완료율</TableCell>
                  <TableCell align="right">{ ccyFormat(allTaskRatio)+"%"}</TableCell>
                </TableRow>
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