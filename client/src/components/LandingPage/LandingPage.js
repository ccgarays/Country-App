import React from 'react'
import { Link } from 'react-router-dom'


export function LandingPage() {
    
    return (
        <Link to={'/countries'}>
            <button>HOME</button>
        </Link>
    )
}



export default LandingPage;

