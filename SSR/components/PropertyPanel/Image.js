import React from "react";
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
import {UploadImage,PicturesWall} from '../UploadImage/view'

class ImagePanel extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {

    return (
        <div>
            <p>选择图片</p>
            <UploadImage></UploadImage>
        </div>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ImagePanel);