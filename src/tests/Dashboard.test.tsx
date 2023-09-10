import React from "react";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import { Provider } from "react-redux";
import store from "../store";
import { authActions } from "../store/auth";

test("renders Dashboard component", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  // Check if the "Dashboard" title is present
  const dashboardTitle = screen.getByRole("heading", { name: /Dashboard/i });
  expect(dashboardTitle).toBeInTheDocument();
});

test("fetches posts and comments from the API", async () => {
  // Mock the fetch function to return dummy data
  const mockPosts = [
    { id: 1, title: "Post 1", body: "Body 1", userId: 1 },
    { id: 2, title: "Post 2", body: "Body 2", userId: 2 },
  ];

  const mockComments = [
    { id: 1, postId: 1, email: "user1@example.com", body: "Comment 1" },
    { id: 2, postId: 2, email: "user2@example.com", body: "Comment 2" },
  ];

  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      json: async () => mockPosts,
    })
    .mockResolvedValueOnce({
      json: async () => mockComments,
    });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  // Wait for API calls to resolve with an extended timeout
  await screen.findByText("Post 1", {}, { timeout: 10000 });
  await screen.findByText("Post 2", {}, { timeout: 10000 });
  await screen.findByText("Comment 1", {}, { timeout: 10000 });
  await screen.findByText("Comment 2", {}, { timeout: 10000 });

  // Assert that the data is displayed on the screen
  expect(screen.getByText("Post 1")).toBeInTheDocument();
  expect(screen.getByText("Post 2")).toBeInTheDocument();
  expect(screen.getByText("Comment 1")).toBeInTheDocument();
  expect(screen.getByText("Comment 2")).toBeInTheDocument();
});
