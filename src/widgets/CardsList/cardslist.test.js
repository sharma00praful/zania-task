import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers like toBeInTheDocument
import CardsList from "./index";

describe("CardsList component", () => {
  const cardsData = [
    {
      type: "bank-draft",
      title: "Bank Draft",
      position: 1,
      thumbnail: "bank-draft.jpg",
    },
    {
      type: "bank-draft 2",
      title: "Bank Draft 2",
      position: 2,
      thumbnail: "bank-draft-2.jpg",
    },
  ];

  it("renders cards list with provided card data", () => {
    const { getByText } = render(
      <CardsList
        cardsData={cardsData}
        setCardsData={() => {}}
        onCardClick={() => {}}
        onChange={() => {}}
      />
    );

    expect(getByText("Bank Draft")).toBeInTheDocument();
    expect(getByText("Bank Draft 2")).toBeInTheDocument();
  });

  it("calls onCardClick callback when a card is clicked", () => {
    const onCardClickMock = jest.fn();
    const { getByText } = render(
      <CardsList
        cardsData={cardsData}
        setCardsData={() => {}}
        onCardClick={onCardClickMock}
        onChange={() => {}}
      />
    );

    fireEvent.click(getByText("Bank Draft"));
    expect(onCardClickMock).toHaveBeenCalledTimes(1);
    expect(onCardClickMock).toHaveBeenCalledWith(cardsData[0]);
  });
});

