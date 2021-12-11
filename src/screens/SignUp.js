import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useHistory } from 'react-router-dom';
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
import 'url-search-params-polyfill';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  //ajax form event
  let params = new URLSearchParams();
  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = data => {
      const { name, password, email, team } = getValues();

      params.append('name', name);
      params.append('password', password);
      params.append('email', email);
      params.append('team', team);

      const headers = {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      }

      axios.post(`${SERVER_URL}/user/post`, params, {headers}).then(function (response) {
          console.log(response);
          history.push(routes.signIn, {
            message: "Account created. Please log in.",
            name,
            password,
          });

      }).catch(function (error) {
          // 오류발생시 실행
      }).then(function() {
          // 항상 실행
      });
  };
  //end

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>

          
            <Grid item xs={12}>
              <Input
                type="text" placeholder="이름을 입력해주세요" {...register("name",{required: true})}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="password" placeholder="비밀번호를 입력해주세요" {...register("password",{required: true})}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                  type="email" placeholder="이메일을 입력해주세요" {...register("email",{required: true})}
                />
            </Grid>
            <Grid item xs={12}>
              <Input
                  type="text" placeholder="팀명을 입력해주세요" {...register("team",{required: true})}
                />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="My work to do 서비스에 상기 정보 제공을 동의"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            간편 회원가입
            
          </Button>
          </form>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={routes.signIn} style={{ textDecoration: 'none' }}>
                로그인 돌아가기
              </Link>
            </Grid>
          </Grid>
        
      </div>

    </Container>
  );
}