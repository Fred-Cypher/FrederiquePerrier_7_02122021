import React from "react";
import { Link } from "react-router-dom";
import logo  from '../images/icon-left-font-monochrome-black.svg'
import notfound from '../images/404notfound2.png';

const NotFound = () => {
    return(
        <div>
            <div className="d-flex flex-column border-bottom text-center align-items-center justify-content-center p-3 col-12">
                <div className="d-flex justify-content-center p-3 col-md-10 col-lg-8">
                    <img src={logo} alt='Groupomania' className="img-fluid"/>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center p-3">
                <img src={notfound} alt="404 Page not found" className="img-fluid"/>
                <Link to='/'><button className="btn mt-5 rounded border text-center">Retour à la page d'accueil </button></Link>
            </div>
        </div>
        )
};


export default NotFound;
