import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomHeader } from "./CustomHeader";

describe("GifsApp", () => {
  const title = "Este es mi título";
  const description = "Este es mi descripción";

  test("should render the title correctly", () => {
    render(<CustomHeader title={title} />);
    // screen.debug();
    expect(screen.getByText(title)).toBeDefined();
    expect(screen.getByRole("heading").innerHTML).toBe(title);
  });

  test("should render the description when provided", () => {
    render(<CustomHeader title={title} description={description} />);
    // screen.debug();
    expect(screen.getByText(description)).toBeDefined();
    expect(screen.getByRole("paragraph").innerHTML).toBe(description);
  });

  test("should render the description when not provided", () => {
    const { container } = render(<CustomHeader title={title} />);

    const divElement = container.querySelector(".content-center");

    const p = divElement?.querySelector('p');

    expect(p).toBeNull()
  });
});
