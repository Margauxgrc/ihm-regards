import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RequestPage from '../RequestPage';
import { AuthProvider } from '../../contexts/AuthProvider';
import { HistoryProvider } from '../../contexts/HistoryProvider';
import { RespProvider } from '../../contexts/RespProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DisplayResponsePage from '../RespPage';
import { callApi } from '../../services/RequestService';
import React from 'react';
vi.mock('../../services/RequestService');

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    authToken: 'un-faux-token-pour-le-test',
    project: 'un-faux-projet',
  }),
}));

const TestAppWrapper = () => {
  return (
    <AuthProvider>
      <RespProvider>
        <HistoryProvider>
          <MemoryRouter initialEntries={['/home']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/home" element={<RequestPage />} />
              <Route path="/response" element={<DisplayResponsePage />} />
            </Routes>
          </MemoryRouter>
        </HistoryProvider>
      </RespProvider>
    </AuthProvider>
  );
};

describe('Page de Requête', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('doit remplir le formulaire, soumettre la requête et naviguer vers la page de réponse', async () => {
    const apiResponse = { message: 'Données récupérées avec succès' };
    vi.mocked(callApi).mockResolvedValue(apiResponse);

    render(<RequestPage />, { wrapper: TestAppWrapper });

    fireEvent.change(screen.getByLabelText(/Microservice/i), {
      target: { value: 'rs-test-service' },
    });
    fireEvent.change(screen.getByLabelText(/Endpoint/i), {
      target: { value: 'test/endpoint' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Envoyer/i }));

    await waitFor(() => {
      expect(callApi).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          microservice: 'rs-test-service',
          endpoint: 'test/endpoint',
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Réponse reçue')).toBeInTheDocument();
    });
  });

  it("doit afficher une erreur si l'API renvoie une erreur", async () => {
    const apiError = new Error('Erreur 404: Not Found');
    vi.mocked(callApi).mockRejectedValue(apiError);

    render(<TestAppWrapper />);

    fireEvent.change(screen.getByLabelText(/Microservice/i), { target: { value: 'service' } });
    fireEvent.change(screen.getByLabelText(/Endpoint/i), { target: { value: 'endpoint-qui-marche-pas' } });
    fireEvent.click(screen.getByRole('button', { name: /Envoyer/i }));

    await waitFor(() => {
      expect(screen.getByText('Erreur 404: Not Found')).toBeInTheDocument();
    });
  });

  it('doit afficher une erreur si le JSON saisi est invalide', async () => {
    render(<TestAppWrapper />);

    fireEvent.mouseDown(screen.getByLabelText('Méthode'));
    fireEvent.click(screen.getByRole('option', { name: 'POST' }));

    const payloadEditor = screen.getByPlaceholderText(/Saisir les paramètres ou le corps de la requête en JSON/i);
    fireEvent.change(payloadEditor, { target: { value: 'ceci est invalide' } });

    fireEvent.change(screen.getByLabelText(/Microservice/i), { target: { value: 'service' } });
    fireEvent.change(screen.getByLabelText(/Endpoint/i), { target: { value: 'endpoint' } });

    fireEvent.click(screen.getByRole('button', { name: /Envoyer/i }));

    await waitFor(() => {
      expect(screen.getByText('JSON non valide')).toBeInTheDocument();
    });

    expect(callApi).not.toHaveBeenCalled();
  });
});
