import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRequestForm } from '../useRequestForm';

vi.mock('../useResp', () => ({
  useResp: () => ({ setResponse: vi.fn() }),
}));
vi.mock('../useAuth', () => ({
  useAuth: () => ({ authToken: 'fake_token', project: 'fake_project' }),
}));
vi.mock('../useHistory', () => ({
  useHistory: () => ({
    addHistoryEntry: vi.fn(),
    selectedEntry: null,
    setSelectedEntry: vi.fn(),
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

vi.mock('../../services/RequestService', () => ({
  callApi: vi.fn(),
}));

describe('useRequestForm hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('doit passer isLoading à true puis revenir à false', async () => {
    const { callApi } = await import('../../services/RequestService');

    let resolvePromise;
    const promise = new Promise((resolve) => {
      resolvePromise = () => resolve({ success: true });
    });
    vi.mocked(callApi).mockReturnValue(promise);

    const { result } = renderHook(() => useRequestForm());

    act(() => {
      result.current.onSubmit();
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolvePromise();
      await promise;
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('doit définir un message d"erreur si le JSON est invalide', async () => {
    const { result } = renderHook(() => useRequestForm());

    act(() => {
      result.current.onPayloadChange('ceci n"est pas du json');
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(result.current.error).toBe('JSON non valide');

    expect(result.current.isLoading).toBe(false);
  });
});
