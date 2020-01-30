import axios from 'axios';

export default class LikesService {
  constructor() {
    this.service = axios.create({
      baseURL: `http://localhost:5000/likes`,
      withCredentials: true
    });
  }

  updateUserLike = updatedUserObj => {
    return this.service
      .post(`/updateLike`, {updatedUserObj})
      .then(response => response.data);
  };

  removeUserLike = restaurant => {
    return this.service
      .post(`/removeLike`, {restaurant})
      .then(response => response.data);
  };

}