import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { IResponseData, IResponseErr } from '../services/CommonTypes';

function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

interface IImgUploaderProps  {
    value?:string;
    onChange:(newVal:any)=>void
}

export default class PicturesWall extends React.Component<IImgUploaderProps> {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file:any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = (p:any) => {
      if(p.file.status === 'done'){
        this.props.onChange(p.file.response.data);
        this.setState({
          fileList:p.fileList
        })
      }
  }

  async handleRequest(p:any){
    let formData = new FormData();
    formData.append(p.filename,p.file)
    
    const request = new Request(p.action,{
      method:'post',
      body:formData,
    });

    const resp:IResponseData<string> | IResponseErr = await fetch(request).then(res=>res.json());
    if(resp.err){
      //上传失败
      message.error('上传失败!')
    }else{
      this.props.onChange(resp.data)
    }
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/api/upload"
          name='imgFile'
          listType="picture-card"
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

