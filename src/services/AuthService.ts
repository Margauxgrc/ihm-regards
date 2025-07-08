import axios from 'axios';

export async function generateToken(host: string, username: string, password: string, project: string) {
  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('username', username);
  body.append('password', password);

  const API_URL = `http://${host}/api/v1/rs-authentication/oauth/token?scope=${project}`;

  try {
    const response = await axios.post(API_URL, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Accept: 'application/json',
        Authorization: 'Basic Y2xpZW50OnNlY3JldA==',
      },
    });

    return {
      token: response.data.access_token,
      expires_in: response.data.expires_in,
    };
  } catch (error) {
    throw new Error('Échec de la connexion');
  }
}
