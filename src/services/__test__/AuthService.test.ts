import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { generateToken } from '../AuthService';

vi.mock('axios');

describe('AuthService', () => {
  it('doit retourner un token en cas de succès', async () => {
    const mockResponse = {
      data: {
        access_token: 'fake_token_123',
        expires_in: 3600,
      },
    };
    vi.mocked(axios.post).mockResolvedValue(mockResponse);

    const result = await generateToken('user', 'pass', 'project');

    expect(result.token).toBe('fake_token_123');
    expect(result.expires_in).toBe(3600);
  });

  it("doit lancer une erreur en cas d'échec", async () => {
    vi.mocked(axios.post).mockRejectedValue(new Error('Erreur réseau'));

    await expect(generateToken('user', 'pass', 'project')).rejects.toThrow('Échec de la connexion');
  });
});
