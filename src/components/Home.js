import React, { Component } from 'react'
import { Timeline, Icon, Input, DatePicker, Card, Tag, Select } from 'antd'
import moment from 'moment';
import 'moment/locale/ko';
import locale from 'antd/lib/date-picker/locale/ko_KR';
import './Home.css'
import app from '../base'

const Option = Select.Option;

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      tag: 'completed',
      posts: {}
    }
    this.getPosts()
  }

  getPosts = async (date = moment(new Date()).format('YYYY-MM-DD')) => {
    const userId = app.auth().currentUser.uid
    const ref = app.database().ref(`posts/${userId}/${date}`)
    
    ref.once('value', snapshot => {
      this.setState({ 
        posts: snapshot.val() ? snapshot.val() : {} 
      })
    })
    
  }

  handleTagChange = (tag) => {
    this.setState({ tag })
  }

  handleChange = (e) => {
    const text = e.target.value
    this.setState({ text })
  }

  handleEnter = async () => {
    const { tag, text } = this.state
    const date = moment(new Date()).format('YYYY-MM-DD')
    const userId = app.auth().currentUser.uid;
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    const postData = {
      tag,
      text,
      color,
      created_at: moment(new Date()).format('LTS')
    }
    const ref = app.database().ref(`posts/${userId}/${date}`).push()
    await ref.set(postData)
    this.getPosts()
    this.setState({ text: '' })
  }

  handleDatePicker = (date) => {
    this.getPosts(date.format('YYYY-MM-DD'))
  }

  getText = (tag) => ({ 'completed': '한일', 'think': '생각', 'read': '읽음' }[tag])

  render() {
    const { tag, text, posts } = this.state
    const selectBefore = (
      <Select defaultValue={tag} style={{ width: 90 }} onChange={this.handleTagChange}>
        <Option value="completed">한일</Option>
        <Option value="think">생각</Option>
        <Option value="read">읽음</Option>
      </Select>
    )

    const timelines = Object.keys(posts).map((key, index) => {
      const { created_at, color, tag, text } = posts[key]
      return (
        <Timeline.Item key={index} dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
          <Card
            title={created_at}
            headStyle={{ 'borderTop': `1px solid ${color}` }}
            bodyStyle={{ 'wordWrap': 'break-word' }}>
            <Tag color={color}>{this.getText(tag)}</Tag>
            {tag === 'read'
              ? (<a href={text} rel="noopener noreferrer" target="_blank">{text}</a>)
              : (text)}
          </Card>
        </Timeline.Item>
      )
    })

    return (
      <div className="App">
        <div>
          <DatePicker
            style={{ 'width': '280px' }}
            size="large"
            locale={locale}
            defaultValue={moment(new Date(), 'YYYY-MM-DD')}
            onChange={this.handleDatePicker}
          />
          <Input
            size="large"
            style={{ 'width': '80%', 'margin': '5% 0' }}
            value={text}
            addonBefore={selectBefore}
            onChange={this.handleChange}
            onPressEnter={this.handleEnter} />
        </div>
        <Timeline mode="alternate">
          {timelines.reverse()}
        </Timeline>
      </div>
    )
  }
}

export default Home



