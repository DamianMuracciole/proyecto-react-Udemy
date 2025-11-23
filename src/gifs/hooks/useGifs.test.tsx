import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { act, renderHook } from "@testing-library/react";
import * as gifsActions from "../actions/get-gifs-by-query.action";

describe("useGifs", () => {
  test("should return defaults values and methods", async () => {
    const { result } = renderHook(() => useGifs());

    // así lo hice yo
    //expect(result.current.previousTerms).toStrictEqual([]);
    //expect(result.current.searchedGifs).toStrictEqual([]);

    expect(result.current.searchedGifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermsClicked).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());

    console.log(result);

    await act(async () => {
      await result.current.handleSearch("goku");
    });

    expect(result.current.searchedGifs.length).toBe(10);
  });

  test("should return a list of gifs when handleTermsClicked is called", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermsClicked("goku");
    });

    expect(result.current.searchedGifs.length).toBe(10);
  });

  test("should return a list of gifs frim cache", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermsClicked("goku");
    });

    expect(result.current.searchedGifs.length).toBe(10);

    vi.spyOn(gifsActions, "getGifsByQuery").mockRejectedValue(
      new Error("This is my custom error")
    );

    await act(async () => {
      await result.current.handleTermsClicked("goku");
    });

    expect(result.current.searchedGifs.length).toBe(10);
  });

  test("should return no more than eigth previous terms", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifsActions, "getGifsByQuery").mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("goku1");
    });
    await act(async () => {
      await result.current.handleSearch("goku2");
    });
    await act(async () => {
      await result.current.handleSearch("goku3");
    });
    await act(async () => {
      await result.current.handleSearch("goku4");
    });
    await act(async () => {
      await result.current.handleSearch("goku5");
    });
    await act(async () => {
      await result.current.handleSearch("goku6");
    });
    await act(async () => {
      await result.current.handleSearch("goku7");
    });
    await act(async () => {
      await result.current.handleSearch("goku8");
    });
    await act(async () => {
      await result.current.handleSearch("goku9");
    });
    await act(async () => {
      await result.current.handleSearch("goku10");
    });

    expect(result.current.previousTerms).toStrictEqual([
      "goku10",
      "goku9",
      "goku8",
      "goku7",
      "goku6",
      "goku5",
      "goku4",
      "goku3",
    ]);
  });
});
