import axios, { Method } from 'axios';

export interface ApiConfig {
  host: string;
  method: Method;
  microservice: string;
  endpoint: string;
  authToken: string;
  project: string;
  queryParams?: Record<string, any>;
  body?: any;
}

export async function callApi(config: ApiConfig): Promise<any> {
  const { host, method, microservice, endpoint, authToken, project, queryParams, body } = config;

  const baseUrl = `http://${host}/api/v1/${microservice}/${endpoint}`;

  try {
    const response = await axios({
      method: method,
      url: baseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
        scope: project,
        ...(body && { 'Content-Type': 'application/json' }),
      },
      params: queryParams,
      data: body,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const errorData = error.response.data;
      let detailedMessage = "Échec de l'envoi de la requête.";
      if (Array.isArray(errorData?.messages) && errorData.messages.length > 0) {
        detailedMessage = errorData.messages[0];
      } else if (errorData?.message) {
        detailedMessage = errorData.message;
      }
      throw new Error(`Erreur ${status}: ${detailedMessage}`);
    }
    throw new Error("Échec de l'envoi de la requête (erreur réseau).");
  }
}
