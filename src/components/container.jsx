import React from 'react'
import '../style.css'
import Header from './header'
import Form from './Form'
import Darkmode from './darkmode'


function container() {
  return (
    <><div className='normal'>
          <br />
      </div>
      <div className='container'>
          <Darkmode />
              <Header />
              <Form/>
            
          </div></>
  )
}

export default container