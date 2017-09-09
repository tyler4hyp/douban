import React, { Component } from 'react'

import './musicdetail.css'

class Musicdetail extends Component {
  constructor () {
    super()
  }

  exit () {
    this.props.handleDetailPage && this.props.handleDetailPage()
  }

  render () {
    let curritem = this.props.chosen
    return (
      <div className='musicdetail-wrap'>
        <div className='nav'>
          <div className='navbtn' onClick={this.exit.bind(this)}>&lt; 音乐</div>
          <div className='title'>{curritem.title}</div>
        </div>
        <div className='header'>
          <img src={curritem.image} />
          <div className='info'>
            <p>名称: <span>{curritem.title}</span></p>
            <p>{
            curritem.tags.map((item, index) => {
              return <span className='tags' key={index}>{item.name}</span>
            })
            }</p>
            <p>作者: {
              curritem.author.map((item, index) => {
                return <span className='author' key={index}>{item.name} </span>
              })
            }</p>
            <p>发布商: {
              curritem.attrs.publisher.map((item, index) => {
                return <span className='publisher' key={index}>{item} </span>
              })
            }</p>
            <p>发布时间: <span>{curritem.attrs.pubdate[0]}</span></p>
            <p>评分: <span>{curritem.rating.average}</span></p>
          </div>
        </div>
        <div className='summary'>
          <h2>简介</h2>
          <p>{curritem.summary}</p>
        </div>
      </div>
    )
  }
}

export default Musicdetail
