import axios from 'axios';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

let accessToken: string | undefined;

export async function getToken() {
  if (accessToken) {
    return { access_token: accessToken };
  }

  const data = {
    client_id: process.env.RMT_AUTH_CLIENT_ID,
    client_secret: process.env.RMT_AUTH_CLIENT_SECRET,
  };

  const {
    data: { access_token },
  } = await axios
    .post<TokenResponse>(process.env.RMT_AUTH_URL || '', data)
    .catch((err) => {
      throw new Error(err);
    });

  accessToken = access_token;
  return { access_token };
}
