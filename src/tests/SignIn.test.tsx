import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom"; // Import MemoryRouter, Routes, and Route
import SignIn from "../screens/SignIn";
import { Provider } from "react-redux";
import store from "../store";
import { authActions } from "../store/auth";

test("renders SignIn component", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<SignIn />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  // Check if the "Sign In" button is present
  const linkElement = screen.getByRole("button", { name: /Sign In/i });
  expect(linkElement).toBeInTheDocument();
});

test("form submission dispatches login action", () => {
  // Mock the store's dispatch method
  const mockDispatch = jest.spyOn(store, "dispatch");

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<SignIn />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  // Fill in the email and password fields
  const emailInput = screen.getByLabelText(/Email Address/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  // Submit the form
  const submitButton = screen.getByRole("button", { name: /Sign In/i });
  fireEvent.click(submitButton);

  // Check if the login action was dispatched
  expect(mockDispatch).toHaveBeenCalledWith(
    authActions.login({
      email: "test@example.com",
      password: "password123",
    })
  );

  // Restore the original dispatch method
  mockDispatch.mockRestore();
});
