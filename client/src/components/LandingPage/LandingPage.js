import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css';

import './LandingPage.css'

export function LandingPage() {

    return (
        <div className="lang">
            <header className="lang-header">
                <Link to={'/countries'}>
                    <h1><span class='one'>c</span><span class='two'>o</span><span class='three'>u</span><span class='four'>n</span><span class='five'>t</span><span class='six'>r</span><span class='one'>i</span><span class='two'>e</span><span class='one'>s</span></h1>

                </Link>
            </header>
        </div>

    )
}



export default LandingPage;

