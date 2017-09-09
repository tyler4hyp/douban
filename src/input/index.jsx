import React, { Component } from 'react'
import './input.css'

class Input extends Component {
  constructor () {
    super()
  }

  getInput () {
    const searchQuery = {
      book: 'https://api.douban.com/v2/book/search?q=',
      film: 'https://api.douban.com/v2/movie/search?q=',
      music: 'https://api.douban.com/v2/music/search?q=',
      property: '&count=20&start=0'
    }
    let currTab = this.props.currTab
    let url = ''
    if (currTab == 'book') {
      url = searchQuery.book + this.input.value + '&fields=id,title,tags,author,rating,pubdate,image' + searchQuery.property
    } else if (currTab == 'film') {
      url = searchQuery.film + this.input.value + searchQuery.property
    } else if (currTab == 'music') {
      url = searchQuery.music + this.input.value + searchQuery.property
    }
    this.props.handleSearch && this.props.handleSearch(url)
  }

  render () {
    return (
      <div className='input-wrap'>
        <input className='input' ref={input => this.input = input} />
        <button className='search-btn' onClick={this.getInput.bind(this)}>搜索</button>
      </div>
    )
  }
}

export default Input
