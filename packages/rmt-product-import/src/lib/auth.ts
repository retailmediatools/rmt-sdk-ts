import axios, { AxiosError } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
}

let token: TokenResponse;

export async function getToken() {
  if (token && token.expires_at > Date.now()) {
    return token.access_token;
  }

  // Obtain RMT auth token and configure RMT client
  const data = {
    client_id: process.env.RMT_AUTH_CLIENT_ID,
    client_secret: process.env.RMT_AUTH_CLIENT_SECRET,
  };

  console.log('Fetching a new token...');

  const tokenResponse = await axios
    .post<TokenResponse>(process.env.RMT_AUTH_URL, data)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      console.error('Failed to fetch token:', err.response?.data);
      throw new Error(err.message);
    });

  token = {
    ...tokenResponse,
    expires_at: Date.now() + tokenResponse.expires_in,
  };

  console.log('The new token fetched and cached.');

  return token.access_token;
}
