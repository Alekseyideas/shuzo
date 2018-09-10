import { call, put } from 'redux-saga/effects';
import * as actionType from '../actionTypes';
import domain from '../../config/domain';
import axios from 'axios';
import {token} from '../../config/token';

function fnGetSlides() {
  return axios.get( domain + '/wp-json/wp/v2/slides' )
      .then(resp => {
        return resp.data;
      })
      .catch(e => e)
}

export function* sagaGetSlides() {
  try {
    const slides = yield call(fnGetSlides);
    yield put({ type: actionType.GET_SLIDES_SUCCESS, slides })
  } catch (e) {
    yield put({ type: actionType.GET_SLIDES_ERROR, e })
  }
}

function deleteSlide(id) {
  axios(domain + '/wp-json/wp/v2/slides/'+id,{
    method: "DELETE",
    headers:{
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': 'Bearer '+token
    }
  });
  return id;
}

export function* sagaDeleteSlide(action) {
  try {
    const id = yield call(deleteSlide, action.id);
    yield put({ type: actionType.DELETE_SLIDE_SUCCESS, id })
  } catch (e) {
    console.log(e)
  }
}

function creatSLide(img, imgId, title, text, updateImage) {
  if (updateImage){
    return axios('http://localhost/wp-json/wp/v2/media',{
      method: "POST",
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="${img.name}"`,
        'accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },

      data: img,
    }).then(data =>{
      return creatSLideText(title, text, data.data.id);
    }).catch(e => console.log(e))
  } else {
    return creatSLideText(title, text, imgId);
  }

}

function creatSLideText(title, text, imgId) {
  return axios(domain+'/wp-json/wp/v2/slides',{
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': 'Bearer '+token
    },
    data: {
      title: title,
      content: text, status: 'publish',
      featured_media: imgId,
    }
  }).then((data) => {
    return data;
  });

}

export function* sagaCreatSLide(action) {
  try {
    const slide = yield call(creatSLide,
        action.img,
        action.imgId,
        action.title,
        action.text,
        action.updateImage
    );
    yield put({ type: actionType.CREATE_SLIDE_SUCCESS, slide })
  } catch (e) {
    console.log(e)
  }
}

function editSlide(id, img, imgId, title, text, updateImage) {
  if (updateImage){
    return axios('http://localhost/wp-json/wp/v2/media',{
      method: "POST",
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="${img.name}"`,
        'accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },

      data: img,
    }).then(data =>{
      return editSlideText(id, title, text, data.data.id);
    }).catch(e => console.log(e))
  } else {
    return editSlideText(id, title, text, imgId);
  }
}

function editSlideText(id, title, text, imgId) {
  return axios(domain+'/wp-json/wp/v2/slides/'+id,{
    method: "PUT",
    headers:{
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': 'Bearer '+token
    },
    data: {
      title: title,
      content: text,
      featured_media: imgId,
    }
  }).then((data) => {
    return data;
  });

}

export function* sagaEditSlide(action) {
  const slide = yield call(editSlide,
      action.id,
      action.img,
      action.imgId,
      action.title,
      action.text,
      action.updateImage
  );
  yield put({ type: actionType.EDIT_SLIDE_SUCCESS, slide })
}
