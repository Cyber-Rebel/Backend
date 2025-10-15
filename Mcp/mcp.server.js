import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// Trnasport bata hae ki clinet aur server kaisae baat karenga
// use many types
// use karne ke ham mce.client ka use karenge

import { z } from "zod"; // zod kuch sirf types ke validation ke liye use hota hae
//zop sirf types defind karne kam ata hae 
// Create an MCP server
const server = new McpServer({
  name: "cyber-ai", // name of server 
  version: "1.0.0"
});

// Add an addition tool

server.registerTool("add", // add ek tool ka naam hae tool ek hoat hae fucnation 
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() } // input schema define karta hae kya apko pass karn ahae 
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// Add a dynamic greeting resource
server.registerResource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  { 
    title: "Greeting Resource",      // Display name for UI
    description: "Dynamic greeting generator"
  },
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
    // let a 
    // a:z.string() // yeh ek string hae




    // 3 mcp  types of server hote hae 
// 1 stdio local machine pae use karte hae
// 2 streamble http   jab client and server alag machine pae ho to use karte hae
// 3 older sse  