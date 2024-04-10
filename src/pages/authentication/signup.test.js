import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";"@testing-library/jest-dom";
import SignupPage from "./SignupPage";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { Password } from "@mui/icons-material";

afterEach(() => {
    cleanup();
  });

  describe("should render SignUp component", () => 
  { 
    it('Failure Test (Not Valid Email))',async () => {
      const handleSubmit = jest.fn();
      render(
        <MemoryRouter>
          <SignupPage onSubmit={handleSubmit}/>
        </MemoryRouter>
        );
  
      const Continuebt = screen.getByTestId('ContinueBtn');
      const email = screen.getByTestId('EmailFieldInput');
      userEvent.type(email,"amr");
      userEvent.click(Continuebt);

      await waitFor(() => {
        expect(screen.getByText("Invalid email address")).toBeInTheDocument();
      });
    });

    it('Wrong confirmation email Test',async () => {
      const handleSubmit = jest.fn();
      render(
        <MemoryRouter>
          <SignupPage onSubmit={handleSubmit}/>
        </MemoryRouter>
        );
  
      const Continuebt = screen.getByTestId('ContinueBtn');
      const email = screen.getByTestId('EmailFieldInput');
      userEvent.type(email,"amr@gmail.com");
      userEvent.click(Continuebt);
      const confirmemail = screen.getByTestId("Confirmemailfield");
      const firstName = screen.getByTestId("FirstNamefield");
      const lastName = screen.getByTestId("LastNamefield");
      const password = screen.getByTestId("Passwordfield");
      const CreateBtn = screen.getByTestId("CreateBtn");
      userEvent.type(confirmemail,"a@gmail.com");
      userEvent.type(firstName,"amr");
      userEvent.type(lastName,"Ahmed");
      userEvent.type(password,"12345678");
      userEvent.click(CreateBtn);

      await waitFor(() => {
        expect(screen.getByText("Email address doesn't match. Please try again")).toBeInTheDocument();
      });
    });
    it('Success Test',async () => {
      const handleSubmit = jest.fn();
      render(
        <MemoryRouter>
          <SignupPage onSubmit={handleSubmit}/>
        </MemoryRouter>
        );
  
      const Continuebt = screen.getByTestId('ContinueBtn');
      const email = screen.getByTestId('EmailFieldInput');
      userEvent.type(email,"amr@gmail.com");
      userEvent.click(Continuebt);
      const confirmemail = screen.getByTestId("Confirmemailfield");
      const firstName = screen.getByTestId("FirstNamefield");
      const lastName = screen.getByTestId("LastNamefield");
      const password = screen.getByTestId("Passwordfield");
      const CreateBtn = screen.getByTestId("CreateBtn");
      userEvent.type(confirmemail,"amr@gmail.com");
      userEvent.type(firstName,"amr");
      userEvent.type(lastName,"ahmed");
      userEvent.type(password,"12345678");
      userEvent.click(CreateBtn);

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith({
          email:"amr@gmail.com",
          confirmemail:"amr@gmail.com",
          firstName:"amr",
          lastName:"ahmed",
          password:"12345678"
        });
      });
    });
  });
  