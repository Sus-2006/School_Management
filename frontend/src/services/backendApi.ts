import { auth } from '../firebase';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api').replace(/\/$/, '');

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}, authenticated = false): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (init.body) headers.set('Content-Type', 'application/json');

  if (authenticated) {
    const user = auth.currentUser;
    if (!user) throw new ApiError('Please sign in before making this request.', 401);
    headers.set('Authorization', `Bearer ${await user.getIdToken()}`);
  }

  const response = await fetch(`${apiBaseUrl}${path}`, { ...init, headers });
  const body = await response.json().catch(() => undefined) as { data?: T; message?: string } | undefined;
  if (!response.ok) throw new ApiError(body?.message || `Request failed (${response.status})`, response.status);
  return body?.data as T;
}

export type ApiStudent = { id: string; name: string; admissionNo: string; classId: string; sectionId: string; rollNo?: number | null; dob?: string | null; gender?: string | null; bloodGroup?: string | null };
export type ApiClass = { id: string; name: string; grade: number };
export type ApiSection = { id: string; name: string; classId: string };
export type ApiParent = { id: string; fatherName: string; motherName: string; phone: string; email?: string | null; address?: string | null };
export type ApiNotice = { id: string; title: string; content: string; audience: string; date?: string | null; createdAt?: string };

export const backendApi = {
  getStudents: () => request<ApiStudent[]>('/students', {}, true),
  getClasses: () => request<ApiClass[]>('/classes'),
  getSections: () => request<ApiSection[]>('/sections'),
  getParents: () => request<ApiParent[]>('/parents'),
  createParent: (data: Omit<ApiParent, 'id'>) => request<ApiParent>('/parents', { method: 'POST', body: JSON.stringify(data) }, true),
  createStudent: (data: { admissionNo: string; name: string; classId: string; sectionId: string; parentId: string; dob?: string; gender?: 'MALE' | 'FEMALE' | 'OTHER'; bloodGroup?: string }) => request<ApiStudent>('/students', { method: 'POST', body: JSON.stringify(data) }, true),
  getNotices: () => request<ApiNotice[]>('/notices'),
  createNotice: (data: { title: string; content: string; audience: string; date?: string }) => request<ApiNotice>('/notices', { method: 'POST', body: JSON.stringify(data) }, true),
};
