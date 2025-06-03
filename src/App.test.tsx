import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders App component with heading", () => {
    render(<App />);
    const headingElement = screen.getByText(/Sample Usage for Tag Input/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("renders TagInput component", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add tags.../i);
    expect(inputElement).toBeInTheDocument();
  });

  test("allows adding tags and displays them in the list", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add tags.../i);

    // Add a tag
    fireEvent.change(inputElement, { target: { value: "tag1" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    // Check if the tag is displayed in the list
    const tagElements = screen.getAllByRole("listitem");
    expect(tagElements).toHaveLength(1);
  });

  test("don't allows adding duplicate tags", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add tags.../i);

    // Add multiple tags with duplicate values
    fireEvent.change(inputElement, { target: { value: "tag1" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    fireEvent.change(inputElement, { target: { value: "tag1" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    // Check if the tag doesn't duplicate
    const tagElements = screen.getAllByRole("listitem");
    expect(tagElements).toHaveLength(1);
  });

  test("allows adding tags by on blur", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add tags.../i);

    // Add a tag
    fireEvent.change(inputElement, { target: { value: "tag1" } });
    fireEvent.blur(inputElement);

    // Check if the tag is displayed in the list
    const tagElements = screen.getAllByRole("listitem");
    expect(tagElements).toHaveLength(1);
  });

  test("allows adding tags by typing separator with semi-colon", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add tags.../i);

    // Add a tag
    fireEvent.change(inputElement, { target: { value: "tag1" } });
    fireEvent.keyDown(inputElement, { key: ";" });

    // Check if the tag is displayed in the list
    const tagElements = screen.getAllByRole("listitem");
    expect(tagElements).toHaveLength(1);
  });

  test("respects the maxTags limit", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add tags.../i);

    // Add multiple tags
    fireEvent.change(inputElement, { target: { value: "tag1" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    fireEvent.change(inputElement, { target: { value: "tag2" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    fireEvent.change(inputElement, { target: { value: "tag3" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    fireEvent.change(inputElement, { target: { value: "tag4" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    fireEvent.change(inputElement, { target: { value: "tag5" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    fireEvent.change(inputElement, { target: { value: "tag6" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    // Check that only 5 tags are displayed
    const tagElements = screen.getAllByRole("listitem");
    expect(tagElements).toHaveLength(5);
  });
});
