import { getByDisplayValue, render, screen } from "@testing-library/react";
import Footer from "./Footer";
import FooterData from "../../assets/data/FooterData";

test("diabled options in footer", () => {
  render(<Footer />);
  for (let index = 0; index < FooterData.countriesData.length; index++) {
    const element = screen.getByTestId(FooterData.countriesData[index]);
    expect(element).toBeDisabled();
    expect(element.selected).toBeFalsy();
  }

  const element = screen.getByTestId('Egypt');
  expect(element).toBeEnabled();
  expect(element.selected).toBeTruthy();
  
});
