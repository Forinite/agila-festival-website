// lib/tokenStore.ts
const tokenStore = new Map<string, { email: string; expiresAt: number }>();

export function storeToken(token: string, email: string, ttl = 15 * 60 * 1000) {
    tokenStore.set(token, { email, expiresAt: Date.now() + ttl });
}

export function verifyToken(token: string): string | null {
    const record = tokenStore.get(token);
    if (!record || record.expiresAt < Date.now()) {
        tokenStore.delete(token);
        return null;
    }
    return record.email;
}

export function deleteToken(token: string) {
    tokenStore.delete(token);
}
