import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../screens/Home";

test("renders Home component", () => {
  render(<Home />);

  // Check if the text "Welcome to the Home Page" is present
  const welcomeText = screen.getByText(/Welcome to the Home Page/i);
  expect(welcomeText).toBeInTheDocument();

  // Check if the text "Please sign in to see your posts." is present
  const signInText = screen.getByText(/Please sign in to see your posts./i);
  expect(signInText).toBeInTheDocument();
});
