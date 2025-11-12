import React from 'react'
import loading from './loading.gif'

const Spiner = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <img src={loading} alt="loading" style={{textAlign:'center'}} />
    </div>
  )
}

export default Spiner
