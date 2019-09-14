export const redditUrl = (limit: number) => `https://www.reddit.com/best.json?limit=${limit}`;
export const subRedditInfoUrl = (subRedditName: string) => `https://www.reddit.com/r/${subRedditName}/about.json`;
