import domain from '../../config/domain';
import axios from 'axios';

let auth = false;
const token = localStorage.getItem('token').substr(1).substring(0, localStorage.getItem('token').length -1);
if (localStorage.getItem('token') === null) {
  fetch(domain + '/wp-json/jwt-auth/v1/token',{
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
    body:JSON.stringify({
      username: 'admin',
      password: 'Ym1OU0Ukp6NQ'
    })
  }).then(function(response){
    return response.json();
  }).then(function(user){
    localStorage.setItem('token', JSON.stringify(user.token));
    auth = true;
  }).catch(e=>{
    console.log(e);
    auth = false;
  });
}else {
  axios.get(domain + '/wp-json/jwt-auth/v1',{
    headers: {
      'Authorization': 'Bearer '+token
    }
  })
      .then(resp =>  {
        return resp.status
      } )
      .catch(() => auth = false)
}

console.log('status',auth);
export default auth;