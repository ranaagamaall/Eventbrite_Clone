import { render, screen, cleanup, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
("@testing-library/jest-dom");
import { MemoryRouter } from "react-router-dom";
import BookingPopup from "./BookingPopup";

afterEach(() => {
  cleanup();
});

describe("should render Booking Modal component", () => {
  it("Success Test", async () => {
    // { eventtitle, date, image }

    const eventtitle = "test event";
    const date = "Apr,18th 2023";
    const image =
      "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F312475989%2F726391040543%2F1%2Foriginal.20220703-131002?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=257b8ab40d4e7ae0ba99ebaac8df2a00";

    render(
      <MemoryRouter>
        <BookingPopup eventtitle={eventtitle} date={date} image={image} />
      </MemoryRouter>
    );

    const gettickets = screen.getByTestId("GetTicketsButton");

    userEvent.click(gettickets);
    
    // const AddTicketBtn = screen.getByTestId("AddTicketBtn");
    // const checkoutBtn =screen.getByTestId("checkoutBtn");
    // userEvent.click(AddTicketBtn);
    // userEvent.click(checkoutBtn);

    // const RegisterBtn = screen.getByTestId('RegisterBtn');
    // const email = screen.getByTestId('EmailInput');
    // const FirstNamefield = screen.getByTestId('FirstNameInput');
    // const SurNamefield = screen.getByTestId('SurNameInput');
    // const EmailCheckbox = screen.getByTestId('EmailCheckbox');
    // userEvent.type(FirstNamefield,"Amr");        
    // userEvent.type(SurNamefield,"Ahmed");
    // userEvent.type(email,"amr@gmail.com");
    // userEvent.click(RegisterBtn);

    await waitFor(() => {
      // expect(screen.getByTestId("checkoutBtn")).toBeInTheDocument();
      expect(screen.getByText("Your Order has been placed successfully!!")).toBeInTheDocument();
    });
  });
});
