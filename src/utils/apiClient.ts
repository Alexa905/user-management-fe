import axios, {AxiosStatic} from 'axios';
import {User} from '../types';
import {SortOptions} from '../enums/sortOptions.enum';

const URL = process.env.REACT_APP_API_BASE;

class ApiClient {
  private client;

  constructor(axios: AxiosStatic) {
    this.client = axios;
  }

  async getUsers({limit = 100, page = 1}) {
    try {
      const response = await this.client.get(
        `${URL}/users?limit=${limit}&page=${page}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async generateUserList({
                           role = '',
                           speaker = '',
                           sort = SortOptions.RANDOM,
                         }) {
    let queries = `sort=${sort}`;
    if (speaker) queries += `&speaker=${speaker}`;
    if (role) queries += `&role=${role}`;
    try {
      const response = await this.client.get(
        `${URL}/users/generate-list?${queries}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getUser(id: number) {
    try {
      const response = await this.client.get(`${URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(user: User) {
    if(!user.lastName) user.lastName = user.firstName;
    const response = await this.client.post(`${URL}/users`, user);
    return response.data;
  }

  async updateUser(id: number, user: User) {
    try {
      const response = await this.client.put(`${URL}/users/${id}`, user);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getTeams() {
    try {
      const response = await this.client.get(`${URL}/teams`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

const apiClient = new ApiClient(axios);

export default apiClient;
