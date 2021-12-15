import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
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
import { useRecoilState } from "recoil";
import { toDoState } from "../components/atom";
import Board from "../components/Board";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { SERVER_URL, USER } from "../config";
import axios from "axios";
import { useHistory } from "react-router";
import { LogUserOut } from "../auth";
import { Avatar, Button } from "@material-ui/core";
import routes from "../routes";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import 'url-search-params-polyfill';

//box width size
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

//detail part
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 80vh;
  margin: 0 auto;

`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;


export default function WorkDetail({ location }) {
  const classes = useStyles();
  const history = useHistory();
  const user_id = localStorage.getItem(USER);
  const [open, setOpen] = React.useState(true);
  const [userName,setUserName] = useState("");
  let sampleJSON = {
    "해야할일": [],
    "처리중": [],
    "보류": [],
    "완료": [],
 };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const {work_id} = useParams();
  const [toDos, setToDos] = useRecoilState(toDoState);

  //didmount
  useEffect(()=>{

    //login user info
    axios.get(`${SERVER_URL}/user/${user_id}`, {
      params: {
        user_id: user_id,
      }
    })
      .then(function (response) {
          setUserName(response?.data?.name);
                
      }).catch(function (error) {

      }).then(function() {

      });
      //end

    axios.get(`${SERVER_URL}/task/${work_id}`, {
      params: {
        work_id: work_id,
      }
    })
    .then(function (response) {
         // response  
         console.log("task list");
         const editDatas = response.data;
         editDatas.map((editData) => {

            if(editData.step === "해야할일"){

                var aJson = new Object();
                aJson.id = editData.task_id;
                aJson.text = editData.task_name;
                aJson.user_name = editData.user_name;
                aJson.step = editData.step;
                aJson.completedYn = editData.completedYn;
                sampleJSON["해야할일"].push(aJson);

            }else if(editData.step === "처리중"){

              var aJson = new Object();
                aJson.id = editData.task_id;
                aJson.text = editData.task_name;
                aJson.user_name = editData.user_name;
                aJson.step = editData.step;
                aJson.completedYn = editData.completedYn;
                sampleJSON["처리중"].push(aJson);

            }else if(editData.step === "보류"){
              var aJson = new Object();
                aJson.id = editData.task_id;
                aJson.text = editData.task_name;
                aJson.user_name = editData.user_name;
                aJson.step = editData.step;
                aJson.completedYn = editData.completedYn;
                sampleJSON["보류"].push(aJson);

            }else if(editData.step === "완료"){
              var aJson = new Object();
                aJson.id = editData.task_id;
                aJson.text = editData.task_name;
                aJson.user_name = editData.user_name;
                aJson.step = editData.step;
                aJson.completedYn = editData.completedYn;
                sampleJSON["완료"].push(aJson);

            }


         });

         setToDos(sampleJSON);
         // rows rendering

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });

  //useEffect End
  },[]);

  //recoilstate는 array를 return 함
  const onDragEnd = (info) => {

    const { destination, source } = info;
    let params = new URLSearchParams();
    if (!destination) return;
    //목표 object 없으면 그냥 return
    if (destination?.droppableId === source.droppableId) {

      //toDoState 데이터가 들어옴
      //toDoState == recoil data

      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        //옮긴 테스크 삭제
        boardCopy.splice(destination?.index, 0, taskObj);
        //순서바꾸고 인덱스 복구
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    // board 이동하기
    if (destination.droppableId !== source.droppableId) {
      
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        
        sourceBoard.splice(source.index, 1);

        //axios.put
    
        console.log("taskobj");

        params.append('task_id', taskObj.id);
        params.append('step', destination.droppableId);

        const headers = {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept': '*/*'
        }

        axios.put(`${SERVER_URL}/task/update/step`, params, {headers}).then(function (response) {

        }).catch(function (error) {
            // 오류발생시 실행
        }).then(function() {
            // 항상 실행
        });

        //여기서 스탭이동 이벤트 터트리기
        
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }

  };

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
          <Avatar className={classes.avatar} src="/logo192.png" />
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <strong>워크 상세</strong>
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
            
            {/* Work Process Part */}
            <Grid item xs={12}>

              <DragDropContext onDragEnd={onDragEnd}>
              <Wrapper>
                <Boards>
                  {Object.keys(toDos).map((boardId) => (
                    <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
                  ))}
                </Boards>

              </Wrapper>

              </DragDropContext>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}