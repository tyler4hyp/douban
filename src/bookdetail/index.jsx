import React, { Component } from 'react'

import './bookdetail.css'

class Bookdetail extends Component {
  constructor () {
    super()
  }

  exit () {
    this.props.handleDetailPage && this.props.handleDetailPage()
  }

  render () {
    let curritem = this.props.chosen
    return (
      <div className='bookdetail-wrap'>
        <div className='nav'>
          <span className='navbtn' onClick={this.exit.bind(this)}>&lt; 图书</span>
          <span className='title'>{curritem.title}</span>
        </div>
        <div className='header'>
          <img src={curritem.image} />
          <div className='info'>
            <p>名称: <span>{curritem.title}</span></p>
            <p>作者: <span>{curritem.author.join(', ')}</span></p>
            <p>出版社: <span>{curritem.publisher}</span></p>
            <p>日期: <span>{curritem.pubdate}</span></p>
            <p>评分: <span>{curritem.rating.average}</span></p>
            <p>价钱: <span>{curritem.price}</span></p>
            <p>
              {curritem.tags.map((item, index) => {
                return <span className='tags' key={index}>{item.name}</span>
              })}
            </p>
          </div>
        </div>
        <div className='catalog'>
          <h2>序言</h2>
          <p>{curritem.catalog}</p>
        </div>
        <div className='summary'>
          <h2>简介</h2>
          <p>{curritem.summary}</p>
        </div>
      </div>
    )
  }
}

export default Bookdetail
