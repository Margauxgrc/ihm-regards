import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider } from '../../contexts/AuthProvider';
import { HistoryProvider } from '../../contexts/HistoryProvider';
import { RespProvider } from '../../contexts/RespProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../LoginPage';
import RequestPage from '../RequestPage';
import { generateToken } from '../../services/AuthService';
import React from 'react';

vi.mock('../../services/AuthService');

const TestAppWrapper = () => {
  return (
    <AuthProvider>
      <RespProvider>
        <HistoryProvider>
          <MemoryRouter initialEntries={['/login']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<RequestPage />} />
            </Routes>
          </MemoryRouter>
        </HistoryProvider>
      </RespProvider>
    </AuthProvider>
  );
};

describe('Page de Connexion', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('doit permettre à un utilisateur de se connecter et le rediriger vers la page d"accueil', async () => {
    const mockTokenData = { token: 'un-vrai-token', expires_in: 3600 };
    vi.mocked(generateToken).mockResolvedValue(mockTokenData);

    render(<LoginPage />, { wrapper: TestAppWrapper });

    fireEvent.change(screen.getByLabelText(/Utilisateur ou e-mail/i), { target: { value: 'bon@user.com' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'bon_mot_de_passe' } });
    fireEvent.change(screen.getByLabelText(/Projet/i), { target: { value: 'bon_projet' } });
    fireEvent.click(screen.getByRole('button', { name: /Connexion/i }));

    await waitFor(() => {
      expect(screen.getByText('Envoyer une requête à REGARDS')).toBeInTheDocument();
    });
  });

  it("doit afficher un message d'erreur si la connexion échoue", async () => {
    vi.mocked(generateToken).mockRejectedValue(new Error('Identifiants invalides'));

    render(<LoginPage />, { wrapper: TestAppWrapper });

    fireEvent.change(screen.getByLabelText(/Utilisateur ou e-mail/i), { target: { value: 'mauvais@user.com' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'mauvais_mot_de_passe' } });
    fireEvent.change(screen.getByLabelText(/Projet/i), { target: { value: 'mauvais_projet' } });
    fireEvent.click(screen.getByRole('button', { name: /Connexion/i }));

    await waitFor(() => {
      expect(screen.getByText(/Identifiants incorrects/i)).toBeInTheDocument();
    });
  });
});
