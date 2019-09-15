import React from "react";
import ReactDOM from "react-dom";
import App, { reducer } from "./App";
import { RedditsState, ActionsTypes } from "./models/reddit.model";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("reducer", () => {
  let initialState: RedditsState;
  beforeEach(() => {
    initialState = {
      reddits: [],
      isLoading: false,
      error: false,
      subReddits: {}
    };
  });
  it("should handle reddits fetching action", () => {
    const resultedState = reducer(initialState, {
      type: ActionsTypes.REDDITS_FETCHING
    });
    expect(resultedState.isLoading).toBeTruthy();
  });
  it("should handle reddits fetching action", () => {
    const resultedState = reducer(initialState, {
      type: ActionsTypes.SUB_REDDIT_FETCHING
    });
    expect(resultedState.isLoading).toBeTruthy();
  });

  it("should handle reddits fetched action", () => {
    const mockServerData = {
      data: {
        children: [
          {
            data: {
              title: "faketitle",
              id: "fakeid",
              score: 123,
              permalink: "fakelink",
              subreddit_id: "subRedditId",
              subreddit: "subRedditName",
              subreddit_name_prefixed: "subReddit"
            }
          },
          {
            data: {
              title: "faketitle1",
              id: "fakeid1",
              score: 234,
              permalink: "fakelink1",
              subreddit_id: "subRedditId1",
              subreddit: "subRedditName1",
              subreddit_name_prefixed: "subReddit1"
            }
          }
        ]
      }
    };

    const expected = [
      {
        subRedditId: "subRedditId",
        subRedditName: "subRedditName",
        title: "faketitle",
        id: "fakeid",
        permalink: "fakelink",
        points: 123,
        subReddit: "subReddit"
      },
      {
        subRedditId: "subRedditId1",
        subRedditName: "subRedditName1",
        title: "faketitle1",
        id: "fakeid1",
        permalink: "fakelink1",
        points: 234,
        subReddit: "subReddit1"
      }
    ];
    const resultedState = reducer(initialState, {
      type: ActionsTypes.REDDITS_FETCHED,
      payload: mockServerData
    });
    expect(resultedState.reddits).toEqual(expected);
  });
  it("should handle sub reddits fetched action", () => {
    const mockServerData = {
      data: {
        display_name: "fakename",
        title: "faketitle",
        public_description: "fakedescription",
        subscribers: 1000,
        display_name_prefixed: "fakeprefixedname"
      }
    };

    const expected = {
      fakename: {
        description: "fakedescription",
        prefixedName: "fakeprefixedname",
        subscribers: 1000,
        title: "faketitle"
      }
    };
    const resultedState = reducer(initialState, {
      type: ActionsTypes.SUB_REDDIT_FETCHED,
      payload: mockServerData
    });
    expect(resultedState.subReddits).toEqual(expected);
  });
});
