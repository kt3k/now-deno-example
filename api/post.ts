import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from "https://deno.land/x/lambda/mod.ts";
import * as base64 from "https://deno.land/x/base64/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";

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
  const body = JSON.parse(event.body)
  const json = new TextDecoder().decode(base64.toUint8Array(body.body));
  const req = JSON.parse(json)
  if (!req || !req.user || !req.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'bad request' }),
      headers: {
        'content-type': 'application/json'
      }
    }
  }
  const client = await connection
  const result = await client.query(
    "INSERT INTO posts (name, body) values ($1, $2);",
    req.user,
    req.body
  )
  return { statusCode: 200, body: '' };
}
