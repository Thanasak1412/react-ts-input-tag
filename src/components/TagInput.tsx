import {
  useRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from "react";

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "placeholder" | "onChange"
> & {
  placeholder?: string;
  separator?: string;
  maxTags?: number;
  onChange?: (tags: string[]) => void;
};

export default function TagInput({
  placeholder = "Enter tags...",
  separator = ",",
  maxTags,
  onChange,
  ...props
}: Readonly<Props>) {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTags = (value: string) => {
    const newTags = value
      .split(separator)
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "" && !tags.includes(tag));

    if (newTags.length === 0) {
      return;
    }

    const combinedTags = [...tags, ...newTags];
    const limitedTags = maxTags ? combinedTags.slice(0, maxTags) : combinedTags;

    setTags(limitedTags);
    setInput("");
    onChange?.(limitedTags);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === separator) {
      event.preventDefault();
      addTags(input);
    }
  };

  const handleBlur = () => {
    if (input) {
      addTags(input);
    }
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);

    setTags(updatedTags);
    onChange?.(updatedTags);

    // Focus back to input
    inputRef?.current?.focus();
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border rounded min-h-11">
      {tags.map((tag, index) => (
        <div
          className="flex items-center gap-1 px-2 py-1 space-x-2 bg-gray-100 border rounded"
          key={index}
        >
          <span className="text-black" data-testid="tag-input">
            {tag}
          </span>
          <button
            type="button"
            className="text-2xl text-red-500 focus:outline-none"
            onClick={() => removeTag(index)}
          >
            &times;
          </button>
        </div>
      ))}

      <input
        ref={inputRef}
        value={input}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="flex-1 p-1 outline-none min-w-32"
        {...props}
      />
    </div>
  );
}
