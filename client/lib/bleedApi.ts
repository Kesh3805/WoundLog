export interface BleedPost {
  _id: string;
  content: string;
  emotionTags: string[];
  category: string;
  createdAt: string;
  heartCount: number;
  heartedBy: string[];
}

const API_URL = 'http://localhost:4000/bleed';

export async function getBleedPosts(
  filter?: string, 
  sort: string = 'recent', 
  page: number = 1, 
  limit: number = 20,
  category?: string,
  search?: string
): Promise<BleedPost[]> {
  const params = new URLSearchParams();
  if (filter) params.append('emotion', filter);
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  if (sort) params.append('sort', sort);
  const res = await fetch(`${API_URL}?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data = await res.json();
  return data.posts || [];
}

export async function createBleedPost(content: string, emotionTags: string[], token?: string, category?: string): Promise<BleedPost> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  
  const body: any = { content, emotionTags };
  if (category) body.category = category;
  
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Failed to create post');
  return await res.json();
}

export async function heartBleedPost(id: string, token?: string): Promise<BleedPost> {
  console.log('heartBleedPost called with id:', id, 'token:', token ? 'present' : 'missing');
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  console.log('Making request to:', `${API_URL}/${id}/heart`);
  const res = await fetch(`${API_URL}/${id}/heart`, { method: 'POST', headers });
  console.log('Response status:', res.status);
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Heart API error:', errorText);
    throw new Error(errorText);
  }
  const data = await res.json();
  console.log('Heart API success response:', data);
  return data;
}

export async function unheartBleedPost(id: string, token?: string): Promise<BleedPost> {
  console.log('unheartBleedPost called with id:', id, 'token:', token ? 'present' : 'missing');
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  console.log('Making request to:', `${API_URL}/${id}/heart`);
  const res = await fetch(`${API_URL}/${id}/heart`, { method: 'DELETE', headers });
  console.log('Response status:', res.status);
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Unheart API error:', errorText);
    throw new Error(errorText);
  }
  const data = await res.json();
  console.log('Unheart API success response:', data);
  return data;
}

export async function getBleedPrompt(topic?: string): Promise<string> {
  const res = await fetch(`${API_URL}/prompt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic })
  });
  if (!res.ok) throw new Error('Failed to get prompt');
  const data = await res.json();
  return data.prompt || '';
}

export async function getLikedPosts(token: string) {
  const res = await fetch(`${API_URL}/liked`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch liked posts");
  return res.json();
} 