import axios from 'axios';

const API_AUTH = 'http://localhost:8085/api/auth';

interface AuthRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  username: string;
  token: string;
  tokenExpiresIn: string;
}

class AuthPacienteService {
  private token: string | null = null;

  async login(authData: AuthRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(API_AUTH, authData);
      this.token = response.data.token;
      localStorage.setItem('authToken', this.token);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao tentar autenticar o usuário');
    }
  }

  getAuthToken(): string | null {
    return this.token || localStorage.getItem('authToken');
  }

  getAuthHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.getAuthToken()}`
      }
    };
  }
}

export default new AuthPacienteService();