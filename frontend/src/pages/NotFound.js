import React from "react";
import { Link } from "react-router-dom";
import logo  from '../images/icon-left-font-monochrome-black.svg'

const NotFound = () => {
    return(
        <div>
            <div className="d-flex flex-column border-bottom text-center align-items-center justify-content-center p-3 col-12">
                <div className="d-flex justify-content-center p-3 col-md-10 col-lg-8">
                    <img src={logo} alt='Groupomania' className="img-fluid"/>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center p-3">
                <div className="m-4 h1 fw-bold">Error 404 </div>
                <div className="m-4 h2 fw-bold">Page Not Found  </div>
                <Link to='/'><button className="btn mt-5 rounded border text-center">Retour à la page d'accueil </button></Link>
            </div>
            
        </div>
        )

}


export default NotFound;
