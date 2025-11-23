import { describe, test, expect, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";
import AxiosMockAdapter from "axios-mock-adapter";
import { giphyApi } from "../api/giphy.api";
import { giphyResponseSearchMock } from "../../../tests/mocks/giphy.response.data";
import { beforeEach } from "node:test";

describe("getGifsByQuery", () => {
  //establezco el mock
  const mock = new AxiosMockAdapter(giphyApi);

  //reseteo el mock para un nuevo test
  beforeEach(() => {
    mock.restore();
    mock.reset();
  });

  // test("should return a list of gifs", async () => {
  //   const gifs = await getGifsByQuery("goku");

  //   expect(gifs.length).toBe(10);

  //   const [gif1] = gifs;

  //   expect(gif1).toStrictEqual({
  //     id: expect.any(String),
  //     title: expect.any(String),
  //     url: expect.any(String),
  //     width: expect.any(Number),
  //     height: expect.any(Number),
  //   });
  // });

  test("should return a list of gifs", async () => {
    mock.onGet("/search").reply(200, giphyResponseSearchMock);

    const gifs = await getGifsByQuery("goku");
    // console.log(gifs)
    expect(gifs.length).toBe(10);

    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.url).toBe("string");
      expect(typeof gif.width).toBe("number");
      expect(typeof gif.height).toBe("number");
    });
  });

  test("should return an empty list if query is empty", async () => {
    const gifs = await getGifsByQuery("");
    // console.log(gifs)
    expect(gifs.length).toBe(0);
  });

  test("should handle errorwhen the API retorns an error", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {
        console.log("Spy Message Error");
      });

    mock.onGet("/search").reply(400, {
      data: {
        message: "Bad Request",
      },
    });

    const gifs = await getGifsByQuery("lalala");

    expect(gifs.length).toBe(0); //Espera que devuelva un arreglo vacio
    expect(consoleErrorSpy).toHaveBeenCalled(); //espera que devuelva que se ha llamado al console.error
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything())// espera que tenga en mensaje de error en la consola
  });
});
