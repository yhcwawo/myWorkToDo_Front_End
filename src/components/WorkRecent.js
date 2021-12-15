import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import routes from '../routes';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { SERVER_URL, USER } from '../config';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { user_id_token } from '../auth';

// Generate WorkRecent Data
function createData(id, work_name, group_name, group_leader,team, group_number, created_date, to_date) {
  return { id, work_name, group_name, group_leader,team, group_number, created_date, to_date };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function WorkRecent() {
  const classes = useStyles();
  const [rowData,setRowData] = useState([]);
  const history = useHistory();
  // data part
  // const { data } = useUser();
  // console.log(data);
  const user_id = localStorage.getItem(USER);

 //didmount
 useEffect(()=>{

    axios.get(`${SERVER_URL}/work/recent/${user_id}`, {
      params: {
        user_id: user_id,
      }
    })
    .then(function (response) {
        // response  
        console.log("work recent");
        setRowData(response.data);

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });

  },[]);

  return (
    <React.Fragment>
      <Title>우선순위 WORK TO DO</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell >워크명</TableCell>
            <TableCell >그룹명</TableCell>
            <TableCell align="center">그룹장</TableCell>
            <TableCell align="center">생성일</TableCell>
            <TableCell align="center">마감일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <TableRow key={row.work_id}>
              {/* //  work_id, name, group_name, user_id, auth, group_number, group_master, team_name, created_date, to_date */}
              <TableCell  onClick={
                            () => {
                              history.push(`/work/${row.work_id}`);
                            }
              }>{row.name}</TableCell>
              <TableCell >{row.group_name}</TableCell>
              <TableCell align="center">{row.group_master}</TableCell>
              <TableCell align="center">{row.created_date}</TableCell>
              <TableCell align="center">{row.to_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link to={routes.workList}>
            워크 리스트 전체보기
        </Link>
      </div>
    </React.Fragment>
  );
}