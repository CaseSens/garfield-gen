"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface ComicProviderProps {
  children: ReactNode;
}

export type ComicsByYear = {
  year: string;
  comics: Comic[];
};

export type Comic = {
  date: string;
  imageUrl: string;
};

interface ComicContextType {
  comicData: ComicsByYear[];
}

const ComicContext = createContext<ComicContextType | undefined>(undefined);

export const useComics = (): ComicContextType => {
  const context = useContext(ComicContext);

  if (context === undefined) {
    throw new Error("useComics must be used within a ComicProvider");
  }

  return context;
};


const ComicProvider: React.FC<ComicProviderProps> = ({ children }) => {
  const [comicData, setComicData] = useState<ComicsByYear[]>([]);

  const fetchComics = async () => {
    try {
      const response = await fetch("/garf_output_by_year.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ComicsByYear = await response.json();

      const yearlyComics: ComicsByYear[] = Object.entries(data).map(
        ([year, comics]): ComicsByYear => {
          return {
            year,
            comics: comics as Comic[],
          };
        }
      );

      setComicData(yearlyComics);
    } catch (err) {
      console.error("Failed to fetch comics:", err);
    }
  };

  useEffect(() => {
    fetchComics();
  }, []);

  return (
    <ComicContext.Provider value={{ comicData }}>{children}</ComicContext.Provider>
  );
};

export default ComicProvider;
