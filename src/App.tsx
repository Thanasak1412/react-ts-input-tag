import { useState } from "react";

import TagInput from "./components/TagInput";

function App() {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <div className="w-full mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold">Sample Usage for Tag Input</h1>

      <TagInput
        placeholder="Add tags..."
        separator=";"
        maxTags={5}
        onChange={(newTags) => setTags(newTags)}
      />

      <div className="space-y-0.5">
        <h2 className="font-semibold">Current Tags:</h2>
        <ul className="ml-6 list-disc">
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
