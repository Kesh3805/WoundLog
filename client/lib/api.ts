export async function register(email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data.token;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data.token;
}

export async function getEntries(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/entries`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch entries');
  return res.json();
}

export async function createEntry(token: string, entry: { title?: string; content: string; emotionTags?: string[]; isEncrypted?: boolean; encryptedData?: string; }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error('Failed to create entry');
  return res.json();
}

export async function updateEntry(token: string, id: string, entry: { title?: string; content: string; emotionTags?: string[]; isEncrypted?: boolean; encryptedData?: string; }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/entries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error('Failed to update entry');
  return res.json();
}

export async function deleteEntry(token: string, id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/entries/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete entry');
  return res.json();
}

// Bleed Wall API
export async function getBleedPosts(page = 1, limit = 20) {
  const res = await fetch(`/api/bleed?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function createBleedPost(content: string, emotionTags?: string[], token?: string) {
  const res = await fetch('/api/bleed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ content, emotionTags }),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

export async function heartBleedPost(id: string, token?: string) {
  const res = await fetch(`/api/bleed/${id}/heart`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error('Failed to heart post');
  return res.json();
}

export async function reportBleedPost(id: string, reason = '', token?: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/bleed/${id}/report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ reason }),
  });
  if (!res.ok) throw new Error('Failed to report post');
  return res.json();
}

export async function getTopBleedPosts(limit = 5) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/bleed/top?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch top posts');
  return res.json();
}

/**
 * Calls the Gemini 1.5 Flash API with a prompt and returns the AI's response.
 * @param prompt The prompt or message to send to Gemini
 * @returns The AI's response as a string
 */
export async function getGeminiResponse(prompt: string): Promise<string> {
  const apiKey = "AIzaSyC7BIWiHpdQJpN5lawSXb4fC3CNv_rJDDA";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error("Failed to get Gemini response");
  const data = await res.json();
  // Gemini returns response in data.candidates[0].content.parts[0].text
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "(No response)"
  );
} 