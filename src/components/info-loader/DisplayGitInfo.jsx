import React, { useState, useEffect } from "react";
import "../../styles/App.scss";
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
import RelevantFields from "./json/GitApiFields.json";
import SquareIcon from "@mui/icons-material/Square";
import Collapse from "@mui/material/Collapse";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DisplayGitInfo({ json }) {
  const baseUrl = "https://api.github.com/orgs/";
  const [topLevelUrls, setTopLevelUrls] = useState();
  const [primaryLoadError, setPrimaryLoadError] = useState("");
  // const [baseJSON, setBaseJson] = useState({});
  const [lists, setLists] = useState();
  const [gitEndpoint, setGitEndpoint] = useState(
    "https://api.github.com/orgs/boomtownroi"
  );

  /**
   * gets the Urls that are on the orginizational level
   * */
  function getTopLevelUrls() {
    let topLevelUrlsArr = Object.keys(RelevantFields);
    return topLevelUrlsArr;
  }

  /**
   * creates the nested lists for the required fields found from wetching the top level usrl's
   * */
  function createFieldsLists() {
    let topLevelUrls = getTopLevelUrls();
    let elements = (
      <List
        className="fields"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Top Level URL's
          </ListSubheader>
        }
      >
        {topLevelUrls.map((url) => {
          if (Object.keys(json).length !== 0) {
            let newUrl = json[url];
            let info = loadGitInfo(newUrl);

            return (
              <>
                <ListItem key={info?.id}>
                  <ListItemIcon>
                    <SquareIcon fontSize="1px" />
                  </ListItemIcon>
                  <ListItemText>{url}</ListItemText>
                  <List>
                    {RelevantFields[url].map((item) => {
                      console.log(item);
                      if (typeof item === "string" || item instanceof String) {
                        return (
                          <>
                            <ListItem>
                              <ListItemIcon>
                                <SquareIcon fontSize="1px" />
                              </ListItemIcon>
                              <ListItemText>
                                {item}: {info[item]}
                              </ListItemText>
                            </ListItem>
                          </>
                        );
                      }
                    })}
                  </List>
                </ListItem>
                <Divider />
              </>
            );
          }
        })}
      </List>
    );
    return elements;
  }

  /**
   * helps unpack when fields that are loaded are nested
   * */
  function recursiveHelper() {}

  async function loadGitInfo(url) {
    if (url) {
      let response = await fetch(url);

      let json = await response.json();
      if (!response.ok) {
        console.log("errr");
      } else {
        return json;
      }

      console.log(json);
    }
  }

  useEffect(() => {
    createFieldsLists();
  }, [json]);

  /**
   * Event Handlers
   */

  function clearGitEndpoint() {}

  return <div>{createFieldsLists()}</div>;
}
