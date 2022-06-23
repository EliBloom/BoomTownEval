import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import DisplayGitInfo from "./components/info-loader/DisplayGitInfo";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';


import SquareIcon from '@mui/icons-material/Square';


export default function App() {
  const baseUrl = "https://api.github.com/orgs/";
  const [primaryLoadError, setPrimaryLoadError] = useState("");
  const [baseJSON, setBaseJson] = useState({});
  const [gitEndpoint, setGitEndpoint] = useState(
    "https://api.github.com/orgs/boomtownroi"
  );

  async function loadGitInfo() {
    let response = await fetch(gitEndpoint);

    let json = await response.json();
    if (!response.ok) {
      console.log("errr");
    }

    setBaseJson(json);

    console.log(json.is_verified)

  

    console.log(json);
  }

  useEffect(() => {
    loadGitInfo();
  },[gitEndpoint]);

  /**
   * Event Handlers
   */


  function clearGitEndpoint(){}

  return <div className="App">
    <div className="endpoint-input-div">
      <TextField id="endpoint-input" label="Enter Desired Endpoint" varient="filled" defaultValue={gitEndpoint}></TextField>
      <Button id="clear-text-button" label="Clear" onClick={clearGitEndpoint} variant="outlined"><ClearIcon/></Button>
    </div>
    <div className="primary-fields-list">
      {/* the primary fields */}
      <List  subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Primary Fields on GIT API Endpoint
        </ListSubheader>
      }>
          <ListItem disablePadding>
              <ListItemIcon>
                <SquareIcon fontSize="1px"/>
              </ListItemIcon>
                <ListItemText >
                  Id: {baseJSON.id}
                </ListItemText>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
              <ListItemIcon>
                <SquareIcon  fontSize="1px"/>
              </ListItemIcon>
              <ListItemText >
                Name: {baseJSON.name}
              </ListItemText>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
              <ListItemIcon>
                <SquareIcon fontSize="1px"/>
              </ListItemIcon>
              <ListItemText >
                Html_url: {baseJSON.html_url}
              </ListItemText>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
              <ListItemIcon>
                <SquareIcon fontSize="1px"/>
              </ListItemIcon>
              <ListItemText >
                is_verified: {baseJSON.is_verified}
              </ListItemText>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
              <ListItemIcon>
                <SquareIcon fontSize="1px"/>
              </ListItemIcon>
              <ListItemText >
                Created_at: {baseJSON.created_at}
              </ListItemText>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
              <ListItemIcon>
                <SquareIcon fontSize="1px"/>
              </ListItemIcon>
              <ListItemText >
                updated_at: {baseJSON.updated_at}
              </ListItemText>
          </ListItem>
        </List>
    </div>
    <List  subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Primary Fields on GIT API Endpoint
        </ListSubheader>
      }>
      <DisplayGitInfo/>
    </List>
    </div>;
}