import { http, HttpResponse } from "msw";
import { MOCK_DATA } from "./data/cards";

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

export const handlers = [
  http.get("/api/get-cards", () => {
    const previouslySaved = localStorage.getItem("previouslySavedCards");
    return HttpResponse.json(
      previouslySaved
        ? JSON.parse(previouslySaved)
        : { lastSavedAt: new Date(), data: MOCK_DATA }
    );
  }),
  http.post("/api/set-cards", async ({ request }) => {
    const { data: cardsList } = await request.json();
    const lastSavedAt = new Date();
    const data = { lastSavedAt: lastSavedAt, data: cardsList };
    localStorage.setItem("previouslySavedCards", JSON.stringify(data));
    //adding a realistic delay for saving spinner to show
    await delay(500);
    return HttpResponse.json({ status: "success", lastSavedAt: lastSavedAt });
  }),
];

