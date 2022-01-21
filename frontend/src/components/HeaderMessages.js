import React from "react";
import logo from '../images/icon-left-font-monochrome-black.svg';
import { Link } from "react-router-dom";
import '../style/headers.css'


function HeaderMessages(){
    return(
        <div className="d-flex flex-column border-bottom text-center align-items-center  justify-content-center p-3 col-12">
            <div className="d-flex justify-content-center row p-3 col-md-10 col-lg-8">
                <img src={logo} alt='Groupomania' className="img-fluid"/>
            </div>
            <div className="d-flex align-content-center justify-content-center col-12 col-md-10">
                <ul className="nav d-flex flex-row nav-tabs p-3 align-content-center">
                    <li className="nav-item">
                        <Link to='/messages' className="nav-link">Accueil forum</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/profil' className="nav-link">Profil</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/newmessage' className="nav-link">Enregistrer une nouvelle image</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/newarticle' className="nav-link">Enregistrer un nouvel article</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/logout' className="nav-link">Déconnection</Link>
                    </li>
                </ul>
            </div>
            
        </div>
        
    )
};

export default HeaderMessages; 