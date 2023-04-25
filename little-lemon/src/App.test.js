import { render, screen } from "@testing-library/react";
import BookingForm from "./Pages/Booking";

test("initial state of form inputs is set correctly", () => {
  render(<BookingForm availableTimes={['17:00', '18:00', '19:00']} />);

  const dateInput = screen.getByLabelText("Choose Date");
  const timeInput = screen.getByLabelText("Choose Time");
  const guestsInput = screen.getByLabelText("Number of guests");
  const occasionInput = screen.getByLabelText("Occasion");

  expect(dateInput).toHaveValue(new Date().toISOString().substring(0, 10));
  expect(timeInput).toHaveValue("17:00");
  expect(guestsInput).toHaveValue(1);
  expect(occasionInput).toHaveValue("Birthday");
});
