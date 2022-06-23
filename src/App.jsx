import React, { useState, useEffect, useRef } from "react";
import "./styles/App.scss";
import DisplayGitInfo from "./components/info-loader/DisplayGitInfo";
import { CustomSwitch } from "./components/info-loader/switch";

//MUI imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import SquareIcon from "@mui/icons-material/Square";

/**
 * The main container for the app, handles initial fet from given url, and manually renders
 * the fields on the returned JSON since those fields will be the same for different organizations
 *
 * @returns the over all app component
 */
export default function App() {
  const baseUrl = "https://api.github.com/orgs/";
  const [primaryLoadError, setPrimaryLoadError] = useState("");
  const [baseJson, setBaseJson] = useState({});
  const [isCreatedByNewer, setIsCreatedByNewer] = useState(false);
  const [isUpdatedByNewer, setIsUpdatedByNewer] = useState(false);
  const [userInput, setUserInput] = useState(
    "https://api.github.com/orgs/boomtownroi"
  );

  const [gitEndpoint, setGitEndpoint] = useState(
    "https://api.github.com/orgs/boomtownroi"
  );
  //For displaying whether or not the organization in the url is verified
  const [isAccountVerified, setIsAccontVerified] = useState(true);

  /**
   * Makes a fetch with the given url to a git account
   * */
  async function loadBaseJson() {
    if (gitEndpoint.includes(baseUrl)) {
      let response = await fetch(gitEndpoint);

      let json = await response.json();
      if (!response.ok) {
        setPrimaryLoadError(response.status);
      } else {
        setBaseJson(json);
        setIsAccontVerified(json.is_verified);
        json.created_at > json.updated_at
          ? setIsCreatedByNewer(true)
          : setIsUpdatedByNewer(true);
      }
    }
  }

  useEffect(() => {
    loadBaseJson();
  }, [gitEndpoint]);

  /*********************************
   * Event Handlers
   *********************************/

  function clearGitEndpoint() {
    setGitEndpoint("");
  }

  function changeEndpoint() {
    setGitEndpoint(userInput);
  }

  function closeErrorAlert() {
    setPrimaryLoadError("");
  }

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

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
          value={userInput}
          onChange={handleUserInput}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              changeEndpoint();
            }
          }}
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
              Organization Verified:
              <CustomSwitch
                sx={{ m: 1 }}
                checked={isAccountVerified}
                disabled={true}
              />
            </ListItemText>
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
                Updated_at: {baseJson.updated_at} **Newer Field**
              </ListItemText>
            ) : (
              <ListItemText>updated_at: {baseJson.updated_at}</ListItemText>
            )}
          </ListItem>
        </List>
      </div>
      {/* {Object.keys(baseJson).length > 0 && (
        <DisplayGitInfo className="display-git-info" json={baseJson} />
      )} */}
    </div>
  );
}
