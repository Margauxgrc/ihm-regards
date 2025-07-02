import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLoginForm } from '../useLoginForm';
import { generateToken } from '../../services/AuthService';

vi.mock('../../services/AuthService', () => ({
  generateToken: vi.fn(),
}));
const mockLogin = vi.fn();
vi.mock('../useAuth', () => ({
  useAuth: () => ({
    authToken: null,
    login: mockLogin,
  }),
}));
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe('useLoginForm hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('doit appeler la fonction login avec le token si succès', async () => {
    const mockTokenData = { token: 'un_super_token', expires_in: 3600 };
    vi.mocked(generateToken).mockResolvedValue(mockTokenData);

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.onSubmit({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(mockLogin).toHaveBeenCalledWith('un_super_token', 3600, result.current.project);
    expect(result.current.error).toBe('');
  });

  it("doit définir un message d'erreur si la connexion échoue", async () => {
    vi.mocked(generateToken).mockRejectedValue(new Error('Erreur'));

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.onSubmit({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(result.current.error).toBe('Identifiants incorrects. Veuillez réessayer.');

    expect(mockLogin).not.toHaveBeenCalled();
  });
});
