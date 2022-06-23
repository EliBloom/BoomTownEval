import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import DisplayGitInfo from "./components/info-loader/DisplayGitInfo";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";

import SquareIcon from "@mui/icons-material/Square";

export default function App() {
  const baseUrl = "https://api.github.com/orgs/";
  const [primaryLoadError, setPrimaryLoadError] = useState("");
  const [baseJson, setBaseJson] = useState({});
  const [isCreatedByNewer, setIsCreatedByNewer] = useState(false);
  const [isUpdatedByNewer, setIsUpdatedByNewer] = useState(false);

  const [gitEndpoint, setGitEndpoint] = useState(
    "https://api.github.com/orgs/boomtownroi"
  );
  const [isAccountVerified, setIsAccontVerified] = useState(false);
  /**
   *
   * */
  async function loadBaseJson() {
    if (gitEndpoint.includes(baseUrl)) {
      let response = await fetch(gitEndpoint);

      let json = await response.json();
      if (!response.ok) {
        setPrimaryLoadError(response.status);
      } else {
        setBaseJson(json);
        setIsAccontVerified(true);
      }
    }
  }

  useEffect(() => {
    loadBaseJson();
  });

  /*********************************
  * Event Handlers
  /*********************************

  /**
   * 
   * */
  function clearGitEndpoint() {
    setGitEndpoint("");
  }
  function changeEndpoint(event) {
    setGitEndpoint(event.target.value);
  }
  function closeErrorAlert() {
    setPrimaryLoadError("");
  }

  return (
    <div className="app">
      <div className="endpoint-input-div">
        <Avatar
          id="git-repo-avatar"
          alt="GIT repo avatar"
          src={baseJson?.avatar_url}
          sx={{ width: 100, height: 100 }}
        />

        <TextField
          id="endpoint-input"
          label="Enter Desired Endpoint"
          varient="filled"
          defaultValue={gitEndpoint}
          value={gitEndpoint}
          onChange={changeEndpoint}
        ></TextField>
        <Button
          id="clear-text-button"
          label="Clear"
          onClick={clearGitEndpoint}
          variant="outlined"
        >
          <ClearIcon />
        </Button>
      </div>
      {primaryLoadError && (
        <Alert variant="filled" severity="error" onClose={closeErrorAlert}>
          There has been an error loading from GIT API : {primaryLoadError}
        </Alert>
      )}
      <div className="primary-fields-list">
        {/* the primary fields */}
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Primary Fields on GIT API Endpoint
            </ListSubheader>
          }
        >
          <ListItem>
            <ListItemIcon>
              <SquareIcon fontSize="1px" />
            </ListItemIcon>
            <ListItemText>Id: {baseJson.id}</ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <SquareIcon fontSize="1px" />
            </ListItemIcon>
            <ListItemText>Name: {baseJson.name}</ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <SquareIcon fontSize="1px" />
            </ListItemIcon>
            <ListItemText>Html_url: {baseJson.html_url}</ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <SquareIcon fontSize="1px" />
            </ListItemIcon>
            <ListItemText>
              Account Verified:{" "}
              <Switch label="sdf" disabled={!isAccountVerified} />
            </ListItemText>
            {/* <ListItemText>Verified Account: {baseJson.is_verified}</ListItemText> */}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <SquareIcon fontSize="1px" />
            </ListItemIcon>
            {isCreatedByNewer ? (
              <ListItemText>
                Created_at: {baseJson.created_at} **Newer Field**
              </ListItemText>
            ) : (
              <ListItemText>Created_at: {baseJson.created_at} </ListItemText>
            )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <SquareIcon fontSize="1px" />
            </ListItemIcon>
            {isUpdatedByNewer ? (
              <ListItemText>
                updated_at: {baseJson.updated_at} **Newer Field**
              </ListItemText>
            ) : (
              <ListItemText>updated_at: {baseJson.updated_at}</ListItemText>
            )}
          </ListItem>
        </List>
      </div>
      {/* <DisplayGitInfo className="display-git-info" json={baseJson} /> */}
    </div>
  );
}
