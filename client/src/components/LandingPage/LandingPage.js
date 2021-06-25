import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css';
import logo from '../../logo.svg';

import './LandingPage.css'

export function LandingPage() {

    return (
        <div className="lang">
            <header className="lang-header">
                <Link to={'/countries'}>
                    <button className='button'>HOME</button>
                </Link>
            </header>
        </div>

    )
}



export default LandingPage;

