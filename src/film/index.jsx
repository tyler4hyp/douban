import React, { Component } from 'react'
import './film.css'

class Film extends Component {
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
    const wrap = this.closest(target, '.film-wrap')
    const id = wrap.getAttribute('data-id')
    console.log(id)
    let url = 'https://api.douban.com/v2/movie/subject/' + id
    this.props.deliver && this.props.deliver(url)
  }

  render () {
    let curritem = this.props.item
    return (
      <div className='film-wrap' data-id={curritem.id} onClick={this.getDetail.bind(this)}>
        <img src={curritem.images.small} />
        <div className='info'>
          <p>{curritem.title} - {curritem.year}</p>
          <p>
            {curritem.genres.map((item, index) => {
              return <span className='genres' key={index}>{item}</span>
            })}
          </p>
          <p>
            {curritem.casts.map((item, index) => {
              return <span className='casts' key={index}>{item.name}</span>
            })}
          </p>
          <p>评分: <span>{curritem.rating.average}</span></p>
        </div>
      </div>
    )
  }
}

export default Film
