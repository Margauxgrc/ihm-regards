import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRequestForm } from '../useRequestForm';
import { callApi } from '../../services/RequestService';

const mockSetResponse = vi.fn();
const mockAddHistoryEntry = vi.fn();
const mockSetSelectedEntry = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../useResp', () => ({
  useResp: () => ({ setResponse: mockSetResponse }),
}));
vi.mock('../useAuth', () => ({
  useAuth: () => ({ authToken: 'fake_token', project: 'fake_project' }),
}));
vi.mock('../useHistory', () => ({
  useHistory: () => ({
    addHistoryEntry: mockAddHistoryEntry,
    selectedEntry: null,
    setSelectedEntry: mockSetSelectedEntry,
  }),
}));
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));
vi.mock('../../services/RequestService', () => ({
  callApi: vi.fn(),
}));

describe('useRequestForm hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('doit passer isLoading à true puis revenir à false', async () => {
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
    expect(callApi).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  it("doit appeler les bonnes fonctions en cas de succès de l'API", async () => {
    const apiResponse = { data: 'succès' };
    vi.mocked(callApi).mockResolvedValue(apiResponse);
    const { result } = renderHook(() => useRequestForm());

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(mockAddHistoryEntry).toHaveBeenCalled();
    expect(mockSetResponse).toHaveBeenCalledWith(apiResponse);
    expect(mockNavigate).toHaveBeenCalledWith('/response');
  });

  it("doit mettre à jour l'état d'erreur si l'API échoue", async () => {
    const apiError = new Error('Erreur API 500');
    vi.mocked(callApi).mockRejectedValue(apiError);
    const { result } = renderHook(() => useRequestForm());

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(result.current.error).toBe('Erreur API 500');
  });
});
