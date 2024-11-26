import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from './components/Button';
import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from './components/Header';
import Hero from './components/Hero';
import Hero3 from './components/Hero3';
import Hero7 from './components/Hero7';
import Hero6 from './components/Hero6';
import Benefits from './components/Benefits';
import Services from './components/Services';
import Collaboration from './components/Collaboration';
import Price from './components/Price';
import Roadmap from './components/Roadmap';


const App = ()=> {

  return (
    <>
   
    
    <div className='pt-[4.7re5m] lg:pt-[5.25rem] overflow-hidden'>
     <Header />
     <Hero7 />
     
    </div>
    <ButtonGradient />

  </>
  );
}

export default App

/*

 <Collaboration />
      <Services />
      <Price />
      <Benefits />
     
      <Roadmap />
      */
