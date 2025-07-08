import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RespPage from '../RespPage';
import { AuthProvider } from '../../contexts/AuthProvider';
import { HistoryProvider } from '../../contexts/HistoryProvider';
import { RespProvider } from '../../contexts/RespProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useResp } from '../../hooks/useResp';
import RequestPage from '../RequestPage';

vi.mock('../../hooks/useResp');

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({ logout: vi.fn() }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}));

const TestAppWrapper = () => {
  return (
    <AuthProvider>
      <RespProvider>
        <HistoryProvider>
          <MemoryRouter
            initialEntries={['/test-host/response']}
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <Routes>
              <Route path="/:host/home" element={<RequestPage />} />
              <Route path="/:host/response" element={<RespPage />} />
            </Routes>
          </MemoryRouter>
        </HistoryProvider>
      </RespProvider>
    </AuthProvider>
  );
};

describe('Page de Réponse', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('doit afficher le visualiseur JSON si une réponse existe', () => {
    const fakeResponse = { id: 1, message: 'Ceci est un test' };

    vi.mocked(useResp).mockReturnValue({
      response: fakeResponse,
      setResponse: vi.fn(),
    });

    render(<RespPage />, { wrapper: TestAppWrapper });

    expect(screen.getByText('Réponse reçue')).toBeInTheDocument();
    expect(screen.getByText('message')).toBeInTheDocument();
    expect(screen.getByText(/Ceci est un test/i)).toBeInTheDocument();
  });

  it("doit afficher le message 'aucun contenu' si la réponse est vide", () => {
    vi.mocked(useResp).mockReturnValue({
      response: undefined,
      setResponse: vi.fn(),
    });

    render(<RespPage />, { wrapper: TestAppWrapper });

    expect(screen.getByText('Requête réussie, aucun contenu à afficher')).toBeInTheDocument();
  });

  it('doit naviguer vers /home quand on clique sur le bouton de retour', () => {
    vi.mocked(useResp).mockReturnValue({
      response: { data: 'une réponse' },
      setResponse: vi.fn(),
    });

    render(<RespPage />, { wrapper: TestAppWrapper });

    fireEvent.click(screen.getByRole('button', { name: /Envoyer une nouvelle requête/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/test-host/home');
  });
});
