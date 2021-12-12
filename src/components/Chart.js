import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios';
import { SERVER_URL } from '../config';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('d-4', 0),
  createData('d-3', 3),
  createData('d-2', 4),
  createData('d-1', 4),
  createData('today', 4),
  createData('d+1', 4),
  createData('d+2', 4),
  createData('d+3', 4),
  createData('d+4', 1),
];

export default function Chart() {
  const theme = useTheme();

  const [rowData,setRowData] = useState([]);
  // data part
  //const {data} = useUser();


  // console.log(data);
  const user_id = 20;

  //didmount
  useEffect(()=>{

    axios.get(`${SERVER_URL}/static/group/${user_id}`, {
      params: {
        user_id: user_id,
      }
    })
    .then(function (response) {
         // response  
         console.log("main static chart");
         console.log(response.data);
         //setRowData(response.data);
         //work_id, name, group_name, user_id, auth, group_number, group_master, team_name, created_date, to_date
         // rows rendering

    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });

  },[]);
  //axios part

  return (
    <React.Fragment>
      <Title>주간 테스크 요약</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              테스크량
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
