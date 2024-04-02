import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers like toBeInTheDocument
import Spinner from "./index";

describe("Spinner component", () => {
  it("renders spinner with default size and data-testid", () => {
    const { getByTestId } = render(<Spinner />);
    const spinner = getByTestId("spinner");
    const spinnerBody = getByTestId("spinner-body");

    expect(spinner).toBeInTheDocument();
    expect(spinnerBody).toHaveClass("spinner-md");
  });

  it("renders spinner with custom className and small size", () => {
    const { getByTestId } = render(<Spinner className="custom-spinner" sm />);
    const spinner = getByTestId("spinner");
    const spinnerBody = getByTestId("spinner-body");

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("custom-spinner");
    expect(spinnerBody).toHaveClass("spinner-sm");
  });

  it("renders spinner with custom data-testid", () => {
    const { getByTestId } = render(<Spinner testid="custom-spinner" />);
    const spinner = getByTestId("custom-spinner");

    expect(spinner).toBeInTheDocument();
  });
});

