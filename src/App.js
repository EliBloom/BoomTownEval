import React, { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  let [info, setInfo] = useState();
  let [endpoint, setEndpoint] = useState(
    "https://api.github.com/orgs/boomtownroi"
  );

  async function loadGitInfo() {
    let response = await fetch(endpoint);

    let json = await response.json();

    if (!response.ok) {
      console.log("errr");
    }

    console.log(json);
  }

  useEffect(() => {
    loadGitInfo();
  });

  return <div className="App">{info}herehere</div>;
}

export default App;
