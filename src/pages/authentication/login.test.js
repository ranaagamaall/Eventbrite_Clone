import { render, screen, cleanup, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import LoginPage from "./LoginPage";
import userEvent from "@testing-library/user-event";
("@testing-library/jest-dom");
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});

describe("should render LoginPage component", () => {
  it("Failure Test", async () => {
    const handleSubmit = jest.fn();

    render(
      <MemoryRouter>
        <LoginPage onSubmit={handleSubmit} />
      </MemoryRouter>
    );

    const submitButton = screen.getByTestId("LoginFormSubmitButton");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("Invalid Email address", async () => {
    const handleSubmit = jest.fn();

    render(
      <MemoryRouter>
        <LoginPage onSubmit={handleSubmit} />
      </MemoryRouter>
    );

    const submitButton = screen.getByTestId("LoginFormSubmitButton");
    const email = screen.getByTestId("LoginFormEmailInput");
    const password = screen.getByTestId("LoginFormPasswordInput");

    userEvent.type(email, "omarenoalaa475q");
    userEvent.type(password, "12345678");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument();
    });
  });
  it("incorrect password", async () => {
    const handleSubmit = jest.fn();

    render(
      <MemoryRouter>
        <LoginPage onSubmit={handleSubmit} />
      </MemoryRouter>
    );

    const submitButton = screen.getByTestId("LoginFormSubmitButton");
    const email = screen.getByTestId("LoginFormEmailInput");
    const password = screen.getByTestId("LoginFormPasswordInput");

    userEvent.type(email, "abdosayed40060@gmail.com");
    userEvent.type(password, "123456776543");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password is incorrect")
      ).toBeInTheDocument();
    });
  });
  it("no account associaed with this email ", async () => {
    const handleSubmit = jest.fn();

    render(
      <MemoryRouter>
        <LoginPage onSubmit={handleSubmit} />
      </MemoryRouter>
    );

    const submitButton = screen.getByTestId("LoginFormSubmitButton");
    const email = screen.getByTestId("LoginFormEmailInput");
    const password = screen.getByTestId("LoginFormPasswordInput");

    userEvent.type(email, "abdosayed4060@gmail.com");
    userEvent.type(password, "123456776543");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("There is no account associated with the email.")
      ).toBeInTheDocument();
    });
  });

  it("missing Password Test", async () => {
    const handleSubmit = jest.fn();

    render(
      <MemoryRouter>
        <LoginPage onSubmit={handleSubmit} />
      </MemoryRouter>
    );

    const submitButton = screen.getByTestId("LoginFormSubmitButton");
    const email = screen.getByTestId("LoginFormEmailInput");

    userEvent.type(email, "omarenoalaa475@gmail.com");

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("Success Test", async () => {
    const handleSubmit = jest.fn();

    render(
      <MemoryRouter>
        <LoginPage onSubmit={handleSubmit} />
      </MemoryRouter>
    );

    const submitButton = screen.getByTestId("LoginFormSubmitButton");
    const email = screen.getByTestId("LoginFormEmailInput");
    const password = screen.getByTestId("LoginFormPasswordInput");

    userEvent.type(email, "omarenoalaa475@gmail.com");
    userEvent.type(password, "12345678");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: "omarenoalaa475@gmail.com",
        password: "12345678"
      });
    });
  });
});
