type AuthResult =
  | { ok: true }
  | {
      ok: false;
      response: Response;
    };

const parseBasicAuth = (header: string) => {
  const [scheme, encoded] = header.split(" ");
  if (scheme !== "Basic" || !encoded) return null;

  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const idx = decoded.indexOf(":");
    if (idx < 0) return null;
    return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
  } catch {
    return null;
  }
};

export const requireAdminAuth = (request: Request): AuthResult => {
  const basicUser = import.meta.env.ADMIN_BASIC_USER?.trim() ?? "";
  const basicPass = import.meta.env.ADMIN_BASIC_PASS?.trim() ?? "";

  // If not configured, allow access (dev-friendly).
  if (!basicUser || !basicPass) {
    return { ok: true };
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const creds = parseBasicAuth(authHeader);
  const hasAccess = !!creds && creds.user === basicUser && creds.pass === basicPass;

  if (hasAccess) {
    return { ok: true };
  }

  return {
    ok: false,
    response: new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Colca Domes Admin", charset="UTF-8"',
      },
    }),
  };
};

