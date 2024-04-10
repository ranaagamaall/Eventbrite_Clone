import { render, screen, cleanup, waitFor } from "@testing-library/react";
import ForgetPasswordPage from "./ForgetPasswordPage";
import userEvent from "@testing-library/user-event";
("@testing-library/jest-dom");
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});

describe("should render Forgetpassword component", () => {
  it("Failure Test", async () => {
    const handleSubmit = jest.fn();

    render(
      <MemoryRouter>
        <ForgetPasswordPageon Submit={handleSubmit} />
      </MemoryRouter>
    );

    const submitButton = screen.getByTestId("ForgetPasswordFormSubmitButton");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password is required")
      ).toBeInTheDocument();
    });
  });

  it("Invalid password", async () => {
    const handleSubmit = jest.fn();

    render(
      <MemoryRouter>
        <ForgetPasswordPage Submit={handleSubmit} />
      </MemoryRouter>
    );
    const password = screen.getByTestId("ForgetPasswordFormPasswordInput");
    userEvent.type(password, "123");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("password must be at least 8 charachters")
      ).toBeInTheDocument();
    });
  });

  it("Success Test", async () => {
    const handleSubmit = jest.fn();

    render(
      <MemoryRouter>
        <ForgetPasswordPage onSubmit={handleSubmit} />
      </MemoryRouter>
    );

    const submitButton = screen.getByTestId("ForgetPasswordFormSubmitButton");
    const password = screen.getByTestId("ForgetPasswordFormPasswordInput");
    userEvent.type(password, "12345678");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        password: "12345678"
      });
    });
  });
});
