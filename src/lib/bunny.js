import crypto from "crypto";

const PULL_ZONE_HOSTNAME = process.env.BUNNY_PULL_ZONE_HOSTNAME;
const SECURITY_KEY = process.env.BUNNY_TOKEN_AUTH_KEY;

const DEFAULT_EXPIRATION = 60 * 60; // 1 hour

if (!PULL_ZONE_HOSTNAME) {
  throw new Error("Missing BUNNY_PULL_ZONE_HOSTNAME");
}

if (!SECURITY_KEY) {
  throw new Error("Missing BUNNY_TOKEN_AUTH_KEY");
}

/**
 * Bunny official URL signing implementation.
 * Based on Bunny's official Node.js Token Authentication.
 */
function signUrl(
  url,
  securityKey,
  expirationTime = DEFAULT_EXPIRATION,
  userIp = "",
  isDirectory = false,
  pathAllowed = "",
  countriesAllowed = "",
  countriesBlocked = "",
  ignoreParams = false,
  expiresAt = null,
  speedLimit = 0
) {
  const parsed = new URL(url);

  const queryParams = {};

  for (const [key, value] of parsed.searchParams) {
    queryParams[key] = value;
  }

  if (countriesAllowed) {
    queryParams.token_countries = countriesAllowed;
  }

  if (countriesBlocked) {
    queryParams.token_countries_blocked = countriesBlocked;
  }

  if (speedLimit > 0) {
    queryParams.limit = String(speedLimit);
  }

  const expires =
    expiresAt ??
    Math.floor(Date.now() / 1000) + expirationTime;

  let parameters;

  if (ignoreParams) {
    parameters = {
      token_ignore_params: "true",
    };
  } else {
    parameters = {
      ...queryParams,
    };
  }

  if (pathAllowed) {
    parameters.token_path = pathAllowed;
  }

  const sortedEntries = Object.entries(parameters).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  const signaturePath = pathAllowed || parsed.pathname;

  const signingData = sortedEntries
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  const urlData = sortedEntries
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");

  const message = `${signaturePath}${expires}${signingData}${userIp}`;

  const digest = crypto
    .createHmac("sha256", securityKey)
    .update(message)
    .digest();

  const token =
    "HS256-" +
    digest
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  const base = `${parsed.protocol}//${parsed.host}`;

  const tail = urlData ? `&${urlData}` : "";

  if (isDirectory) {
    return `${base}/bcdn_token=${token}${tail}&expires=${expires}${parsed.pathname}`;
  }

  return `${base}${parsed.pathname}?token=${token}${tail}&expires=${expires}`;
}

/**
 * Returns a signed HLS playlist URL.
 */
export function getSignedStreamUrl(videoId) {
  const playlistUrl = `https://${PULL_ZONE_HOSTNAME}/${videoId}/playlist.m3u8`;

  return signUrl(
    playlistUrl,
    SECURITY_KEY,

    DEFAULT_EXPIRATION,

    "",

    true,

    `/${videoId}/`
  );
}

/**
 * Returns unsigned playlist.
 * Useful during development.
 */
export function getPublicStreamUrl(videoId) {
  return `https://${PULL_ZONE_HOSTNAME}/${videoId}/playlist.m3u8`;
}

/**
 * Returns iframe embed URL.
 * Mostly for admin preview.
 */
export function getEmbedUrl(videoId, libraryId) {
  return `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}`;
}