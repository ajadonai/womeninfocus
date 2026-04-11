import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

// Lazy client creation — avoids crash when env vars aren't set
let _client: SanityClient | null = null;
let _previewClient: SanityClient | null = null;
let _noCdnClient: SanityClient | null = null;

function getBaseClient(): SanityClient {
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }
  return _client;
}

function getNoCdnClient(): SanityClient {
  if (!_noCdnClient) {
    _noCdnClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    });
  }
  return _noCdnClient;
}

function getPreviewBaseClient(): SanityClient {
  if (!_previewClient) {
    _previewClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
    });
  }
  return _previewClient;
}

export function getClient(preview = false): SanityClient {
  return preview ? getPreviewBaseClient() : getBaseClient();
}

/** Bypass CDN for data that needs to be fresh (forum posts, comments, hearts) */
export function getFreshClient(): SanityClient {
  return getNoCdnClient();
}

// Re-export for convenience
export const client = {
  get instance() { return getBaseClient(); },
};

// Image URL builder
export function urlFor(source: Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0]) {
  return imageUrlBuilder(getBaseClient()).image(source);
}
