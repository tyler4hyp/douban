import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import Input from './input'
import Tab from './tab'
import List from './list'
import Bookdetail from './bookdetail'
import Filmdetail from './filmdetail'
import Musicdetail from './musicdetail'

import './style.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      currTab: 'book',
      items: [],
      query: 'https://api.douban.com/v2/book/search?q=javascript&fields=id,title,tags,author,rating,pubdate,image&count=20&start=0',
      chosen: {},
      detailPage: false,
      start: 0,
      count: 20
    }
  }

  loadMore () {
    let pattern = /(\d+)(?=$)/g
    let url = this.state.query
    let newStart = this.state.start + this.state.count + ''
    url.replace(pattern, newStart)
    let oldData = this.state.items.concat()
    fetchJsonp(url
    ).then((response) => {
      return response.json()
    }).then((json) => {
      console.log(json)
      let data = json.books || json.subjects || json.musics
      let newData = oldData.concat(data)
      this.setState({
        query: url,
        items: newData,
        start: newStart
      })
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  handleTabChange (url, name) {
    fetchJsonp(url
    ).then((response) => {
      return response.json()
    }).then((json) => {
      console.log(json)
      let data = json.books || json.subjects || json.musics
      this.setState({
        query: url,
        currTab: name,
        items: data,
        start: 0
      })
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  handleDetail (url) {
    console.log(url)
    fetchJsonp(url
    ).then((response) => {
      return response.json()
    }).then((json) => {
      console.log(json)
      this.setState({
        chosen: json,
        detailPage: true
      })
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  handleDetailPage () {
    this.setState({
      chosen: {},
      detailPage: false
    })
  }

  handleSearch (url) {
    fetchJsonp(url
    ).then((response) => {
      return response.json()
    }).then((json) => {
      console.log(json)
      let data = json.books || json.subjects || json.musics
      this.setState({
        query: url,
        items: data,
        start: 0
      })
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  componentDidMount () {
    console.log(this.state.items, this.state.currTab)
    fetchJsonp(this.state.query
    ).then((response) => {
      return response.json()
    }).then((json) => {
      console.log(json)
      let data = json.books || json.subjects || json.musics
      this.setState({
        items: data
      })
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  render () {
    console.log('render')
    let detail = null
    if (Object.keys(this.state.chosen).length !== 0) {
      if (this.state.currTab == 'book') {
        detail = <Bookdetail chosen={this.state.chosen} handleDetailPage={this.handleDetailPage.bind(this)} />
      } else if (this.state.currTab == 'film') {
        detail = <Filmdetail chosen={this.state.chosen} handleDetailPage={this.handleDetailPage.bind(this)} />
      } else if (this.state.currTab == 'music') {
        detail = <Musicdetail chosen={this.state.chosen} handleDetailPage={this.handleDetailPage.bind(this)} />
      }
    }
    return (
      <div className='app'>
        <Input currTab={this.state.currTab} handleSearch={this.handleSearch.bind(this)} />
        { this.state.items.length !== 0 ? (
          <List currTab={this.state.currTab} items={this.state.items} handleDetail={this.handleDetail.bind(this)} detailPage={this.state.detailPage} loadMore={this.loadMore.bind(this)} />
          ) : (null)}
        <Tab handleTabChange={this.handleTabChange.bind(this)} currTab={this.state.currTab} />
        {detail}
      </div>
    )
  }
}

module.exports = App
