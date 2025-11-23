import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  const initialValue = 31;

  test("should initialize with default value of 10", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(10);
  });

  test("should initialize with value", () => {
    const { result } = renderHook(() => useCounter(initialValue));

    expect(result.current.counter).toBe(initialValue);
  });

  test("shounld increment counter when handleAdd is called", () => {
    const { result } = renderHook(() => useCounter(initialValue));

    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(initialValue + 1);
  });

  test("should decrement counter when handleSubtract is called", () => {
    const { result } = renderHook(() => useCounter(initialValue));

    act(() => {
      result.current.handleSubtract();
    });

    expect(result.current.counter).toBe(initialValue - 1);
  });

  test("should set the counter to initial value when handleReset is called", () => {
    const { result } = renderHook(() => useCounter(initialValue));

    act(() => result.current.handleSubtract());
    act(() => result.current.handleSubtract());
    act(() => result.current.handleSubtract());
    act(() => result.current.handleSubtract());

    expect(result.current.counter).toBe(initialValue - 4);

    act(() => result.current.handleReset() );

    expect(result.current.counter).toBe(initialValue);
  });
});
