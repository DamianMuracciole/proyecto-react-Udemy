import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test} from "vitest";
import { MyCuonterApp } from "./MyCuonterApp";


describe("MyCounterApp", () => {
  test("shound render the component", () => {
    render(<MyCuonterApp />);
    // screen.debug();

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      `Counter: 10`
    );

    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Reset" })).toBeDefined();
  });

  test("should increment the counter", () => {
    render(<MyCuonterApp />);

    const labelH1 = screen.getByRole("heading", { level: 1 });

    const button = screen.getByRole("button", { name: "+1" });

    fireEvent.click(button);

    expect(labelH1.innerHTML).toBe("Counter: 11");
  });

  test("should decrement the counter", () => {
    render(<MyCuonterApp />);

    const labelH1 = screen.getByRole("heading", { level: 1 });

    const button = screen.getByRole("button", { name: "-1" });

    fireEvent.click(button);

    expect(labelH1.innerHTML).toBe("Counter: 9");
  });

  test("should reset the counter", () => {
    render(<MyCuonterApp />);

    const labelH1 = screen.getByRole("heading", { level: 1 });

    const button = screen.getByRole("button", { name: "-1" });
    const resetButton = screen.getByRole("button", { name: "Reset" });

    fireEvent.click(button);
    fireEvent.click(button);
    expect(labelH1.innerHTML).toBe("Counter: 8");

    fireEvent.click(resetButton);
    expect(labelH1.innerHTML).toBe("Counter: 10");
  });
});
