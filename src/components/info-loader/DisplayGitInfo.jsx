import React from "react";
import "../../styles/App.scss";

// MUI imports
import RelevantFields from "./json/GitApiFields.json";

/**
 * This is what creates the lists that will display the actaul data within the json object
 *
 * @param {*} json The orginizational level JSON passed in from the top component
 * @returns Nested lists of the fields on the respective url's
 */
export default function DisplayGitInfo({ json }) {
  /**
   * gets the Urls that are on the orginizational level based on custom JSON file
   * */
  function getTopLevelUrlsKeys() {
    let topLevelUrlkeysArr = Object.keys(RelevantFields);
    return topLevelUrlkeysArr;
  }

  /**
   * Creates the nested lists for the required fields found from wetching the top level usrl's
   *
   * TODO: not fully working, getting the nested fields were not working due to promise shenanigans when
   * trying to do fetchs in a loop and having the fields get rendered once the promise resolves and simply ran out of time
   * */
  function createFieldsLists() {
    //these are the top level url's
    let topLevelUrls = getTopLevelUrlsKeys();

    let elements = (
      <div className="top-level-url-fields-div">
        <ul>
          {topLevelUrls.map((url) => {
            if (Object.keys(json).length !== 0) {
              let newUrl = json[url];
              let loadedFieldsArr = loadFieldsArr(newUrl);
              /**
               * TODO: fix the listing, since they are not able to be rendered due to promise shenanigans and I simply ran out of time. Could maybe have just manually extracted the data with
               * separate fetchs for each primary level url's, but yet again, ran out of time
               */
              return (
                <li>
                  {url}
                  <ul>
                    {loadedFieldsArr.length > 0 ? (
                      loadFieldsArr.map((item) => {
                        return <li>{item}</li>;
                      })
                    ) : (
                      <></>
                    )}
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
   * Does the fetch call for each url passed in
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

  return <div>{createFieldsLists()}</div>;
}
