import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers like toBeInTheDocument
import Card from "./index";

describe("Card component", () => {
  it("renders card title and image loader when image is loading", () => {
    render(<Card title="Test Card" position={1} img="test.jpg" />);

    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByTestId("card-loader")).toBeInTheDocument();
    expect(screen.queryByTestId("card-image")).toBeInTheDocument();
  });

  it("renders card title and image", () => {
    render(<Card title="Test Card" position={1} img="test.jpg" />);

    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.queryByTestId("card-image")).toBeInTheDocument();
  });

  it("calls onClick function when card is clicked", () => {
    const onClickMock = jest.fn();
    render(
      <Card
        title="Test Card"
        position={1}
        img="test.jpg"
        onClick={onClickMock}
      />
    );

    fireEvent.click(screen.getByText("Test Card"));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});

