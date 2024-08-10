"use client";

import { fetchClients } from "@/lib/actions/client.action";
import { fetchIssues } from "@/lib/actions/issue.action";
import { fetchNewLettersEmails } from "@/lib/actions/news-letter.action";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

type ContextType = {
  clients: number;
  newsLetterSubscriptions: number;
  totalOpenIssues: number;
  totalClosedIssues: number;
  setClosed: Dispatch<SetStateAction<boolean>>;
  newsLetters: any[];

  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
};
const DashboardContext = createContext<ContextType>({} as ContextType);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<number>(0);
  const [newsLetterSubscriptions, setNewsLetterSubscriptions] =
    useState<number>(0);
  const [totalOpenIssues, setTotalOpenIssues] = useState<number>(0);

  const [totalClosedIssues, setTotalClosedIssues] = useState(0);
  const [closed, setClosed] = useState(false);
  const [newsLetters, setNewsLetters] = useState<any[]>([]);

  // NAVBAR

  const [toggled, setToggled] = useState(false);

  const getTotalClients = useCallback(async () => {
    try {
      const totalClients = await fetchClients();
      setClients(totalClients.length);
    } catch (error) {
      throw error;
    }
  }, []);
  useEffect(() => {
    getTotalClients();
  }, [getTotalClients]);

  const getTotalNewsLetterSubscriptions = useCallback(async () => {
    try {
      const letters = await fetchNewLettersEmails();
      setNewsLetters(letters);

      setNewsLetterSubscriptions(letters.length);
    } catch (error) {
      throw error;
    }
  }, []);
  useEffect(() => {
    getTotalNewsLetterSubscriptions();
  }, [getTotalNewsLetterSubscriptions]);

  const getTotalActiveIssues = useCallback(async () => {
    try {
      const openIssues: any = await fetchIssues();
      setTotalOpenIssues(openIssues.length);
    } catch (error) {
      throw error;
    }
  }, []);
  useEffect(() => {
    getTotalActiveIssues();
  }, [getTotalActiveIssues]);

  const getTotalClosedIssues = useCallback(async () => {
    try {
      const closedIssues = await fetchIssues();
      if (!closed) {
        setTotalClosedIssues(closedIssues.length);
      } else {
        let res = closedIssues.length - closedIssues.length + 1;
        setTotalClosedIssues(res++);
        setClosed(false);
      }
    } catch (error) {
      throw error;
    }
  }, [closed]);
  useEffect(() => {
    getTotalClosedIssues();
  }, [getTotalClosedIssues]);

  return (
    <DashboardContext.Provider
      value={{
        clients,
        newsLetterSubscriptions,
        totalOpenIssues,
        totalClosedIssues,
        setClosed,
        newsLetters,
        toggled,
        setToggled,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
