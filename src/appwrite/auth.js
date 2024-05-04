import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (user) {
        // call login method
        return this.login({ email, password });
      } else {
        return user;
      }
    } catch (e) {
      throw e;
    }
  }

  async login({ email, password }) {
    try {
      return this.account.createEmailPasswordSession(email, password);
    } catch (e) {
      throw e;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (e) {
      throw e;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (e) {
      throw e;
    }
  }
}

const authService = new AuthService();
// export default AuthService
export default authService;
