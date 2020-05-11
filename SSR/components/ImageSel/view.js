import React, { Component } from 'react';
import { Modal } from 'antd';
import "./index.css"
const imglist = [
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'测试大的撒多撒多撒多撒多所多多',
        uid:'13'
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'测试',
        uid:'13'
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'测试',
        uid:'13'
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'测试',
        uid:'13'
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'测试',
        uid:'13'
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'测试',
        uid:'13'
    }
]
class ImageSel extends Component {
    constructor(props){
        super(props)
        this.state={
            visible:props.visible,
            selectObj:null
        }
    }
    selectedImg(e){
        var p = document.getElementsByClassName('imgbox')
        var p_node = e.target.parentNode
        for(let i = 0;i<p.length;i++){
            p[i].style.borderColor="#eee"
        }
        p_node.style.borderColor="blue";
        let selindex= parseInt(p_node.getAttribute('ikey'))
        this.setState({
            selectObj:imglist[selindex]
        })
    }
    handleOk(){
        this.props.onOk(this.state.selectObj)
    }
    handleCancel(){
        this.props.onhandleCancel();
    }
    generateList(imglist){
       return imglist.map((item,index)=>{
            return (
                <div className="content-box" key={index}>
                    <div className="imgbox" onClick={this.selectedImg.bind(this)} ikey={index} >
                        <img src={item.url} alt="轮播"></img>

                    </div>
                    <p className="imgname">{item.name}</p>
                </div>
            )
        })
    }
    render() {
        // const {imglist} = this.props
        return (
            <Modal
          title="Basic Modal"
          visible={this.props.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
            <div className="imglist">
                {this.generateList(imglist)}
            </div>

        </Modal>
        );
    }
}

export default ImageSel;