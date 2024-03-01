import { AuthService } from "../services/auth.service";

export default class AuthController {

  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  getToken(email: string, password: string): Promise<any> {
    return this.authService.getToken(email, password);
  }

}