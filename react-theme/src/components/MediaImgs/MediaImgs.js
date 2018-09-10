import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actionTypes';
import './MediaImgs.css'

class MediaImgs extends Component {
  componentDidMount(){
    this.props.getMedia();
  }
  render() {
    const { loading, imgs, error } = this.props;
    let imgsTemplate = () => null;
    if(!loading && !error){
      if(imgs.length > 0) {
        imgsTemplate = () => {
          return imgs.map((img) => {
            return (
                <div className='media-image' onClick={() => this.props.getId(img.id)} key={img.id} style={{ backgroundImage: `url(${img.guid.rendered})` }} />
            )
          })
        }
      }else {
        return <h2>No images uploaded</h2>
      }
    }


    return (
        <div className='flex f-wrap'>
          { imgsTemplate() }
        </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    imgs: state.getMedia.imgs,
    loading: state.getMedia.loading,
    error: state.getMedia.error,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    getMedia: ()=>dispatch({ type: actionType.GET_MEDIA_LOADING })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaImgs);
