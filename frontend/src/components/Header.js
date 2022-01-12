import React from "react";
import logo from '../images/icon-left-font-monochrome-black.svg';
import { Link } from "react-router-dom";

function Header(){
    return(
        <div className="column border-bottom p-3 col-12 ">
            <div className="p-3 col-12">
                <img src={logo} alt='Groupomania' className="img-fluid"/>
            </div>
            <div className="navbar row p-3">
                <div>
                    <Link to='/' >Accueil</Link>
                </div>
                <div>
                    <Link to='/signup'>Inscription</Link>
                </div>
                <div>
                    <Link to='/login'>Connection</Link>
                </div>
            </div>
        </div>
        
    )
};

export default Header;