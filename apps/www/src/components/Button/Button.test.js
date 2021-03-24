import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("should render with children", () => {
    const children = "Click me";
    const { getByRole } = render(<Button>{children}</Button>);
    expect(getByRole("button")).toHaveTextContent(children);
  });

  it("should be disabled if forced from props", () => {
    const { getByRole } = render(<Button disabled>Click me</Button>);
    expect(getByRole("button")).toBeDisabled();
  });

  it("should be disabled if pending", () => {
    const { getByRole } = render(<Button pending>Click me</Button>);
    expect(getByRole("button")).toBeDisabled();
  });

  it("should display a pending state if pending", () => {
    const { getByTestId } = render(<Button pending>Click me</Button>);
    expect(getByTestId("progress")).not.toBeEmptyDOMElement();
  });

  it("should not display a pending state if not pending", () => {
    const { getByTestId } = render(<Button pending={false}>Click me</Button>);
    expect(getByTestId("progress")).toBeEmptyDOMElement();
  });
});
