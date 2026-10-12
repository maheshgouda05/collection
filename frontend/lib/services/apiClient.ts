export const AUTH_STORAGE_KEY = 'collection_it_all_auth_session_v2';

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.token || parsed?.user?.token || null;
  } catch {
    return null;
  }
}

export function getAuthHeaders(extra?: HeadersInit): HeadersInit {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (extra) {
    return { ...headers, ...extra };
  }
  return headers;
}

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<{ data?: T; error?: string; ok: boolean; status: number }> {
  try {
    const headers = getAuthHeaders(options?.headers);
    const res = await fetch(url, {
      ...options,
      headers,
    });
    const contentType = res.headers.get('content-type') || '';
    let body: unknown = null;
    if (contentType.includes('application/json')) {
      body = await res.json();
    } else {
      body = await res.text();
    }

    if (!res.ok) {
      let errorMessage = 'Request failed';
      if (typeof body === 'string') {
        errorMessage = body;
      } else if (body && typeof body === 'object' && 'error' in body) {
        errorMessage = String((body as { error: unknown }).error);
      }
      return {
        ok: false,
        status: res.status,
        error: errorMessage,
        data: body as T,
      };
    }

    return {
      ok: true,
      status: res.status,
      data: body as T,
    };
  } catch (err: unknown) {
    return {
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : 'Network connection failed',
    };
  }
}
