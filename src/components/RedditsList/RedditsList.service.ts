import { useStoreSelector } from "../../hooks/useStore.hook";
import { useFetch } from "../../hooks/fetch.hook";
import { ActionsTypes, IReddit } from "../../models/reddit.model";
import { redditUrl } from "../../constants/api";
import { amountOfReddits } from "../../constants/common";
import { useState } from "react";

const redditsFetchActions: ActionsTypes[] = [
  ActionsTypes.REDDITS_FETCHING,
  ActionsTypes.REDDITS_FETCHED,
  ActionsTypes.REDDITS_ERROR
];

export function useFetchRedditsList() {
  const isError: boolean = useStoreSelector(state => state.error);
  const reddits: IReddit[] = useStoreSelector(state => state.reddits);
  const [reloadFlag, setReloadFlag] = useState(0);

  useFetch<ActionsTypes>(
    redditUrl(amountOfReddits),
    redditsFetchActions,
    reloadFlag
  );

  return {
    isError,
    reddits,
    refetch: () => setReloadFlag(reloadFlag => reloadFlag ^ 1)
  };
}
