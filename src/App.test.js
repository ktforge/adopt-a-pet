import { render, screen } from "@testing-library/react";
import App from "./App";

// fetch never resolves here, so the pages just sit on loading
beforeEach(() => {
  global.fetch = jest.fn(() => new Promise(() => {}));
});

test("renders the nav bar", () => {
  render(<App />);
  expect(screen.getByText(/all pets/i)).toBeInTheDocument();
});
