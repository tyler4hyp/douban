import React, { Component } from 'react'
import Book from '../book'
import Film from '../film'
import Music from '../music'

import './list.css'

class List extends Component {
  constructor () {
    super()
  }

  deliver (url) {
    this.props.handleDetail && this.props.handleDetail(url)
  }

  componentDidMount () {
    // console.log(this.ul.scrollHeight, this.ul.clientHeight, this.ul.scrollTop)
    let list = this.ul
    list.addEventListener('scroll', () => {
      if (list.clientHeight + list.scrollTop == list.scrollHeight) {
        console.log(list.scrollHeight)
        this.props.loadMore && this.props.loadMore()
      }
    })
  }

  render () {
    let currTab = this.props.currTab
    let items = this.props.items
    let listState = this.props.detailPage ? ' hide' : ''
    return (
      <ul className={'list-wrap' + listState} ref={ul => this.ul = ul}>
        {items.map((item, index) => {
          if (currTab == 'book') {
            return <Book item={item} key={index} deliver={this.deliver.bind(this)} />
          } else if (currTab == 'film') {
            return <Film item={item} key={index} deliver={this.deliver.bind(this)} />
          } else {
            return <Music item={item} key={index} deliver={this.deliver.bind(this)} />
          }
        })}
      </ul>
    )
  }
}

export default List
