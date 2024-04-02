import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers like toBeInTheDocument
import SaveInformation from "./index";

describe("SaveInformation component", () => {
  it("renders spinner when isSaving is true", () => {
    const lastSaved = new Date();
    const { getByTestId } = render(
      <SaveInformation isSaving={true} lastSaved={lastSaved} />
    );
    const spinner = getByTestId("save-information-spinner");

    expect(spinner).toBeInTheDocument();
  });

  it("renders last saved time when isSaving is false", async () => {
    const lastSaved = new Date();
    const { getByText } = render(
      <SaveInformation isSaving={false} lastSaved={lastSaved} />
    );

    await waitFor(() => {
      expect(getByText("LAST SAVED")).toBeInTheDocument();
      expect(getByText("just now")).toBeInTheDocument();
    });
  });

  it("updates displayed time difference when lastSaved prop changes", async () => {
    const { getByText, rerender } = render(
      <SaveInformation isSaving={false} lastSaved={new Date()} />
    );

    await waitFor(() => {
      expect(getByText("just now")).toBeInTheDocument();
    });

    // Update lastSaved prop
    const newLastSaved = new Date(new Date().getTime() - 60000); // 1 minute ago
    rerender(<SaveInformation isSaving={false} lastSaved={newLastSaved} />);

    await waitFor(() => {
      expect(getByText("1 minute ago")).toBeInTheDocument();
    });
  });
});

