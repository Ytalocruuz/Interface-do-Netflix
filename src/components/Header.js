import React from 'react'
import './Header.css'
import logo from '../img/netflix-logo.png'
import user from '../img/user.png'

export default function Header({black}) {
    return (
        <header className={black ? 'black':''}> {/* Deixar dinâmica para quando descer ela ficar preta */}
            <div className="header--logo">
                <a href="/">
                    <img src={logo} alt="Netflix logo" />
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={user} alt="Netflix user" />
                </a>
            </div>
            
        </header>
    )
}