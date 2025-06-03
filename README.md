# React TypeScript Tag Input

[![npm version](https://badge.fury.io/js/react-ts-input-tag.svg)](https://badge.fury.io/js/react-ts-input-tag)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5%2B-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%2B-blue)](https://reactjs.org/)

A customizable tag input component built with React, TypeScript, and Tailwind CSS. This component allows users to create, display, and manage tags with various configuration options.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Props](#props)
- [Features in Detail](#features-in-detail)
- [Examples](#examples)
- [Browser Support](#browser-support)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- 🎯 TypeScript support
- 🎨 Tailwind CSS styling
- ⌨️ Keyboard navigation support
- 🔧 Customizable separator
- 📝 Maximum tags limit
- 🧪 Comprehensive test coverage

## Installation

### Requirements

- React 18 or higher
- TypeScript 4.5 or higher
- Tailwind CSS 3 or higher
- Node.js 16 or higher

```bash
npm install
```

## Usage

```tsx
import { TagInput } from 'react-ts-input-tag';

function App() {
  const handleTagChange = (tags: string[]) => {
    console.log('Tags updated:', tags);
  };

  return (
    <TagInput
      onChange={handleTagChange}
      maxTags={5}
      separator=";"
      placeholder="Add tags..."
    />
  );
}
```

## How It Works

The TagInput component provides an intuitive interface for managing tags:
- Type text and press Enter or the separator key (default: comma) to create a new tag
- Click the × button or press Backspace when the input is empty to remove tags
- Tags are displayed in a horizontal list with a clean, minimal design
- The component maintains its own state but reports all changes through the onChange callback

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onChange` | `(tags: string[]) => void` | required | Callback function called when tags are added or removed |
| `maxTags` | `number` | `undefined` | Maximum number of tags allowed |
| `separator` | `string` | `","` | Character that triggers new tag creation |
| `placeholder` | `string` | `"Add tags..."` | Placeholder text for the input field |
| `className` | `string` | `undefined` | Additional CSS classes for the container |

## Features in Detail

### Keyboard Navigation
- Press `Enter` to add a new tag
- Press `Backspace` when input is empty to remove the last tag
- Use the separator character (default: ",") to quickly add multiple tags

### Tag Limits
- Set `maxTags` prop to limit the maximum number of tags
- When the limit is reached, new tags cannot be added
- Visual feedback when attempting to exceed the limit

### Styling
- Built with Tailwind CSS for easy customization
- Responsive design that works on all screen sizes
- Customizable through className prop

## Examples

### Basic Usage
```tsx
<TagInput onChange={(tags) => console.log(tags)} />
```

### With Maximum Tags
```tsx
<TagInput
  onChange={(tags) => console.log(tags)}
  maxTags={3}
  placeholder="Add up to 3 tags..."
/>
```

### Custom Separator
```tsx
<TagInput
  onChange={(tags) => console.log(tags)}
  separator=";"
  placeholder="Use semicolon to separate tags..."
/>
```

### Custom Styling
```tsx
<TagInput
  onChange={(tags) => console.log(tags)}
  className="w-full max-w-md border-blue-500"
/>
```

## Browser Support

The component is compatible with all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

1. Clone the repository:
```bash
git clone https://github.com/Thanasak1412/react-ts-input-tag.git
cd react-ts-input-tag
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Run tests:
```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## Troubleshooting

Common issues and solutions:

### Tags not appearing
Make sure you're handling the onChange callback and managing the tags state correctly in your parent component.

### Styling issues
If the Tailwind CSS styles aren't applying:
1. Ensure Tailwind CSS is properly configured in your project
2. Check that the className prop is being passed correctly
3. Verify your bundler is processing the component's CSS

### TypeScript errors
If you encounter type errors:
1. Ensure you have @types/react installed
2. Check that your tsconfig.json includes the necessary compiler options
3. Verify you're using the correct prop types as documented

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### Version 1.0.0
- Initial release
- Basic tag input functionality
- Tailwind CSS styling
- TypeScript support
- Comprehensive test coverage

## License

MIT License - feel free to use this component in your projects.

## Acknowledgments

- Built with React + TypeScript
- Styled with Tailwind CSS
- Tested with Jest and React Testing Library
