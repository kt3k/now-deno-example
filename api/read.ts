import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from "https://deno.land/x/lambda/mod.ts";
import { Client } from "https://raw.githubusercontent.com/kt3k/deno-postgres/master/mod.ts";

async function connect() {
  const client = new Client();
  await client.connect();
  return client
}

const connection = connect()

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const client = await connection
  const result = await client.query("SELECT * FROM posts LIMIT 16;")
  return {
    statusCode: 200,
    body: JSON.stringify(result.rows),
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  };
}
