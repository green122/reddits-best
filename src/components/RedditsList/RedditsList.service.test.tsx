import React, { Children, FunctionComponent } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { StateContext } from "../../App";
import { RedditsState, ActionsTypes } from "../../models/reddit.model";
import { useFetchRedditsList } from "./RedditsList.service";

describe("Render List service", () => {
  it("should render with th already fetched data", async () => {
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

    const mockSuccessResponse = { reddits: [{ id: "1" }, { id: "2" }] };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse  as unknown as Response);
    const mockFetchPromise = Promise.resolve<Response>({
      json: () => mockJsonPromise
    } as Response);

    jest.spyOn(window, "fetch").mockImplementation(() => mockFetchPromise);

    const wrapper: FunctionComponent<any> = ({
      children
    }: {
      children: any;
    }) => (
      <StateContext.Provider
        value={{ state: initialState as RedditsState, dispatch }}
      >
        {children}
      </StateContext.Provider>
    );

    renderHook(() => useFetchRedditsList(), { wrapper });
    await new Promise(resolve => setImmediate(resolve));
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: ActionsTypes.REDDITS_FETCHING });
    expect(dispatch).toHaveBeenLastCalledWith({
      type: ActionsTypes.REDDITS_FETCHED,
      payload: mockSuccessResponse
    });
  });
});
