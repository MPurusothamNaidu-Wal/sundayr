/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Product from './Product';
import Forum from './Forum';
import Home from './Home';

function App() {
  return (
    <>
      <div className='App'>
        <nav
          className='navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light'
          id='ftco-navbar'
        >
          <div className='container'>
            <a className='navbar-brand'>Forum and Products page</a>
            <div>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item '>
                  <a href='/' className='nav-link'>
                    Home
                  </a>
                </li>
                <li className='nav-item '>
                  <a href='/products' className='nav-link'>
                    Product
                  </a>
                </li>
                <li className='nav-item '>
                  <a href='/forum' className='nav-link'>
                    Forum
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/forum' element={<Forum />}></Route>
            <Route path='/products' element={<Product />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
