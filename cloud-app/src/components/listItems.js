import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import ArrowBackSharp from '@material-ui/icons/ArrowBackSharp';

export const mainListItems = (
  <div>
    <ListItem button onClick={()=>{
      window.location.href = "/dashboard"
    }}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button onClick={()=>{
      window.location.href = "/look-for-a-mentor"
    }}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Look For A Mentor" />
    </ListItem>
    <ListItem button onClick={()=>{
      window.location.href = "/become-a-mentor"
    }}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Become a Mentor" />
    </ListItem>
    <ListItem button onClick={()=>{
      window.location.href = "/"
    }}>
      <ListItemIcon>
        <ArrowBackSharp />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
  </div>
);
