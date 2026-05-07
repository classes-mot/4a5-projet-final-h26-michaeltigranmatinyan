import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import SignUp from "./SignUp";

// Mocker react-router-dom pour espionner navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe("Composant SignUp", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.alert = vi.fn();
  });

  it("soumet le formulaire d'inscription avec succès", async () => {

    const mockAuthContext = {
      isLoggedIn: false,
      token: null,
      login: vi.fn(),
      logout: vi.fn()
    };

    const mockToken = "fake-jwt-token-signup";

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: mockToken, message: "Success" })
      })
    );

    const { container } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const usernameInput = container.querySelector("#signup-username");
    const phoneInput = container.querySelector("#signup-phone");
    const passwordInput = container.querySelector("#signup-password");
    const confirmInput = container.querySelector("#signup-confirm");
    const submitButton = container.querySelector("#signup-submit");

    fireEvent.change(usernameInput, { target: { value: "newuser" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(passwordInput, { target: { value: "pass123" } });
    fireEvent.change(confirmInput, { target: { value: "pass123" } });
    fireEvent.click(submitButton);

    // 3. Assert (Vérifier)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/users/register"),
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: "newuser", password: "pass123", phoneNumber: "1234567890" })
        })
      );
    });

    expect(mockAuthContext.login).toHaveBeenCalledWith(mockToken);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
