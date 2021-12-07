import React from 'react';
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

// Generate WorkRecent Data
function createData(id, work_name, group_name, group_leader,team, group_number, created_date, to_date) {
  return { id, work_name, group_name, group_leader,team, group_number, created_date, to_date };
}

const rows = [
  createData(1, 'Snow', 'Elvis Presley', 'Jon', '페이북개발팀',312.44, '2021-11-30','2021-12-17' ),
  createData(2, 'Lannister', 'Paul McCartney', 'Jon', '페이북개발팀', 866.99, '2021-11-30','2021-12-17' ),
  createData(3, 'Lannister', 'Tom Scholz',  'Jon', '페이북개발팀',100.81, '2021-11-30','2021-12-17' ),
  createData(4, 'Stark', 'Michael Jackson', 'Gary, IN', '페이북개발팀',654.39, '2021-11-30','2021-12-17' ),

  
];

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
  return (
    <React.Fragment>
      <Title>최근 워크 리스트</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>워크명</TableCell>
            <TableCell>그룹명</TableCell>
            <TableCell align="center">그룹원 수</TableCell>
            <TableCell align="center">그룹장</TableCell>
            <TableCell align="center">팀명</TableCell>
            <TableCell align="center">생성일</TableCell>
            <TableCell align="center">마감기한</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              
              <TableCell>{row.id}</TableCell>
              <TableCell><Link to={routes.work}>{row.work_name}</Link></TableCell>
              <TableCell >{row.group_name}</TableCell>
              <TableCell align="center">{row.group_number}</TableCell>
              <TableCell align="center">{row.group_leader}</TableCell>
              <TableCell align="center">{row.team}</TableCell>
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