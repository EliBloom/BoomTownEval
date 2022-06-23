import React, { useState, useEffect } from "react";
import "../../styles/App.scss";
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


export default function DisplayGitInfo({baseJson}) {
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
   
    </div>;
}