import React, { useEffect, useState } from "react";
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
import routes from "../routes";
import { Avatar, Button } from "@material-ui/core";
import { SERVER_URL, USER } from "../config";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//modal part
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slide from '@material-ui/core/Slide';
import { LogUserOut } from "../auth";
import 'url-search-params-polyfill';

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function WorkList() {
  const classes = useStyles();
  const history = useHistory();
  const [userName,setUserName] = useState("");
  const [open, setOpen] = React.useState(true);

  //two modal controll
  const [openRegistModal, setOpenRegistModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  //modal state controll
  const [groupMaster, setGroupMaster] = React.useState("");
  const [groupName, setGroupName] = React.useState("");
  const [groupId, setGroupId] = React.useState("");
  const [groupWorkId, setGroupWorkId] = React.useState("");

  //row data state controll
  

  //select box db controll
  const [categorias, setCategorias] = useState([]);
  const [selectedCategorias, setselectedCategorias] = useState("");
  const maxWidth = 'sm';

  //modal close state function
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


  //click group_member regist button in regist modal
  const handleClickRegistMemberButton = () => {

    let params = new URLSearchParams();
    params.append('group_name', groupName);
    params.append('auth', '1');
    params.append('group_master', groupMaster);
    params.append('group_member', selectedCategorias);
    params.append('group_work_id', groupWorkId);

    const headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    }

    axios.post(`${SERVER_URL}/group/post/member`, params, {headers}).then(function (response) {
        console.log(response);
        window.location.replace(`/groupList`);

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });

    //close modal
    setOpenRegistModal(false);
  };

  // click delete button in delete modal
  const handleDeleteModalButton = () => {

    let params = new URLSearchParams();

    params.append('group_id', groupId);

    const headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    }

    axios.delete(`${SERVER_URL}/group/delete/${groupId}`, params, {headers}).then(function (response) {
      console.log("delete");

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });

    //modal close
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
                  setGroupWorkId(params.row.group_work_id);
                  setGroupMaster(params.row.group_master);
                  setGroupName(params.row.group_name);
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
                  setGroupId(params.row.id);
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

  const [rowData,setRowData] = useState([]);
  // data part

  const user_id = localStorage.getItem(USER);

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

         //grid rows rendering

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });
    
    //user list part 
    axios.get(`${SERVER_URL}/user/name`)
    .then(function (response) {
         console.log("user list");
         setCategorias(response.data);

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });

    //login user info
    axios.get(`${SERVER_URL}/user/${user_id}`, {
      params: {
        user_id: user_id,
      }
    }).then(function (response) {
          setUserName(response?.data?.name);
                
      }).catch(function (error) {

      }).then(function() {

      });
      //end

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

          <Avatar className={classes.avatar} src="/logo192.png" />
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <strong>워크 그룹 리스트</strong>
          </Typography>

          <IconButton color="inherit">
            <Badge color="secondary">

            <Typography component="h6" variant="h6" color="inherit" noWrap className={classes.title}>
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
                    value={selectedCategorias}
                    onChange={(ev) => setselectedCategorias(ev.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categorias.map((categoria) => (
                      <MenuItem key={categoria.user_id} value={categoria.user_id}>{categoria.name}</MenuItem>
                    ))}

                  </Select>
                </FormControl>

              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickRegistMemberButton} color="primary">
                <strong>등록</strong>
              </Button>

              <Button onClick={handleCloseRegistModal} color="primary">
                <strong>취소</strong>
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
                <strong>정말 그룹원을 삭제하시겠습니까?</strong>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteModalButton} color="primary">
                <strong>삭제</strong>
              </Button>
              <Button onClick={handleCloseDeleteModal} color="secondary">
                <strong>취소</strong>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        {/* delete modal part end */}

        </Container>
      </main>
    </div>
  );
}