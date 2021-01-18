import axios from 'axios';

export default class MediaService {
  // singleton service class

  static instance;

  constructor() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = this;
  }

  static login(email, password) {
    const formData = { email, password };
    const url = `${process.env.VUE_APP_MEDIASERVER_URL}/auth/login/`;
    return axios.post(url, formData);
  }

  static verify() {
    const url = `${process.env.VUE_APP_MEDIASERVER_URL}/auth/verify/`;
    return axios.post(url);
  }

  static delete(item) {
    const formData = {
      path: decodeURI(item.path),
      action: 'delete',
    };
    const mtype = item.type === 'image' ? 'image' : 'movie';
    const url = `${process.env.VUE_APP_MEDIASERVER_URL}/media/${mtype}/`;
    return axios.post(url, formData);
  }
}
