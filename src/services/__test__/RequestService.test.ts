import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { callApi, ApiConfig } from '../RequestService';

vi.mock('axios');

describe('RequestService - callApi', () => {
  const baseConfig: Omit<ApiConfig, 'method'> = {
    host: 'test-host',
    microservice: 'test-service',
    endpoint: 'test-endpoint',
    authToken: 'fake_token',
    project: 'test-project',
  };

  it('doit construire et exécuter une requête GET correctement', async () => {
    const mockData = { result: 'success' };
    vi.mocked(axios).mockResolvedValue({ data: mockData });

    const getConfig: ApiConfig = {
      ...baseConfig,
      method: 'GET',
      queryParams: { param1: 'value1' },
    };

    const result = await callApi(getConfig);

    expect(result).toEqual(mockData);
    expect(axios).toHaveBeenCalledWith({
      method: 'GET',
      url: `http://test-host/api/v1/test-service/test-endpoint`,
      headers: {
        Authorization: `Bearer fake_token`,
        scope: 'test-project',
      },
      params: { param1: 'value1' },
      data: undefined,
    });
  });

  it('doit construire et exécuter une requête POST correctement', async () => {
    const mockData = { id: 123, status: 'created' };
    vi.mocked(axios).mockResolvedValue({ data: mockData });

    const postConfig: ApiConfig = {
      ...baseConfig,
      method: 'POST',
      body: { name: 'nouveau_test' },
    };

    const result = await callApi(postConfig);

    expect(result).toEqual(mockData);
    expect(axios).toHaveBeenCalledWith({
      method: 'POST',
      url: `http://test-host/api/v1/test-service/test-endpoint`,
      headers: {
        Authorization: `Bearer fake_token`,
        scope: 'test-project',
        'Content-Type': 'application/json',
      },
      params: undefined,
      data: { name: 'nouveau_test' },
    });
  });

  it("doit lancer une erreur en cas d'échec de l'API", async () => {
    vi.mocked(axios).mockRejectedValue(new Error('Erreur réseau'));

    const config: ApiConfig = {
      ...baseConfig,
      method: 'GET',
    };

    await expect(callApi(config)).rejects.toThrow("Échec de l'envoi de la requête (erreur réseau).");
  });
});
