import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import DisplayGitInfo from "./components/info-loader/DisplayGitInfo";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';


function App() {
  const baseUrl = "https://api.github.com/orgs/";
  const [primaryLoadError, setPrimaryLoadError] = useState("");
  const [baseJSON, setBaseJson] = useState({});
  const [gitEndpoint, setGitEndpoint] = useState(
    "https://api.github.com/orgs/boomtownroi"
  );

  async function loadGitInfo() {
    let response = await fetch(gitEndpoint);

    let json = await response.json();
    setBaseJson(json);

    if (!response.ok) {
      console.log("errr");
    }

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
    <TextField id="endpoint-input" label="Enter Desired Endpoint" varient="filled" defaultValue={gitEndpoint}></TextField>
    <Button label="Clear" onClick={clearGitEndpoint} variant="outlined"><ClearIcon/></Button>
    <DisplayGitInfo/>
    </div>;
}

export default App;
