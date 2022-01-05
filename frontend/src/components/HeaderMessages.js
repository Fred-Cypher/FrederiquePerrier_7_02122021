import React from "react";
import logo from '../images/icon-left-font-monochrome-black.svg';
import { Link } from "react-router-dom";

function HeaderMessages(){
    return(
        <div className="row border-bottom p-3 col-12 ">
            <div className="p-3 col-7">
                <img src={logo} alt='Groupomania' className="img-fluid"/>
            </div>
            <div className="row p-3 col-4 color-danger">
                <Link to='/' >Accueil</Link>
                <Link to='/Profil'>Profil</Link>
            </div>
        </div>
        
    )
};

export default HeaderMessages;