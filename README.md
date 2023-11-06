---

# AI Autocomplete Forms with Language Models

Welcome to our AI-powered Autocomplete Form project. This repository contains a novel UI component that leverages language models 
to provide an autocomplete feature for forms based on natural language input. It's a step towards making form interactions 
smarter and more intuitive.

## How It Works

The project integrates the capabilities of large language models, specifically OpenAI's models, to interpret and convert plain 
text into structured data that pre-fills a form. Here's the process:

1. **Text Input:** The user inputs descriptive text into an interface.
2. **API Call:** The text is sent to a backend service via an API.
3. **Language Model Processing:** The backend service utilizes a language model to parse the text and extract structured data 
according to a predefined schema.
4. **Autocomplete:** The form fields are automatically completed with the structured data, streamlining the form-filling process.

### Technical Stack:

- **Next.js**: For the frontend and API routes.
- **Chakra UI**: For the user interface components.
- **React Hook Form**: For managing form state.
- **Zod**: For schema validation and TypeScript type generation.
- **Langchain**: For interacting with OpenAI models.

### Repository Structure:

- `models/`: Contains Zod schemas for form data validation and typing.
- `components/`: React components including the form and autocomplete container.
- `pages/api/autocomplete/`: The API endpoint for the autocomplete feature.
- `server/`: Backend logic for communicating with OpenAI's API.

## Get Started

To get started with this project, clone the repository, install the dependencies, and follow the instructions to set up your 
environment variables, particularly the API key for OpenAI.

```bash
git clone https://github.com/OdranHUSSON/ai-autocomplete.git
cd ai-autocomplete
npm install
# setup your .env with OPEN_AI_API_KEY
npm run dev
```

## Read More

For an in-depth explanation of the concept, design decisions, and a discussion on the future enhancements planned for this 
project, check out our article on Medium:

🔗 [Enhancing User Experience with Autocomplete Forms and Language 
Models](https://medium.com/@ohusson/enhancing-user-experience-with-autocomplete-forms-and-language-models-ed8e1dc85b47)

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues 
page](https://github.com/OdranHUSSON/ai-autocomplete/issues). Make sure to follow the `CONTRIBUTING.md` guidelines when proposing 
changes.

## Stay Updated

To stay up to date with the latest improvements and updates, watch this repository and keep an eye on the release section.

