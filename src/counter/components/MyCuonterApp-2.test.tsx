import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCuonterApp } from "./MyCuonterApp";

const handleAddMock = vi.fn();
const handleResetMock = vi.fn();
const handleSubtractMock = vi.fn();

vi.mock("../hooks/useCounter", () => ({
  useCounter: () => ({
    counter: 30,
    handleAdd: handleAddMock,
    handleReset: handleResetMock,
    handleSubtract: handleSubtractMock,
  }),
}));

describe("MyCounterApp", () => {
  test("shound render the component", () => {
    render(<MyCuonterApp />);
    // screen.debug()

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      `Counter: 30`
    );

    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Reset" })).toBeDefined();
  });

  test("If button +1 is clicked it should call handleAdd", () => {
    render(<MyCuonterApp />);

    const button = screen.getByRole("button", { name: "+1" });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(handleAddMock).toHaveBeenCalled();
    expect(handleAddMock).toHaveBeenCalledTimes(2);
    expect(handleSubtractMock).not.toHaveBeenCalled();
    expect(handleResetMock).not.toHaveBeenCalled();
  });

  test("If button -1 is clicked it should call handleAdd", () => {
    render(<MyCuonterApp />);

    const button = screen.getByRole("button", { name: "-1" });

    fireEvent.click(button);
    
    expect(handleSubtractMock).toHaveBeenCalled();
  });
});
