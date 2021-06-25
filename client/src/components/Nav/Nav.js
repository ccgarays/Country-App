import React from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'

export function Nav() {

    return (
        <div className='Nav'>
            <Link to='/countries'>
                <button className='home'>HOME</button>
            </Link>
            <Link to='/activity'>
                <button className='activity'>ADD ACTIVITY</button>
            </Link>
        </div>
    )
}

export default Nav