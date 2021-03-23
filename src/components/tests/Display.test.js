///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import fetchShow from "../../api/fetchShow";
import Display from "../Display";
import userEvent from "@testing-library/user-event";
//2. Test that the Display component renders without any passed in props.
test("Display renders without any errors", () => {
  render(<Display />);
});
const mockFetchShow = jest.fn(fetchShow);
//3. Rebuild or copy a show test data element as used in the previous set of tests.
const testShow = {
  //add in approprate test data structure here.
  name: "Test Show",
  summary: "",
  seasons: [{ id: 1, name: "Test Season", episodes: [] }],
};
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
test("show component displays when fetch button is pressed", async () => {
  render(<Display />);

  mockFetchShow.mockResolvedValueOnce();

  const fetchButton = await screen.findByRole("button");

  expect(fetchButton).toBeInTheDocument();
});
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
test("select options match fetched data", async () => {
  render(<Display />);

  mockFetchShow.mockResolvedValueOnce();

  const fetchButton = await screen.findByRole("button");

  userEvent.click(fetchButton);

  const seasonOptions = await screen.findAllByTestId("season-option");

  expect(seasonOptions.length).toBe(4);
});
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
test("display fn is called when fetch button is pressed", async () => {
  const mockDisplayFunc = jest.fn(() => {
    return 1;
  });

  render(<Display displayFunc={mockDisplayFunc} />);

  mockFetchShow.mockResolvedValueOnce();

  const fetchButton = await screen.findByRole("button");

  const waitForElementToBeClicked = async () => {
    await waitFor(() => {
      userEvent.click(fetchButton);
      expect(mockDisplayFunc.mock.calls.length).toBe(1);
    });
  };

  waitForElementToBeClicked().then(() => {
    expect(mockDisplayFunc.mock.calls.length).toBe(1);
  });
});
