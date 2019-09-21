import { Dispatch} from "react";
import { AnyAction, FetchActions } from "../models/reddit.model";

export function fetchData(
  fetchFunction: () => Promise<any>,
  dispatch: Dispatch<AnyAction>,
  fetchActionsTypes: FetchActions<any>
) {
  const [startActionType, successActionType, failActionType] = fetchActionsTypes;

  
  dispatch({ type: startActionType });
  const fetchResult = async () => {
    try {
      const result = await fetchFunction();
      dispatch({ type: successActionType, payload: result });
    } catch (error) {
      dispatch({ type: failActionType, payload: error });
    }
  };

  fetchResult();
}
