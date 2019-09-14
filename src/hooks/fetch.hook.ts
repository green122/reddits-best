import { useEffect, Dispatch } from "react";
import { IAction, ActionsTypes } from "../models/reddit.model";

export function useFetch(
  url: string,
  dispatch: Dispatch<IAction>,
  fetchActionsTypes: ActionsTypes[]
) {
    useEffect(() => {
        const [startAction, successAction, failAction] = fetchActionsTypes;
    let cancelled = false;
    dispatch({ type: startAction });
    const fetchFunction = async () => {
      try {
        const data = await fetch(url);
        const parsed = await data.json();
        if (!cancelled) {
          dispatch({ type: successAction, payload: parsed });
        }
      } catch (error) {
        if (!cancelled) {
          dispatch({ type: failAction, payload: error });
        }
      }
    };

    fetchFunction();
    return () => {
      cancelled = true;
    };
  }, [dispatch, url, fetchActionsTypes]);
}
