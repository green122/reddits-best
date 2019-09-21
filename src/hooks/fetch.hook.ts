import { useEffect, useContext } from "react";
import { fetchData } from "../utils/fetchData";
import { StateContext } from "../App";
import { FetchActions } from "../models/reddit.model";

export function useFetch<ActionTypes>(url: string, fetchActions: FetchActions<ActionTypes>)  {
const { dispatch } = useContext(StateContext);
useEffect(() => {
    fetchData(
      async () => {
        const data = await fetch(url);
        const parsed = await data.json();
        return parsed;
      },
      dispatch,
      fetchActions
    );
  }, [dispatch, fetchActions, url]);
}