import { Button, Checkbox, Form, Input, InputNumber, Switch } from 'antd'
import React, { Component } from 'react'
import ImgUploader from '../components/ImgUploader';
import { IMovie } from '../services/MovieService';

const areasOptions: { label: string, value: string }[] = [
  { label: '中国大陆', value: "中国大陆" },
  { label: '美国', value: "美国" },
  { label: '中国台湾', value: "中国台湾" },
  { label: '泰国', value: "泰国" },
]
const CheckboxGroup = Checkbox.Group;

const typesOptions: { label: string, value: string }[] = [
  { label: '冒险', value: "冒险" },
  { label: '爱情', value: "爱情" },
  { label: '戏剧', value: "戏剧" },
  { label: '文艺', value: "文艺" },
]

interface IAddMovie {
  AddMovie:(movie:IMovie)=>void
  movie?:any
}
export default class MovieForm extends Component<IAddMovie> {
  private handleSubmit(values: IMovie) {
    this.props.AddMovie(values)
  }
  state = {
    value: ""
  }
  
  render() {
    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 6 }}
        initialValues={this.props.movie}
        onFinish={this.handleSubmit.bind(this)}
      >
        <Form.Item
          label="电影名"
          name="name"
          rules={[{ required: true, message: '电影名不能为空' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="封面图"
          name="poster"
          valuePropName='value'
        >
          <ImgUploader value={this.state.value} onChange={(value) => {
            this.setState({
              value: `upload/${value}`
            })
          }} />
        </Form.Item>

        <Form.Item
          label="上映地区"
          name="areas"
          rules={[{ required: true, message: '上映地区不能为空' }]}

        >
          <CheckboxGroup options={areasOptions} />
        </Form.Item>

        <Form.Item
          label="类型"
          name="types"
          rules={[{ required: true, message: '电影类型不能为空' }]}

        >
          <CheckboxGroup options={typesOptions} />
        </Form.Item>

        <Form.Item
          label="时长"
          name="timeLong"
          rules={[{ required: true, message: '时长不能为空' }]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item
          label="是否热映"
          initialValue={false}
          name="isHot"
          valuePropName='checked'
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="是否经典"
          name="isClassic"
          initialValue={false}
          valuePropName='checked'
        >
          <Switch  />

        </Form.Item>

        <Form.Item
          label="是否上映"
          valuePropName='checked'
          initialValue={false}
          name="isComing"
        >
          <Switch />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
