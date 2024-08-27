import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";
import { fetchPublications } from "./actions/publication.actions";
import { fetchIntroText } from "./actions/intro.action";
import { fetchClients } from "./actions/client.action";
import { fetchTeamMembers } from "./actions/team.action";
import { fetchPosts } from "./actions/post.action";
import { getUsers } from "./actions/user.action";
import { fetchIssues } from "./actions/issue.action";
import { fetchNewLettersEmails } from "./actions/news-letter.action";
import { fetchCareerPublications } from "./actions/career.actions";

type Callback = (...args: any[]) => Promise<any>;

export function cache<T extends Callback>(
  cb: T,
  keyParts?: string[],
  options?: {
    revalidate?: number | false;
    tags?: string[];
  }
) {
  return nextCache(reactCache(cb), keyParts, options);
}

const _1week = 60 * 60 * 24 * 7;

export const cachedPublication = cache(
  async () => {
    return await fetchPublications();
  },
  ["cachedPublication"],
  { revalidate: _1week, tags: ["publications"] }
);

export const cachedCareerPublication = cache(
  async () => {
    return await fetchCareerPublications();
  },
  ["cachedCareerPublication"],
  { revalidate: _1week, tags: ["career-publication"] }
);

export const cachedIntroText = cache(
  async () => {
    return await fetchIntroText();
  },
  ["cachedIntroText"],
  { revalidate: _1week, tags: ["intro-text"] }
);

export const cachedClientReview = cache(
  async () => {
    return await fetchClients();
  },
  ["cachedClientReview"],
  { revalidate: _1week, tags: ["client-review"] }
);

export const cachedTeamMembers = cache(
  async () => {
    return await fetchTeamMembers();
  },
  ["cachedTeamMembers"],
  { revalidate: _1week, tags: ["team-members"] }
);

export const cachedPosts = cache(
  async () => {
    return await fetchPosts();
  },
  ["cachedPosts"],
  { revalidate: _1week, tags: ["posts"] }
);

export const cachedIssues = cache(
  async () => {
    return await fetchIssues();
  },
  ["cachedIssues"],
  { revalidate: _1week, tags: ["issues"] }
);

export const cachedUsers = cache(
  async () => {
    return await getUsers();
  },
  ["cachedUsers"],
  { revalidate: _1week, tags: ["users"] }
);

export const cachedNewLetterEmails = cache(
  async () => {
    return await fetchNewLettersEmails();
  },
  ["cachedNewLetterEmails"],
  { revalidate: _1week, tags: ["news-letter"] }
);
