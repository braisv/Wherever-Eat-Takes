import axios from "axios";

export default class RestaurantsService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/restaurants`,
      withCredentials: true
    });
  }

  // search = (query) => {
  //   return this.service.get(`/search?query=${query}`, { query })
  //     .then(response => response.data)
  // }

  getAll = () => {
    return this.service.get(`/restaurants`).then(response => response.data);
  };

  getOne = id => {
    return this.service
      .get(`/restaurant/${id}`)
      .then(response => response.data);
  };

  newRestaurant = (
    name,
    neighborhood,
    photograph,
    location,
    image,
    cuisine_type,
    timetable,
    reviews
  ) => {
    return this.service
      .post(`/new`, {
        name,
        neighborhood,
        photograph,
        location,
        image,
        cuisine_type,
        timetable,
        reviews
      })
      .then(response => response.data);
  };

  removeRestaurant = restaurant => {
    return this.service
      .post(`/remove`, { restaurant })
      .then(response => response.data);
  };

  editRestaurant = (
    id,
    name,
    neighborhood,
    photograph,
    location,
    image,
    cuisine_type,
    timetable,
    reviews
  ) => {
    return this.service
      .post(`/edit/${id}`, {
        name,
        neighborhood,
        photograph,
        location,
        image,
        cuisine_type,
        timetable,
        reviews
      })
      .then(response => response.data);
  };
}
