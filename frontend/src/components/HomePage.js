import React from "react";
import { Link } from "react-router-dom";
import '../style/homePage.css';
import Header from "./Header";

function HomePage(){
    return(
        <div className="home">
            <Header/>
            <div className="d-flex justify-content-center">
                <div className="col-9 card p-3 m-2">
                    <h1 className="col-12 p-">Bienvenue sur le réseau social de Groupomania</h1>
                    <div className="d-flex justify-content-center p-3 mt-3">
                        <Link to='/Login'>Connection</Link>
                    </div>
                    <div className="d-flex justify-content-center p-3 mt-3">
                        <Link to='/Signup'>Inscription</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomePage;