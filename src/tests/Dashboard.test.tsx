import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../screens/Dashboard";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

test("renders Dashboard", () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(
    /Welcome to your dashboard. Here's a list of posts and their comments:/i
  );
  expect(linkElement).toBeInTheDocument();
});
