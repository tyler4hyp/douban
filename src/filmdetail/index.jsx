import React, { Component } from 'react'

import './filmdetail.css'

class Filmdetail extends Component {
  constructor () {
    super()
  }

  exit () {
    this.props.handleDetailPage && this.props.handleDetailPage()
  }

  render () {
    let curritem = this.props.chosen
    return (
      <div className='filmdetail-wrap'>
        <div className='nav'>
          <span className='navbtn' onClick={this.exit.bind(this)}>&lt; 电影</span>
          <span className='title'>{curritem.title}</span>
        </div>
        <img className='poster' src={curritem.images.large} />
        <div className='summary'>
          <h2>简介</h2>
          <p>名称: <span>{curritem.title}</span></p>
          <p>
            {curritem.genres.map((item, index) => {
              return <span className='genres' key={index}>{item}</span>
            })}
          </p>
          <p>上映时间: <span>{curritem.year}</span></p>
          <p>导演: {
            curritem.directors.map((item, index) => {
              return <span className='directors' key={index}>{item.name}</span>
            })
          }</p>
          <p>{curritem.title}({curritem.original_title})</p>
        </div>
        <div className='casts'>
          <h2>演员</h2>
          <div className='avatars'>
            {
              curritem.casts.map((item, index) => {
                return <img className='avatar' key={index} src={item.avatars.large} />
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Filmdetail
