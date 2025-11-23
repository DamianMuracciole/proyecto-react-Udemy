import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe("giphyAPI", () => {
  test("should be configured correctly", () => {
    const params = giphyApi.defaults.params;
    
    //se hace el expect sobre la url
    expect(giphyApi.defaults.baseURL).toBe("https://api.giphy.com/v1/gifs");

    //se hace el expect sobre el lang y la api_key
    expect(giphyApi.defaults.params.lang).toBe("es");
    expect(giphyApi.defaults.params.api_key).toBe(
      import.meta.env.VITE_API_KEY_GIPHY
    );

    //otra forma de hacer el expect sobre el lang y la api_key es
    expect(params).toStrictEqual({
      lang: "es",
      api_key: import.meta.env.VITE_API_KEY_GIPHY,
    });
  });
});
