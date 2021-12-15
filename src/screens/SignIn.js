import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import routes from '../routes';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { SERVER_URL, USER, TOKEN } from '../config';
import Input from '../components/Input';
import { Modal,Box } from '@material-ui/core';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn( ) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    //ajax form event
    const { register, handleSubmit, getValues } = useForm({
      mode: "onChange",
      defaultValues: {
        name: location?.state?.name || "",
        password: location?.state?.password || "",
      },
    })
  
    const onSubmit = data => {
        const { name, password } = getValues();
        //login rest api

        axios.get(`${SERVER_URL}/login/verify/${name}/${password}`, {
          params: {
            name: name.toString(),
            password: password.toString(),
          }
        })
        .then(function (response) {
             // response  
             console.log("LOGIN CHECK");
             const result = response.data.user_id;
             if(result === undefined || result === null){
                handleOpen();
                //modal
             }else{
                //login

                localStorage.removeItem(TOKEN);
                localStorage.removeItem(USER);

                localStorage.setItem(USER, result);
                localStorage.setItem(TOKEN, true);

                history.push(routes.main);
                window.location.replace(`/main`);
             };

             
        }).catch(function (error) {
            // 오류발생시 실행
        }).then(function() {
            // 항상 실행
        });

    };
    //end

    const clearLoginError = () => {
    };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h3" variant="h3">
          <strong>
          My work to do
          </strong>
        </Typography>

        <Avatar className={classes.avatar} src="/logo192.png" />

        <Typography component="h5" variant="h5">
          <strong>
          로그인
          </strong>
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>

              <Input
                type="text" onChange={clearLoginError} placeholder="이름을 입력해주세요" {...register("name",{required: true})}
              />

              <Input
                type="password"onChange={clearLoginError} placeholder="비밀번호를 입력해주세요" {...register("password",{required: true})}
              />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <strong>로그인</strong>
          </Button>
          </form>

          
          <Grid container>
            <Grid item xs>
            </Grid>

            <Grid item>
                <Link to={routes.signUp} style={{ textDecoration: 'none' }}>
                  <Button>
                  {"간편 회원가입"}
                  </Button>
                </Link>
            </Grid>
           
          </Grid>

          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" color="secondary">
                  로그인 에러
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} color="primary">
                  아이디와 비밀번호를 확인해주세요.
                </Typography>
              </Box>
            </Modal>
          </div>
        
      </div>
      
    </Container>
  );
}