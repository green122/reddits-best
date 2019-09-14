import { RedditsState, IAction } from "../models/reddit.model";
import { useContext, Dispatch } from "react";
import { StateContext } from "../App";

export function useStoreSelector(stateSelector: (store: RedditsState) => any) : any {
    const { state } = useContext(StateContext);
    return stateSelector(state);
};

export function useDispatch() : Dispatch<IAction> {
    const { dispatch } = useContext(StateContext);
    return dispatch;
};