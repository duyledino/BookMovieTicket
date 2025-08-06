import React from 'react'
import LoginPage from './LoginPage'
import HeroPublic from '../../components/public/HeroPublic'
import NotYetPublic from '../../components/public/NotYetPublic'
import OnAirPublic from '../../components/public/OnAirPublic'


function HomePage() {
  return (
    <>
     {/* <h1 className='inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600'>HomePage</h1>  */}
    {/* <LoginPage/> */}
    <HeroPublic/>
    <NotYetPublic/>
    <OnAirPublic/>
    </>
  )
}

export default HomePage
