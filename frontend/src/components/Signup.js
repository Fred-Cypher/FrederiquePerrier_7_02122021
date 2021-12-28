import React from "react";
import Header from "./Header";

const Signup = () =>{
    
    // fonction inscription

    return(
        <div>
            <Header/>
            <div className="d-flex justify-content-center">
                <div className="card p-3 m-3 col-md-8 d-flex align-items-center">
                    <div className="mt-3 mb-4 h4">Inscription au réseau social de Groupomania</div>
                    <form action='' method='POST' className="col-md-10 col-lg-7">
                        <div className="form-group">
                            <label for='firstName' className="form-label">Prénom : </label>
                            <input type='text' name='firstName' id='firstName' className="form-control" required /> 
                        </div>
                        <div className="form-group">
                            <label for='lastName' className="form-label">Nom : </label>
                            <input type='text' name='lastName' id='lastName' className="form-control" required /> 
                        </div>
                        <div className="form-group">
                            <label for='email' className="form-label">Adresse e-mail : </label>
                            <input type='email' name='email' id='email' className="form-control" required /> 
                        </div>
                        <div className="form-group">
                            <label for='mdp' className="form-label"> Mot de passe : </label>
                            <input type="text" name='mdp' id='mdp' className="form-control" required /> 
                        </div>
                        <div className="form-group">
                            <label for='mdp' className="form-label"> Vérification du mot de passe : </label>
                            <input type="text" name='mdp' id='mdp' className="form-control" required /> 
                        </div>
                        <div >
                            <button type='submit' className="btn mt-3 rounded border">Inscription </button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
};

export default Signup;
