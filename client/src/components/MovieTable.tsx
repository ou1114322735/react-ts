import { Button, Input, Popconfirm, Space, Switch, Table } from 'antd';
import { ColumnProps, TablePaginationConfig } from 'antd/lib/table';
import React, { Component } from 'react'
import { SearchOutlined } from "@ant-design/icons"
import { IMovieState } from '../redux/reducers/movieReducer'
import { IMovie } from '../services/MovieService';
import defaultAvatar from "../assets/avatar.jpg"
import "./MovieTable.css"
import { SwitchType } from '../services/CommonTypes';
import { Link } from 'react-router-dom';
export interface IMovieTableEvents {
  onLoad: () => void;
  onSwitchChange: (type: SwitchType, newState: boolean, id: string) => void;
  onDelete: (id: string) => void;
  onChange: (newPage: number) => void
  onInpChange: (key: string) => void
  onEnterDown: () => void
}

export default class MovieTable extends Component<IMovieState & IMovieTableEvents> {
  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

  private getColumns(): ColumnProps<IMovie>[] {
    return [
      {
        title: '封面',
        dataIndex: 'poster',
        render: (poster: string) => {
          return poster ? <img className='avartar' src={poster} alt="avartar" /> : <img className='avartar' src={defaultAvatar} alt='defaultAvatar' />
        }
      },
      {
        title: '姓名',
        dataIndex: 'name',
        filterIcon: <SearchOutlined />,
        filterDropdown: (conf) => {
          return (
            <div style={{ padding: 8 }}>
              <Input
                style={{ marginBottom: 8, display: 'block' }}
                value={this.props.condition.key}
                onChange={(e) => this.props.onInpChange(e.target.value)}
                onPressEnter={this.props.onEnterDown}
              />
              <Space>
                <Button
                  type="primary"
                  size="small"
                  style={{ width: 90 }}
                  onClick={this.props.onEnterDown}
                >
                  搜索
                </Button>
                <Button size="small" style={{ width: 90 }}
                  onClick={() => {
                    this.props.onInpChange("");
                    this.props.onEnterDown()
                  }}
                >
                  重置
                </Button>
              </Space>
            </div>
          )
        },
      },
      {
        title: '上映地区',
        dataIndex: 'areas',
        render: (text: string[]) => {
          return text.join(', ')
        }
      },
      {
        title: '类型',
        dataIndex: 'types',
        render: (text: string[]) => {
          return text.join(', ')
        }
      },
      {
        title: '时长',
        dataIndex: 'timeLong',
        render: (text: number) => {
          return text + '分钟'
        }
      },
      {
        title: '是否热映',
        dataIndex: 'isHot',
        render: (text: boolean, record) => {
          return <Switch checked={text} onChange={(value) => {
            this.props.onSwitchChange(SwitchType.isHot, value, record._id!);
          }} />
        }
      },
      {
        title: '是否经典',
        dataIndex: 'isClassic',
        render: (text: boolean, record) => {
          return <Switch checked={text} onChange={(value) => {
            this.props.onSwitchChange(SwitchType.isClassic, value, record._id!);
          }} />
        }
      },
      {
        title: '即将上映',
        dataIndex: 'isComing',
        render: (text: boolean, record) => {
          return <Switch checked={text} onChange={(value) => {
            this.props.onSwitchChange(SwitchType.isComing, value, record._id!);
          }} />
        }
      },
      {
        title: '操作',
        dataIndex: '_id',
        render: (id: string) => {
          return (
            <div>
              <Link to={'/edit/' + id}>
                <Button type='primary'>编辑</Button>
              </Link>
              <Popconfirm
                title="确定要删除吗?"
                onConfirm={() => {
                  this.props.onDelete(id);
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button type="default">删除</Button>
              </Popconfirm>
            </div>
          )
        }
      }
    ]
  };

  private getPageConfig(): false | TablePaginationConfig {
    if (this.props.data.length === 0) {
      return false;
    }
    return {
      current: this.props.condition.page,
      pageSize: this.props.condition.limit,
      total: this.props.total
    }
  };
  private handleChange(condition: TablePaginationConfig) {
    if (condition.current) {
      this.props.onChange(condition.current);
    }
  }
  render() {
    return (
      <Table rowKey='_id' pagination={this.getPageConfig()} dataSource={this.props.data} columns={this.getColumns()} onChange={this.handleChange.bind(this)} loading={this.props.isLoading} />
    )
  }
}

