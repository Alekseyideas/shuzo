import axios from 'axios';
import domain from '../../config/domain';

export const getSlides = () => {
  return axios.get( domain + '/wp-json/wp/v2/slides' )
      .then(resp => resp.data)
      .catch(e => e)
}