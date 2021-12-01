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

// Generate WorkRecent Data
function createData(id, date, name, shipTo, paymentMethod, amount, func) {
  return { id, date, name, shipTo, paymentMethod, amount, func };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44, '삭제'),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99, '삭제'),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81, '삭제'),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39, '삭제'),
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
      <Title>Recent My Works</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Work name</TableCell>
            <TableCell>Group master</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Group member</TableCell>
            <TableCell align="center">Auth</TableCell>
            <TableCell align="center">Function</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center">{row.func}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link to={routes.workList}>
          More Work List
        </Link>
      </div>
    </React.Fragment>
  );
}