import React from 'react'
import { Link } from 'react-router-dom'

export function Nav() {

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'blue', marginBottom: '40px' }}>
            <Link to='/countries'>HOME</Link>
            <Link to='/activity'>Add Activity</Link>
        </div>
    )
}

export default Nav