import React from "react";
import { render, screen } from "@testing-library/react";

import SignIn from "../screens/SignIn";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

test("renders SignIn", () => {
  render(<SignIn />);
  const linkElement = screen.getByRole("button", { name: /Sign In/i });
  expect(linkElement).toBeInTheDocument();
});
