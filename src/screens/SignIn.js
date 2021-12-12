import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import routes from '../routes';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { SERVER_URL } from '../config';
import Input from '../components/Input';

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

        const headers = {
          'Content-type': 'application/json; charset=UTF-8',
          'Accept': '*/*'
        }

        //rest api

        const user_id = 20;

        axios.get(`${SERVER_URL}/user/login`, {
          params: {
            name: name.toString(),
            password: password.toString(),
          }
        })
        .then(function (response) {
             // response  
             console.log("work list");
             console.log(response);
             history.push(routes.main);
        }).catch(function (error) {
            // 오류발생시 실행
        }).then(function() {
            // 항상 실행
        });

        axios.get(`${SERVER_URL}/work/workList/${user_id}`, {
          params: {
            user_id: user_id,
          }
        })
        .then(function (response) {
             // response  
             console.log("work list");
             console.log(response.data);
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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
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
            로그인
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
        
      </div>
      
    </Container>
  );
}