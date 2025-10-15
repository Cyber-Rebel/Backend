import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
/// Tansport bata hae ki clinet aur mcp server kaisae baat karenga

// stdioclient transport use karte hae jab server and client same machine pae ho
// agar alag machine pae ho to http transport use karenge

const transport = new StdioClientTransport({  // kese communicate karenga
  command: "node", // command to run the server
  args: ["mcp.server.js"] 
});

const client = new Client(// client create kar rahe hae // ese me server ka name and version dena hota hae
  {
    name: "cyber-ai-client",
    version: "1.0.0"
  }
);

await client.connect(transport); // connect kar rahe hae

client.listTools().then(tools => {
  console.log("Available tools:", tools);
});
