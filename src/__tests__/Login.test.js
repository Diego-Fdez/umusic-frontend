import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Login from "../pages/login/index";
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");

describe("The Application Component in logged out state", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      loginWithRedirect: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("When the app starts it renders a log in button", () => {
    render(<Login />);
    const loginElement = screen.getByText("Login");
    expect(loginElement).toBeInTheDocument();
  });

  test("It redirects the user to the Auth0 Universal Login page when the Log In button is pressed", async () => {
    const { loginWithRedirect } = useAuth0();

    render(<Login />);
    const loginElement = screen.getByText("Login");
    loginElement.click();

    // Expect that if we click the "Log In" button, the loginWithRedirect function gets called
    await waitFor(() => expect(loginWithRedirect).toHaveBeenCalledTimes(1));
  });
});
