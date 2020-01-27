import axios from 'axios';

export default class RestaurantsService {
  constructor() {
    this.service = axios.create({
      baseURL: `http://localhost:5000/restaurants`,
      withCredentials: true
    });
  }

  search = (query) => {
    return this.service.get(`/search?query=${query}`, { query })
      .then(response => response.data)
  }

  getAll = () => {
    return this.service.get(`/restaurants`)
      .then(response => response.data)
  }


}