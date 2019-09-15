import { Dispatch } from "react";
import { IAction, ActionsTypes } from "../models/reddit.model";

export function fetchData(
  fetchFunction: () => Promise<any>,
  dispatch: Dispatch<IAction>,
  fetchActionsTypes: ActionsTypes[]
) {
  const [startAction, successAction, failAction] = fetchActionsTypes;
  dispatch({ type: startAction });
  const fetchResult = async () => {
    try {
      const result = await fetchFunction();
      dispatch({ type: successAction, payload: result });
    } catch (error) {
      dispatch({ type: failAction, payload: error });
    }
  };

  fetchResult();
}
