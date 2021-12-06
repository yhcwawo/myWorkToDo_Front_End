import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
import { useRecoilState } from "recoil";
import { toDoState } from "../components/atom";


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
}));

//detail part
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 480px;
  justify-content: center;
  align-items: center;
  height: 80vh;
  margin: 0 auto;

`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: skyblue;
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: white;
`;


export default function WorkDetail() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [toDos, setToDos] = useRecoilState(toDoState);
  //recoilstate는 array를 return 함
  const onDragEnd = ({ draggableId, destination, source } ) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      // 1) Delete item on source.index

      toDosCopy.splice(source.index, 1);

      // 2) Put back the item on the destination.index

      toDosCopy.splice(destination?.index, 0, draggableId);
 
      return toDosCopy;
    });
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
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Work Detail
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
            
            {/* Work Process Part */}
            <Grid item xs={12}>

              <DragDropContext onDragEnd={onDragEnd}>
              <Wrapper>
                <Boards>
                  <Droppable droppableId="one">
                    {(swipe) => (
                      <Board ref={swipe.innerRef} {...swipe.droppableProps}>
                        {toDos.map((toDo, index) => (
                          <Draggable key={toDo} draggableId={toDo} index={index}>
                            {(swipe) => (
                              <Card
                                ref={swipe.innerRef}
                                {...swipe.dragHandleProps}
                                {...swipe.draggableProps}
                              >
                                {toDo}
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {/* block chaning box size  */}
                        {swipe.placeholder}
                      </Board>
                    )}
                  </Droppable>
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