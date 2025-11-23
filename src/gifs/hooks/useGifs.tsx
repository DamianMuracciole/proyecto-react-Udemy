import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [searchedGifs, setSearchedGifs] = useState<Gif[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermsClicked = async (query: string) => {
    // if (gifsCache[query]) {
    //   setSearchedGifs(gifsCache[query]);
    //   return;
    // }

    if (gifsCache.current[query]) {
      setSearchedGifs(gifsCache.current[query]);
      return;
    }

    const gifs = await getGifsByQuery(query);
    setSearchedGifs(gifs);
    gifsCache.current[query] = gifs;

  };

  const handleSearch = async (query: string) => {
    query = query.toLowerCase().trim();
    if (query === "")
      return console.log("Debe insertar un elemento no vacío y sin espacios");
    if (previousTerms.includes(query))
      return console.log("busqueda ya realizada");
    const newsetPreviousTerms = [query, ...previousTerms].splice(0, 8);
    setPreviousTerms(newsetPreviousTerms);

    const gifs = await getGifsByQuery(query);
    setSearchedGifs(gifs);
    gifsCache.current[query] = gifs;
  };

  return {
    //Properties
    searchedGifs,
    previousTerms,
    //Methods
    handleTermsClicked,
    handleSearch,
  };
};
