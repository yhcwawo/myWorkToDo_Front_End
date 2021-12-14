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
import { SERVER_URL } from "../config";
import axios from "axios";
import { user_id_token } from "../auth";
import { useHistory } from 'react-router-dom';

//modal part
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Slide from '@material-ui/core/Slide';

//data grid for work group
// id == essential value

//navigation bar 크기 지정
const drawerWidth = 240;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function WorkList() {
  const classes = useStyles();
  const history = useHistory();
  const [userName,setUserName] = useState("");
  const [open, setOpen] = React.useState(true);
  const [openRegistModal, setOpenRegistModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const maxWidth = 'sm';
  const handleClickOpenRegistModal = () => {
    setOpenRegistModal(true);
  };
  
  const handleCloseRegistModal = () => {
    setOpenRegistModal(false);
  };

  const handleClickOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const columns = [
    { field: 'id', 
      headerName: 'id', 
      width: 90,
      editable: false,
     // headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: '워크명',
      width: 150,
      editable: false,
     
    },
    {
      field: 'group_name',
      headerName: '워크그룹',
      width: 140,
      editable: false,
    },
    {
      field: 'group_master_name',
      headerName: '그룹장',
      width: 120,
      editable: false,
    },
    {
      field: 'group_member_name',
      headerName: '멤버명',
      width: 120,
      editable: false,
    },
    {
      field: 'group_number',
      headerName: '인원',
      width: 110,
      editable: false,
    },
    {
      field: 'to_date',
      headerName: '마감일',
      width: 130,
      editable: false,
    },
    {
      field: 'auth',
      headerName: '권한',
      width: 180,
      editable: false,
      headerAlign: 'center',
      align: 'left',
      renderCell: (params) => (
        <strong>
          {/* {params.value} */}
  
          {params.value == 0 ? (
  
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{marginLeft: 16}}
                onClick={() => {
                  handleClickOpenRegistModal();
                }}
              >
                등록
              </Button>
                
          ) : (
            ""
          )}
  
          {params.value == 0 ? (
  
            <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{marginLeft: 16}}
                onClick={() => {
                  handleClickOpenDeleteModal();
                }}
              >
                삭제
            </Button>
  
          ) : (
          ""
          )}

        </strong>
      ),
    },
  ];
  
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [rowData,setRowData] = useState([]);
  // data part

  const user_id = user_id_token;

  //didmount
  useEffect(()=>{

    //when system start, only 1 call function
    axios.get(`${SERVER_URL}/group/list/${user_id}`, {
      params: {
        group_member: user_id,
      }
    })
    .then(function (response) {
         // response  
         console.log("group list");
         setRowData(response.data);
         setRowData(response.data);

         //twice call because of data grid
         //grid rows rendering

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });
    
    //user list part 
    axios.get(`${SERVER_URL}/user/name`)
    .then(function (response) {
         // response  
         console.log("user list");
         console.log(response.data);

         //setRowData(response.data);

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
            <strong>워크 그룹 리스트</strong>
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

              <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rowData}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
              />
              </div>
            </Grid>


          </Grid>

  {/* regist diallog part */}
        <div>
          <Dialog 
            maxWidth={maxWidth}
            open={openRegistModal}
            onClose={handleCloseRegistModal}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">그룹원 등록</DialogTitle>
            <DialogContent>
              <DialogContentText>
                해당 워크에 등록 할 멤버를 선택해주세요.
              </DialogContentText>

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="max-width">멤버</InputLabel>
                  <Select
                    autoFocus
                    value={maxWidth}
                    // onChange={handleMaxWidthChange}
                    inputProps={{
                      name: 'max-width',
                      id: 'max-width',
                    }}
                  >
                    <MenuItem value={false}>false</MenuItem>
                    <MenuItem value="xs">xs</MenuItem>

                  </Select>
                </FormControl>

              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRegistModal} color="primary">
                등록
              </Button>

              <Button onClick={handleCloseRegistModal} color="primary">
                취소
              </Button>

            </DialogActions>
            
          </Dialog>
        </div>

        {/* regist part end */}

        {/* delete modal part */}

        <div>
          <Dialog
            open={openDeleteModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDeleteModal}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >

            <DialogTitle id="alert-dialog-slide-title">{"그룹원 삭제"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                정말 그룹원을 삭제하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteModal} color="primary">
                삭제
              </Button>
              <Button onClick={handleCloseDeleteModal} color="secondary">
                취소
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        {/* end delete modal part */}

        </Container>
      </main>
    </div>
  );
}