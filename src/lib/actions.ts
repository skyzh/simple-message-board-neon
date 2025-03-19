'use client';

import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_AUTHENTICATED_URL!;
const databaseUrlAnonymous = process.env.NEXT_PUBLIC_DATABASE_ANONYMOUS_URL!;

function connectToDatabase(token: string | undefined) {
  if (token) {
    return neon(databaseUrl, { authToken: token });
  } else {
    return neon(databaseUrlAnonymous);
  }
}

export async function getMessages(token: string | undefined) {
  const sql = connectToDatabase(token);
  const messages = await sql`
    SELECT * FROM messages 
    ORDER BY created_at DESC
  `;
  return messages;
}

export async function createMessage(content: string, authorId: string, authorName: string, authorImageUrl: string | undefined, token: string | undefined) {
  const sql = connectToDatabase(token);
  await sql`
    INSERT INTO messages (content, author_id, author_name, author_image_url)
    VALUES (${content}, ${authorId}, ${authorName}, ${authorImageUrl})
  `;
}

export async function deleteMessage(id: number, authorId: string, token: string | undefined) {
  const sql = connectToDatabase(token);
  await sql`
    DELETE FROM messages 
    WHERE id = ${id} AND author_id = ${authorId}
  `;
} 