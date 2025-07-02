export interface AuthContextType {
  authToken: string | null;
  project: string | null;
  login: (token: string, expires_in: number, project: string) => void;
  logout: () => void;
}
