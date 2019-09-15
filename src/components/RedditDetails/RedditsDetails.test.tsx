import React from "react";

// import react-testing methods
import { render, fireEvent, waitForElement } from "@testing-library/react";

// add custom jest matchers from jest-dom
// import "@testing-library/jest-dom/extend-expect";

import RedditsDetails from "./RedditDetails";
import { RouteComponentProps } from "react-router";
import { StateContext } from "../../App";
import { RedditsState } from "../../models/reddit.model";
import { BrowserRouter as Router, Route } from "react-router-dom";

it("test", () => {
  const props = ({
    match: { params: { subRedditName: "testname" } }
  } as unknown) as RouteComponentProps<{ subRedditName: string }>;
  const initialState = {
    reddits: [],
    isLoading: false,
    error: false,
    subReddits: {
      testname: {
        title: "subreddit",
        description: "testdescription",
        subscribers: 10000,
        prefixedName: "prefixedname"
      }
    }
  };
  const dispatch = jest.fn();
  const { getByTestId, container } = render(
    <StateContext.Provider
      value={{ state: initialState as RedditsState, dispatch }}
    >
      <Router>
        <RedditsDetails {...props} />
      </Router>
    </StateContext.Provider>
  );
  expect(getByTestId('descr').innerHTML).toBe('testdescription');
});
