import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import HeaderMessages from "../components/HeaderMessages";


const Profil = () => {
    //const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) =>{
        e.preventDefault();
    }

    return(
        <div>
            <HeaderMessages />
            <div className="d-flex flex-column justify-content-center">
                <div className="card pb-3 pt-3 m-5 col-md-8 d-flex align-items-center">
                    <div className="mt-3 mb-4 h3 text-center">Modification du profil</div>
                    <div className="mt-3 mb-4 h5 text-center">Seuls l'adresse mail et le mot de passe peuvent être modifiés</div>
                    <form action="" onSubmit={ handleChange } className="form col-md-10 col-lg-7">
                        <div className="form-group">
                            <label htmlFor='email' className="form-label">Adresse e-mail : </label>
                            <input type='text' name='email' id='email' className="form-control" onChange={(e) => setEmail(e.target.value)} value= { email } required /> 
                            <small className="small"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor='password' className="form-label"> Mot de passe : </label>
                            <input type="password" name='password' id='password' className="form-control" onChange={(e) => setPassword(e.target.value)} value= { password } required /> 
                            <small className="small"></small>
                        </div>
                        <div className="row flex-row justify-content-center mt-3">
                            <div className="d-flex align-items-center justify-content-center col-6">
                                <button type='submit' className="btn mt-3 rounded border ">Modifier </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="card pb-3 pt-3 m-5 col-8 d-flex align-items-center border-danger">
                    <div className="mt-3 mb-4 h3 text-center">Suppression du compte</div>
                    <div className="mt-3 mb-4 h4 text-center text-danger">Attention, la suppression du compte est définitive</div>
                    <div className="row flex-row justify-content-center mt-3">
                            <div className="d-flex align-items-center justify-content-center col-10">
                                <button type='submit' className="btn mt-3 rounded border-danger">Supprimer mon compte </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
};

export default Profil;