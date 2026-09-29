import { Property } from '../types';

const TOKEN_STORAGE_KEY = 'easyhouse_admin_jwt_token';
const USER_STORAGE_KEY = 'easyhouse_admin_user';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  twoFactorVerified?: boolean;
}

export interface AuthLoginResponse {
  success: boolean;
  token?: string;
  user?: AdminUser;
  error?: string;
  locked?: boolean;
  remainingSecs?: number;
  attemptsLeft?: number;
  requires2FA?: boolean;
  tempToken?: string;
  message?: string;
  demoOtpHint?: string;
}

export interface SecurityStatus {
  score: number;
  twoFactorEnabled: boolean;
  twoFactorSecret: string;
  currentOtpPreview: string;
  hstsActive: boolean;
  cspActive: boolean;
  rateLimitActive: boolean;
  bruteForceProtection: boolean;
  tokenExpiresIn: string;
  activeSessionsCount: number;
  recentEventsCount: number;
  lastPasswordUpdate: string;
  encryption: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  ip: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED' | 'BLOCKED';
  details: string;
}

// Token Helpers
export function getAdminToken(): string | null {
  return sessionStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setAdminSession(token: string, user: AdminUser, remember = false): void {
  if (remember) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }
}

export function clearAdminSession(): void {
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
}

export function getStoredAdminUser(): AdminUser | null {
  const raw = sessionStorage.getItem(USER_STORAGE_KEY) || localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

// Headers Helper
function getAuthHeaders(): HeadersInit {
  const token = getAdminToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// ==========================================
// AUTHENTICATION CLIENT CALLS
// ==========================================

export async function loginAdmin(email: string, password: string, remember = false): Promise<AuthLoginResponse> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok && data.token && data.user) {
      setAdminSession(data.token, data.user, remember);
      return { success: true, token: data.token, user: data.user, message: data.message };
    }

    if (res.ok && data.requires2FA) {
      return {
        success: true,
        requires2FA: true,
        tempToken: data.tempToken,
        message: data.message,
        demoOtpHint: data.demoOtpHint,
      };
    }

    return {
      success: false,
      error: data.error || 'Authentication failed.',
      locked: data.locked,
      remainingSecs: data.remainingSecs,
      attemptsLeft: data.attemptsLeft,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return {
      success: false,
      error: `Could not reach security server (${message}).`,
    };
  }
}

export async function verify2FA(
  tempToken: string,
  otpCode: string,
  remember = false
): Promise<AuthLoginResponse> {
  try {
    const res = await fetch('/api/auth/verify-2fa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tempToken, otpCode }),
    });

    const data = await res.json();
    if (res.ok && data.token && data.user) {
      setAdminSession(data.token, data.user, remember);
      return { success: true, token: data.token, user: data.user, message: data.message };
    }

    return {
      success: false,
      error: data.error || 'Invalid 2FA verification code.',
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return {
      success: false,
      error: `Could not complete 2FA verification (${message}).`,
    };
  }
}

export async function verifyAdminSession(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;

  try {
    const res = await fetch('/api/auth/verify', {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.valid) return true;
    }
    clearAdminSession();
    return false;
  } catch {
    return Boolean(token);
  }
}

export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      return { success: true, message: data.message || 'Password changed successfully.' };
    }
    return { success: false, error: data.error || 'Failed to update password.' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: `Server error: ${message}` };
  }
}

// ==========================================
// SECURITY SUITE CLIENT CALLS
// ==========================================

export async function fetchSecurityStatus(): Promise<SecurityStatus | null> {
  try {
    const res = await fetch('/api/admin/security-status', {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      return (await res.json()) as SecurityStatus;
    }
    return null;
  } catch {
    return null;
  }
}

export async function toggle2FA(
  enable: boolean,
  password: string
): Promise<{ success: boolean; twoFactorEnabled?: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch('/api/admin/2fa/toggle', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ enable, password }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      return { success: true, twoFactorEnabled: data.twoFactorEnabled, message: data.message };
    }
    return { success: false, error: data.error || 'Failed to update 2FA configuration.' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: `Security server error: ${message}` };
  }
}

export async function fetchAuditLogs(): Promise<AuditLogEntry[]> {
  try {
    const res = await fetch('/api/admin/audit-logs', {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      const data = await res.json();
      return (data.logs || []) as AuditLogEntry[];
    }
    return [];
  } catch {
    return [];
  }
}

export async function revokeAllSessions(): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch('/api/admin/sessions/revoke-all', {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      return { success: true, message: data.message };
    }
    return { success: false, error: data.error || 'Failed to revoke sessions.' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: `Error: ${message}` };
  }
}

// ==========================================
// PROPERTIES CLIENT CALLS (FULL-STACK SYNC)
// ==========================================

export async function fetchServerProperties(): Promise<Property[] | null> {
  // 1. Try Express API endpoint
  try {
    const res = await fetch('/api/properties');
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (data && Array.isArray(data.properties)) {
          return data.properties;
        }
        if (Array.isArray(data)) {
          return data;
        }
      }
    }
  } catch {}

  // 2. Fallback to static /properties.json (for Netlify, static hosting, or direct access)
  try {
    const res = await fetch('/properties.json');
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data)) {
          return data;
        }
        if (data && Array.isArray(data.properties)) {
          return data.properties;
        }
      }
    }
  } catch {}

  return null;
}

export async function createServerProperty(property: Property): Promise<{ success: boolean; property?: Property; error?: string }> {
  try {
    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(property),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      return { success: true, property: data.property };
    }
    return { success: false, error: data.error || 'Failed to add property.' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: `Failed to connect: ${message}` };
  }
}

export async function updateServerProperty(property: Property): Promise<{ success: boolean; property?: Property; error?: string }> {
  try {
    const res = await fetch(`/api/properties/${property.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(property),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      return { success: true, property: data.property };
    }
    return { success: false, error: data.error || 'Failed to update property.' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: `Failed to connect: ${message}` };
  }
}

export async function deleteServerProperty(propertyId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/properties/${propertyId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      return { success: true };
    }
    return { success: false, error: data.error || 'Failed to delete property.' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: `Failed to connect: ${message}` };
  }
}

export async function resetServerProperties(): Promise<{ success: boolean; properties?: Property[]; error?: string }> {
  try {
    const res = await fetch('/api/properties/reset', {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      return { success: true, properties: data.properties };
    }
    return { success: false, error: data.error || 'Failed to reset properties.' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: `Failed to connect: ${message}` };
  }
}
