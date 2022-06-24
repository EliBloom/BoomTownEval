import React, { useState, useEffect } from "react";
import "../../styles/App.scss";

// MUI imports
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import RelevantFields from "./json/GitApiFields.json";
import SquareIcon from "@mui/icons-material/Square";
import Typography from "@mui/material/Typography";

export default function DisplayGitInfo({ json }) {
  // const [loadingUrlError, setloadingUrlError] = useState("");
  // const [baseJSON, setBaseJson] = useState({});
  const [lists, setLists] = useState();
  // const [gitEndpoint, setGitEndpoint] = useState(
  //   "https://api.github.com/orgs/boomtownroi"
  // );

  /**
   * gets the Urls that are on the orginizational level
   * */
  function getTopLevelUrlsKeys() {
    let topLevelUrlkeysArr = Object.keys(RelevantFields);
    return topLevelUrlkeysArr;
  }

  /**
   * creates the nested lists for the required fields found from wetching the top level usrl's
   * */
  function createFieldsLists() {
    let topLevelUrls = getTopLevelUrlsKeys();

    let elements = (
      <div className="top-level-url-fields-div">
        <ul>
          {topLevelUrls.map((url) => {
            if (Object.keys(json).length !== 0) {
              let newUrl = json[url];
              let loadedFieldsArr = loadFieldsArr(newUrl);

              return (
                <li>
                  {url}
                  <ul>
                    {/* {loadedFieldsArr.then((promise) => {
                      console.log(promise);
                    })} */}
                  </ul>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );

    return elements;
  }

  /**
   * helps unpack when fields that are loaded are nested
   * */
  async function loadFieldsArr(url) {
    if (url) {
      let response = await fetch(url);

      let json = await response.json();
      console.log(json);
      if (!response.ok) {
        return "User Doesn't Have permissions";
      } else {
        return json;
      }
    }
  }

  useEffect(() => {
    loadFieldsArr();
  }, [json]);

  /**
   * Event Handlers
   */

  return <div>{createFieldsLists()}</div>;
}
