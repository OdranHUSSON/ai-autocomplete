// app/server/parse.ts
import dotenv from 'dotenv';
dotenv.config();
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';

export async function convertTextToJson(content: string, schema)  {
  const model = getModel();
  const parser = getParser(schema);      
  const formatInstructions = parser.getFormatInstructions();
  const promptTemplate = getPromptTemplate(formatInstructions);
  const prompt = await promptTemplate.format({
    inputText: content,  
  });
  const rawResponse = await model.call(prompt);
  const jsonResponse = await parseResponse(rawResponse, parser);

  return jsonResponse;
}

function getModel() {
  return new OpenAI({
    temperature: 0,  
    model: "gpt-3.5-turbo-0613",    
    maxTokens: 2000,    
    reset: true,
    openAIApiKey: process.env.OPEN_AI_API_KEY
  });
}

function getParser(schema) {
  return StructuredOutputParser.fromZodSchema(
    schema
  );
}

function getPromptTemplate(formatInstructions) {
  return new PromptTemplate({
    template: "Extract information as it is from text.\n{format_instructions}\nPlease output the extracted information in JSON codeblock format. Do not output anything except for the extracted information. Do not add any clarifying information. Do not add any fields that are not in the schema. \n Raw Content: {inputText} ",
    inputVariables: ["inputText"],
    partialVariables: { format_instructions: formatInstructions },
  });
}

async function parseResponse(rawResponse, parser) {
  const regex = /```json\s+([\s\S]+?)\s+```/;
  const match = rawResponse.match(regex);

  if (match && match[1]) {
    const jsonString = match[1];
    return parser.parse(jsonString);
  }

  return rawResponse;
}