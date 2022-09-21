import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30056344-f5b1c1bc910d7c008a7198f8f';

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImg() {
    try {
      const searchParams = new URLSearchParams({
        key: API_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: this.page,
      });
      const response = await axios.get(`${BASE_URL}?${searchParams}`);
      this.incrementPage();

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
