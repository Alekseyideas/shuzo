export const token = localStorage.getItem('token') ? localStorage.getItem('token').substr(1).substring(0, localStorage.getItem('token').length -2) : null;
