import React from "react";
import logo from '../images/icon-left-font-monochrome-black.svg';
import { Link } from "react-router-dom";


function HeaderMessages(){
    return(
        <div className="column border-bottom p-3 col-12 ">
            <div className="p-3 col-12">
                <img src={logo} alt='Groupomania' className="img-fluid"/>
            </div>
            <div className="navbar row p-3 ol-12">
                <div>
                    <Link to='/messages'>Accueil forum</Link>
                </div>
                <div>
                    <Link to='/profil'>Profil</Link>
                </div>
                <div>
                    <Link to='/newmessage'>Enregistrer un nouveau message</Link>
                </div>
                <div>
                    <Link to='/logout'>Déconnection</Link>
                </div>
            </div>
        </div>
        
    )
};

export default HeaderMessages; 