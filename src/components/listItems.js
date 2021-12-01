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

export const mainListItems = (
  <div>

    <Link to={routes.main}>
    <ListItem button>
       
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      
      <ListItemText primary="Main" />
    </ListItem>
    </Link>

    <Link to={routes.workList}>
    <ListItem button>

      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
    
      <ListItemText primary="Work List" />
    </ListItem>
    </Link>

    <Link to={routes.groupList}>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Group List" />
    </ListItem>
    </Link>

    <Link to={routes.groupStatic}>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Group Statistics" />
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
      <ListItemText primary="sing up" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="log out" />
    </ListItem>
  </div>
);