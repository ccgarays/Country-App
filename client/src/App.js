import './App.css';
import { React } from 'react'
import { Route } from 'react-router-dom'

import Country from './components/CountryDetail/CountryDetail'
import LandingPage from './components/LandingPage/LandingPage'
import AddActivity from './components/AddActivity/AddActivity'
import HomeCountries from './components/HomeCountries/HomeCountries'
import Nav from './components/Nav/Nav';
import Pagination from './components/Pagination/Pagination';



function App() {

  return (
    <>
    <Route path='/' component={LandingPage} >
      <Nav/>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/countries' component={HomeCountries} />
      <Route exact path='/countries' component={Pagination}/>
      <Route path='/countries/:idPais' component={Country} />
      <Route path='/countries/?' component={Country} />
      <Route path='/activity' component={AddActivity}/>
    </Route>
    </>
  );
}


export default App;
