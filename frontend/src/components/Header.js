import React from "react";
import logo from '../images/icon-left-font-monochrome-black.svg';
import { Link } from "react-router-dom";

function Header(){
    return(
        <div className="d-flex flex-column border-bottom text-center align-items-center  justify-content-center p-3 col-12">
            <div className="d-flex justify-content-center row p-3 col-md-10 col-lg-8">
                <img src={logo} alt='Groupomania' className="img-fluid"/>
            </div>
            <div className="d-flex align-content-center justify-content-center col-12 col-md-10 col-lg-8">
                <div className="nav d-flex flex-row nav-tabs p-3 align-content-center">
                    <li className="nav-item">
                        <Link to='/' className="nav-link">Accueil</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/signup' className="nav-link">Inscription</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/login' className="nav-link">Connexion</Link>
                    </li>
                </div>
            </div>
        </div>
        
    )
};

export default Header;