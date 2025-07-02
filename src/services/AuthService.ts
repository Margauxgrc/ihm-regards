import axios from 'axios';
import { HTTP_HOST } from '../constants';

export async function generateToken(username: string, password: string, project: string) {
  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('username', username);
  body.append('password', password);

  const API_URL = HTTP_HOST + `/api/v1/rs-authentication/oauth/token?scope=${project}`;

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
    console.error('Échec de la connexion :', error.response?.data || error.message);
    throw new Error('Échec de la connexion');
  }
}
