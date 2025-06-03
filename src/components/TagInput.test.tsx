import { render, screen, fireEvent } from "@testing-library/react";
import TagInput from "./TagInput";

describe("TagInput component", () => {
  test("renders TagInput component", () => {
    render(<TagInput />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("allows users to type in the input", () => {
    render(<TagInput />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(inputElement.value).toBe("test");
  });

  test("adds a tag when pressing Enter", () => {
    const onChangeMock = jest.fn();
    render(<TagInput onChange={onChangeMock} />);

    const inputElement = screen.getByRole("textbox");

    // Simulate add a tag
    fireEvent.change(inputElement, { target: { value: "tag1" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    // check the result
    expect(onChangeMock).toHaveBeenCalledWith(["tag1"]);
  });

  test("doesn't add empty tags", () => {
    const onChangeMock = jest.fn();
    render(<TagInput onChange={onChangeMock} />);

    const inputElement = screen.getByRole("textbox");

    // Add a tag
    fireEvent.keyDown(inputElement, { key: "Enter" });

    // Check the result to can't add empty tag
    const tagInput = screen.queryByTestId("tag-input");

    expect(onChangeMock).not.toHaveBeenCalled();
    expect(tagInput).toBeNull();
  });

  test("removes a tag when the remove button is clicked", () => {
    const onChangeMock = jest.fn();
    render(<TagInput onChange={onChangeMock} />);

    const inputElement = screen.getByRole("textbox");

    // Add a tag
    fireEvent.change(inputElement, { target: { value: "tag1" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    // Remove the tag
    const removeButton = screen.getByText("×");
    fireEvent.click(removeButton);

    expect(onChangeMock).toHaveBeenCalledWith([]);
  });

  test("respects the maxTags limit", () => {
    const onChangeMock = jest.fn();
    render(<TagInput onChange={onChangeMock} maxTags={2} />);

    const inputElement = screen.getByRole("textbox");

    // Add multiple tags
    fireEvent.change(inputElement, { target: { value: "tag1" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    fireEvent.change(inputElement, { target: { value: "tag2" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    fireEvent.change(inputElement, { target: { value: "tag3" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    const tagInputs = screen.queryAllByTestId("tag-input");

    expect(onChangeMock).toHaveBeenCalledWith(["tag1", "tag2"]);
    expect(tagInputs).toHaveLength(2);
  });

  test("adds a tag when typing the separator", () => {
    const onChangeMock = jest.fn();

    render(<TagInput separator=";" onChange={onChangeMock} />);
    const inputElement = screen.getByRole("textbox");

    // add a tag
    fireEvent.change(inputElement, { target: { value: "tag1" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    expect(onChangeMock).toHaveBeenCalledWith(["tag1"]);
  });
});
