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
                    <div className="row flex-row">
                        <div className="d-flex justify-content-center col-6 p-3">
                            <Link to='/login'><button className="btn mt-3 rounded border">Connection</button></Link>
                        </div>
                        <div className="d-flex justify-content-center col-6 p-3">
                            <Link to='/signup'><button className="btn mt-3 rounded border">Inscription</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomePage;