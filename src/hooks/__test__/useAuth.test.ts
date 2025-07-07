import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAuth } from '../useAuth';
import { AuthProvider } from '../../contexts/AuthProvider';

describe('useAuth Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('doit fournir un état initial sans authentification', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    expect(result.current.authToken).toBe(null);
    expect(result.current.project).toBe(null);
  });

  it('doit mettre à jour le token et le projet après un login', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.login('mon_nouveau_token', 3600, 'mon_projet');
    });

    expect(result.current.authToken).toBe('mon_nouveau_token');
    expect(result.current.project).toBe('mon_projet');
    expect(localStorage.getItem('authToken')).toBe('mon_nouveau_token');
    expect(localStorage.getItem('project')).toBe('mon_projet');
  });

  it('doit supprimer le token et le projet après un logout', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.login('token_a_effacer', 3600, 'projet_a_effacer');
    });

    expect(result.current.authToken).not.toBe(null);

    act(() => {
      result.current.logout();
    });

    expect(result.current.authToken).toBe(null);
    expect(result.current.project).toBe(null);
    expect(localStorage.getItem('authToken')).toBe(null);
    expect(localStorage.getItem('project')).toBe(null);
  });
});
