import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "../pages/index";

jest.mock("@auth0/auth0-react");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Home", () => {
  beforeEach(() => {
    jest.useRealTimers();
    useAuth0.mockReturnValue({
      getAccessTokenSilently: jest.fn(),
      isAuthenticated: true,
    });
  });

  it("test_home_function_renders_correctly", async () => {
    const { getAccessTokenSilently } = useAuth0();

    render(<Home />);
    await waitFor(() => expect(getAccessTokenSilently).toHaveBeenCalled());
  });
});
