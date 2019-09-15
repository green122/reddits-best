import { fetchData } from "./fetchData";
import { ActionsTypes } from "../models/reddit.model";

const redditsFetchActions = [
    ActionsTypes.REDDITS_FETCHING,
    ActionsTypes.REDDITS_FETCHED,
    ActionsTypes.REDDITS_ERROR
  ];

describe('Fetch Data Function',  () => {
    it('should dispatch start action then success when fetch function resolves correctly', async () => {
        const dispatch = jest.fn();
        fetchData(() => Promise.resolve({ test: 'test'}), dispatch,  redditsFetchActions)
        expect(dispatch).toHaveBeenCalledWith({ type: ActionsTypes.REDDITS_FETCHING });
        await new Promise(resolve => setImmediate(resolve));        
        expect(dispatch).toHaveBeenLastCalledWith({ type: ActionsTypes.REDDITS_FETCHED, payload: { test: 'test'} });
    });

    it('should dispatch start action then fail action when fetch  function resolves incorrectly', async () => {
        const dispatch = jest.fn();
        fetchData(() => Promise.reject({ error: 'error'}), dispatch,  redditsFetchActions)
        expect(dispatch).toHaveBeenCalledWith({ type: ActionsTypes.REDDITS_FETCHING });
        await new Promise(resolve => setImmediate(resolve));        
        expect(dispatch).toHaveBeenLastCalledWith({ type: ActionsTypes.REDDITS_ERROR, payload: { error: 'error'} });
    });
    
});
