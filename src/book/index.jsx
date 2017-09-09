import React, { Component } from 'react'
import './book.css'

class Book extends Component {
  constructor () {
    super()
  }

  closest (el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
    while (el) {
      if (matchesSelector.call(el, selector)) {
        break
      }
      el = el.parentNode || el.parentElement
    }
    return el
  }

  getDetail (e) {
    const target = e.target
    const wrap = this.closest(target, '.book-wrap')
    const id = wrap.getAttribute('data-id')
    console.log(id)
    let url = 'https://api.douban.com/v2/book/' + id
    this.props.deliver && this.props.deliver(url)
  }

  render () {
    let curritem = this.props.item
    return (
      <div className='book-wrap' data-id={curritem.id} onClick={this.getDetail.bind(this)}>
        <img src={curritem.image} />
        <div className='info'>
          <p>名称: <span>{curritem.title}</span></p>
          <p>
            {curritem.tags.map((item, index) => {
              return <span className='tags' key={index}>{item.name}</span>
            })}
          </p>
          <p>作者: <span>{curritem.author.join(', ')}</span></p>
          <p>评分: <span>{curritem.rating.average}</span></p>
          <p>时间: <span>{curritem.pubdate}</span></p>
        </div>
      </div>
    )
  }
}

export default Book
