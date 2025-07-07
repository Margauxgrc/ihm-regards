import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLoginForm } from '../useLoginForm';
import { generateToken } from '../../services/AuthService';
import { useAuth } from '../useAuth';

vi.mock('../../services/AuthService');
vi.mock('../useAuth');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('useLoginForm Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('doit appeler la fonction login avec le token si succès', async () => {
    const mockLogin = vi.fn();
    vi.mocked(useAuth).mockReturnValue({
      authToken: null,
      project: '',
      login: mockLogin,
      logout: vi.fn(),
    });

    const mockTokenData = { token: 'un_super_token', expires_in: 3600 };
    vi.mocked(generateToken).mockResolvedValue(mockTokenData);

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.onSubmit({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(mockLogin).toHaveBeenCalledWith('un_super_token', 3600, result.current.project);
  });

  it("doit définir un message d'erreur si la connexion échoue", async () => {
    const mockLogin = vi.fn();
    vi.mocked(useAuth).mockReturnValue({
      authToken: null,
      project: '',
      login: mockLogin,
      logout: vi.fn(),
    });
    vi.mocked(generateToken).mockRejectedValue(new Error('Erreur'));

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.onSubmit({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(result.current.error).toBe('Identifiants incorrects. Veuillez réessayer.');
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('doit rediriger si un token existe déjà au chargement', () => {
    vi.mocked(useAuth).mockReturnValue({
      authToken: 'un_token_existant',
      project: 'un_projet',
      login: vi.fn(),
      logout: vi.fn(),
    });

    renderHook(() => useLoginForm());

    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });
});
