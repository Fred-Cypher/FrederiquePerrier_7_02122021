import React from "react";
//import { Outlet, Link } from "react-router-dom";
import Header from "./Header";

const Login = () =>{

    // Fonction de connection

    return(
        <div>
            <Header/>
            <div className="d-flex justify-content-center">
                <div className="card p-3 m-3 col-md-8 d-flex justify-content-center">
                    <div className="mt-3 mb-4 h4">Connection au réseau social de Groupomania</div>
                    <form className="form col-md-10 col-lg-7">
                        <div className="form-group">
                            <label for='email' className="form-label">Adresse e-mail : </label>
                            <input type='text' name='email' id='email' className="form-control" required /> 
                        </div>
                        <div className="form-group">
                            <label for='mdp' className="form-label"> Mot de passe : </label>
                            <input type="text" name='mdp' id='mdp' className="form-control" required /> 
                        </div>
                        <div>
                            <button type='submit' className="btn mt-3 rounded border">Connection </button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
};

export default Login;
