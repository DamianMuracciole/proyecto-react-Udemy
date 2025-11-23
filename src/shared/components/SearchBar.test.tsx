import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("SearchBar", () => {
  test("should render searchbar correctly", () => {
    const { container } = render(<SearchBar onQuery={() => {}} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByRole("textbox")).toBeDefined();
    expect(screen.getByRole("button")).toBeDefined();
  });

  test("should call onQuery with the correct value after 1500ms", async () => {
    const wordTest = "lalala";
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: wordTest } });

    await waitFor(
      () => {
        //Nota: no funciona el waitfor para valores de 1000 ms por lo que hay que setear timeout
        expect(onQuery).toHaveBeenCalled();
        expect(onQuery).toHaveBeenCalledWith(wordTest);
      },
      { timeout: 1600 }
    );
  });

  test("should call onle once with the last value (debounce)", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(
      () => {
        //Nota: no funciona el waitfor para valores de 1000 ms por lo que hay que setear timeout
        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith("test");
      },
      { timeout: 1550 }
    );
  });

  test("should call onQuery when button clicked with the input value", () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "lalala" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith("lalala");
  });

  test("should the input has correct placeholder value", () => {
    render(<SearchBar onQuery={()=>{}} placeHolder="hola mundo" />);

    expect(screen.getByPlaceholderText('hola mundo')).toBeDefined()
  });
});
