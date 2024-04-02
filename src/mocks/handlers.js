import { http, HttpResponse } from "msw";
import { MOCK_DATA } from "./data/cards";

const delay = (delayInMS) => {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
};

export const handlers = [
  http.get("/api/get-cards", async () => {
    const previouslySaved = localStorage.getItem("previouslySavedCards");
    //adding a realistic delay
    await delay(500);
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
    //adding a realistic delay
    await delay(500);
    return HttpResponse.json({ status: "success", lastSavedAt: lastSavedAt });
  }),
];

