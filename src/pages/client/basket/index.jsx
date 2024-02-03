import React from 'react'
import Basket from '../../../components/client/Basket'
import Navbar from '../../../components/client/Navbar'
import Footer from '../../../components/client/Footer'
import { Helmet } from 'react-helmet'

const BaskerPage = () => {
  return (
    <div>
   <Helmet>
       </Helmet>
        <Navbar/>
        <Basket/>
        <Footer/>
        
    </div>
  )
}

export default BaskerPage