import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./Select";

const options = [
  { value: "lennon", label: "Jhon Lennon" },
  { value: "mccartney", label: "Paul Mccartney" },
  { value: "mercury", label: "Freddie Mrecury" },
];

describe("Select", () => {
  it("should render with label", () => {
    const label = "Hello world";
    const { getByLabelText } = render(<Select label={label} />);
    expect(getByLabelText(label)).toBeInTheDocument();
  });

  it("should map all the options as MenuItems", () => {
    const { getAllByRole } = render(<Select open options={options} />);
    expect(getAllByRole("option")).toHaveLength(options.length);
  });

  it("should return the selected option", () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(
      <Select open onChange={handleChange} options={options} />
    );

    userEvent.click(getAllByRole("option")[1]);
    expect(handleChange).toHaveBeenCalledWith(options[1]);
  });
});
