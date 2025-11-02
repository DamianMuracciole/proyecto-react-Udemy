// import axios from "axios";
import type { GiphyResponse } from "../interfaces/giphy.response";
import type { Gif } from "../interfaces/gif.interface";
import { giphyApi } from "../api/giphy.api";

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  
  // forma tradicional con Axios
  // const response = await axios.get<GiphyResponse>(
  //   "https://api.giphy.com/v1/gifs/search",
  //   {
  //     params: {
  //       q: query,
  //       limit: 10,
  //       lang: "es",
  //       api_key: import.meta.env.VITE_API_KEY_GIPHY,
  //     },
  //   }
  // );

  //Otra forma
  const response = await giphyApi<GiphyResponse>(
    "/search",
    {
      params: {
        q: query,
        limit: 10,
      },
    }
  );

  return response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  }));
};
