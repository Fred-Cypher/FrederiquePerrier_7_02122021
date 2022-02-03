import React from "react";
import logo from '../images/icon-left-font-monochrome-black.svg';
import { Link } from "react-router-dom";
import '../style/headers.css';
import { useNavigate } from "react-router-dom";;


function HeaderMessages(){
    const navigate = useNavigate();

    const handleClick = () =>{
        localStorage.clear();
        navigate('/');
    }

    return(
        <div className="d-flex flex-column border-bottom align-items-center justify-content-center p-3 col-12">
            <div className="d-flex flex-column align-items-center justify-content-between p-3 col-12 col-md-10 col-lg-8">
                <img src={logo} alt='Groupomania' className="img-fluid"/>
                <button onClick={ handleClick } className="btn mt-3 ms-3 rounded text-center logout">Déconnexion</button>
            </div>
            <div className="d-flex align-content-center justify-content-center col-12 col-md-10">
                <ul className="nav d-flex flex-row nav-tabs p-3 align-content-center">
                    <li className="nav-item">
                        <Link to='/messages' className="nav-link">Accueil forum</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/profil' className="nav-link">Modifier mon profil</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/newmessage' className="nav-link">Enregistrer une nouvelle image</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/newarticle' className="nav-link">Enregistrer un nouvel article</Link>
                    </li>
                    <li>
                        <Link to='/delete' className="nav-link link-danger delete">Suppression du compte</Link>
                    </li>
                </ul> 
            </div>       
        </div>
        
    )
};

export default HeaderMessages; 