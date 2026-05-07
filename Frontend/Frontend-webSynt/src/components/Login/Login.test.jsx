import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Login from "./Login";

// Mocker react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}));

// Mocker react-router-dom pour espionner navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe("Composant Login", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.alert = vi.fn();
  });

  it("soumet le formulaire de connexion avec succès", async () => {
    const mockAuthContext = {
      isLoggedIn: false,
      token: null,
      login: vi.fn(),
      logout: vi.fn()
    };

    const mockToken = "fake-jwt-token";

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: mockToken, message: "Success" })
      })
    );

    const { container } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const usernameInput = container.querySelector("#login-username");
    const passwordInput = container.querySelector("#login-password");
    const submitButton = container.querySelector("#login-submit");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/users/login"),
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: "testuser", password: "password123" })
        })
      );
    });

    expect(mockAuthContext.login).toHaveBeenCalledWith(mockToken);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
