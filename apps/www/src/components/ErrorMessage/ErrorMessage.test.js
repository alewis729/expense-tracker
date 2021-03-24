import React from "react";
import { render } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("should render with a default message", () => {
    const { getByTestId } = render(<ErrorMessage />);
    expect(getByTestId("error-message")).not.toBeEmptyDOMElement();
  });

  it("should render with a given message", () => {
    const message = "Oops, something went wrong...";
    const message2 = "Something unexpected happened!";
    const node = render(<ErrorMessage message={message} />);
    const node2 = render(<ErrorMessage message={message2} />);

    expect(node.getByText(message)).toHaveTextContent(message);
    expect(node2.getByText(message2)).toHaveTextContent(message2);
  });
});
