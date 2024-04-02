import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers like toBeInTheDocument
import Modal from "./index";

describe("Modal component", () => {
  it("renders modal content and close button", () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <Modal onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(getByText("Modal Content")).toBeInTheDocument();
    const closeButton = getByText("×");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("does not render close button if onClose is not provided", () => {
    const { queryByText } = render(
      <Modal>
        <div>Modal Content</div>
      </Modal>
    );

    expect(queryByText("×")).not.toBeInTheDocument();
  });

  it("does not close modal when clicking inside the modal body", () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <Modal onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>
    );

    const modalBody = getByText("Modal Content").parentElement;
    fireEvent.click(modalBody);
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it("closes modal when clicking outside the modal body", () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <Modal onClose={onCloseMock}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );

    const modalContainer =
      getByTestId("modal-content").parentElement.parentElement;
    fireEvent.click(modalContainer);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("closes modal when pressing the escape key", () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <Modal onClose={onCloseMock}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});

