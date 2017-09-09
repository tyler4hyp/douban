import React, { Component } from 'react'
import './tab.css'

class Tab extends Component {
  constructor () {
    super()
  }

  changeTab (e) {
    const name = e.target.getAttribute('data-name')
    const currTab = this.props.currTab
    const defaultQuery = {
      book: 'https://api.douban.com/v2/book/search?q=javascript&fields=id,title,tags,author,rating,pubdate,image&count=20&start=0',
      film: 'https://api.douban.com/v2/movie/top250?count=20&start=0',
      music: 'https://api.douban.com/v2/music/search?q=周杰伦&count=20&start=0'
    }
    if (currTab != name) {
      this.props.handleTabChange && this.props.handleTabChange(defaultQuery[name], name)
    }
  }

  render () {
    return (
      <div className='tab-wrap'>
        <div className='tabs' data-name='book' onClick={this.changeTab.bind(this)}>图书</div>
        <div className='tabs' data-name='film' onClick={this.changeTab.bind(this)}>电影</div>
        <div className='tabs' data-name='music' onClick={this.changeTab.bind(this)}>音乐</div>
      </div>
    )
  }
}

export default Tab
