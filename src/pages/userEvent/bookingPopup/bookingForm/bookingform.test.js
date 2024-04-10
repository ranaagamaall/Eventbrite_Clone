import { MemoryRouter } from "react-router-dom";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";"@testing-library/jest-dom";
import BookingForm from "./BookingForm";

afterEach(() => {
    cleanup();
  });

  describe("Should render Booking form",() =>
  {
    it('Failure Test (Not Valid Email))', async()=>
    {
        const handleSubmit = jest.fn();
      render(
        <MemoryRouter>
          <BookingForm onSubmit={handleSubmit}/>
        </MemoryRouter>
        );

        const RegisterBtn = screen.getByTestId('RegisterBtn');
        const email = screen.getByTestId('EmailInput');
        const FirstNamefield = screen.getByTestId('FirstNameInput');
        const SurNamefield = screen.getByTestId('SurNameInput');
        userEvent.type(FirstNamefield,"Amr");
        userEvent.type(FirstNamefield,"Ahmed");
        userEvent.type(email,"amr");
        userEvent.click(RegisterBtn);
        await waitFor(() => {
            expect(screen.getByText("Please Enter a Valid Email")).toBeInTheDocument();
          });

    });

    it('Failure Test (No First Name is entered)', async()=>
    {
        const handleSubmit = jest.fn();
      render(
        <MemoryRouter>
          <BookingForm onSubmit={handleSubmit}/>
        </MemoryRouter>
        );

        const RegisterBtn = screen.getByTestId('RegisterBtn');
        const email = screen.getByTestId('EmailInput');
        const FirstNamefield = screen.getByTestId('FirstNameInput');
        const SurNamefield = screen.getByTestId('SurNameInput');
        userEvent.type(SurNamefield,"Ahmed");
        userEvent.type(email,"amr@gmail.com");
        userEvent.click(RegisterBtn);
        await waitFor(() => {
            expect(screen.getByText("First Name is required.")).toBeInTheDocument();
          });

    });

    it('Failure Test (No Surname is entered)', async()=>
    {
        const handleSubmit = jest.fn();
      render(
        <MemoryRouter>
          <BookingForm onSubmit={handleSubmit}/>
        </MemoryRouter>
        );

        const RegisterBtn = screen.getByTestId('RegisterBtn');
        const email = screen.getByTestId('EmailInput');
        const FirstNamefield = screen.getByTestId('FirstNameInput');
        const SurNamefield = screen.getByTestId('SurNameInput');
        userEvent.type(FirstNamefield,"Amr");
        userEvent.type(email,"amr@gmail.com");
        userEvent.click(RegisterBtn);
        await waitFor(() => {
            expect(screen.getByText("Surname is required.")).toBeInTheDocument();
          });

    });
    // it('Success Test', async()=>
    // {
    //     const handleSubmit = jest.fn();
    //   render(
    //     <MemoryRouter>
    //       <BookingForm onSubmit={handleSubmit}/>
    //     </MemoryRouter>
    //     );

    //     const RegisterBtn = screen.getByTestId('RegisterBtn');
    //     const email = screen.getByTestId('EmailInput');
    //     const FirstNamefield = screen.getByTestId('FirstNameInput');
    //     const SurNamefield = screen.getByTestId('SurNameInput');
    //     const EmailCheckbox = screen.getByTestId('EmailCheckbox');
    //     userEvent.type(FirstNamefield,"Amr");        
    //     userEvent.type(SurNamefield,"Ahmed");
    //     userEvent.type(email,"amr@gmail.com");
    //     userEvent.click(RegisterBtn);

    //     await waitFor(() => {
    //         expect(screen.getByText("Your Order has been placed successfully!!")).toBeInTheDocument();
    //       });
    // });


  }
  )