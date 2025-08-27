# UI Component Generator

A web application built with Next.js and Tailwind CSS that leverages the power of IBM Granite's AI model to generate UI component code from natural language prompts.

## Features

- **Prompt-to-Code Generation:** Users can type a description of a UI component (e.g., "create a login form") and the AI generates the corresponding code.
- **Full-Stack Application:** The project includes a Next.js frontend and an API route backend to handle the communication with the AI model.
- **AI Integration:** Utilizes the IBM Granite model hosted on the Replicate platform for its generative capabilities.
- **Clean UI:** Styled with Tailwind CSS for a modern and responsive user interface.

## Technologies Used

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **AI Model:** IBM Granite (via Replicate API)
- **Frontend:** React.js
- **Backend:** Node.js

## How to Run Locally

1.  Clone the repository:
    `git clone https://github.com/arthayoshua/granite-ui-generator.git`
2.  Install dependencies:
    `npm install`
3.  Set up your Replicate API token in a `.env.local` file:
    `REPLICATE_API_TOKEN=your-token-here`
4.  Run the development server:
    `npm run dev`
