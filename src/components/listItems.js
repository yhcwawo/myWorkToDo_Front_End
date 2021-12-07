import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
import routes from '../routes';

//좌측 메뉴 컨트롤
export const mainListItems = (
  <div>

    <Link to={routes.main} style={{ textDecoration: 'none' }}>
    <ListItem button>
       
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      
      <ListItemText primary="메인" />
    </ListItem>
    </Link>

    <Link to={routes.workList} style={{ textDecoration: 'none' }}>
    <ListItem button>

      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
    
      <ListItemText primary="워크 리스트" />
    </ListItem>
    </Link>

    <Link to={routes.groupList} style={{ textDecoration: 'none' }}>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="그룹 라스트" />
    </ListItem>
    </Link>

    <Link to={routes.groupStatic} style={{ textDecoration: 'none' }}>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="그룹 통계" />
    </ListItem>
    </Link>

  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Sub menu</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="log out" />
    </ListItem>
  </div>
);