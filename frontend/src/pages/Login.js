import React, { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () =>{
    localStorage.clear();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (e) =>{
        e.preventDefault();
        
        // Fonction générale pour valider les input
        const validInput = function (inputField, inputValue, regex, invalidMessage) {
            const small = inputField.nextElementSibling;

            if (regex.test(inputValue)) {
                small.textContent = '✅ La forme est correcte, veillez à avoir rentrer la valeur enregistrée lors de l\'inscription';
                small.classList.remove('text-danger');
                small.classList.add('text-success');
                inputField.style.borderColor = 'green';
                return true;
            } else if (!regex.test(inputValue)) {
                small.textContent = invalidMessage;
                small.classList.remove('text-success');
                small.classList.add('text-danger');
                inputField.style.borderColor = 'red';
                return false;
            }
        };

        // Préparation de la validation de l'adresse mail
        const emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,5}$', 'g');
        const emailInput = document.getElementById('email');
        const emailInvalid = '⛔ Cette adresse mail n\'est pas valide';

        // Préparation de la validation du mot de passe
        const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$', 'g')
        const passwordInput = document.getElementById('password');
        const passwordInvalid= '⛔ Attention, votre mot de passe n\'est pas conforme';

        // Validation des différents champs du formulaire
        const validEmail = validInput(emailInput, email, emailRegex, emailInvalid);
        const validpassword = validInput(passwordInput, password, passwordRegex, passwordInvalid);


        if(validEmail && validpassword){
            const user = { email: email, password: password};
            
            const options = { 
                headers : { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer token'
                }};
            console.log('user : ', user);
            console.log('options : ', options);

            axios.post('http://localhost:5500/api/users/login', user, options)
                .then(response => {
                    console.log('response : ', response)
                    console.log('response.email : ', response.data.user.email)
                    console.log('response.token : ', response.data.token)
                    if(email === response.data.user.email){
                        console.log('OK')
                        localStorage.setItem('userToken', response.data.token);
                        localStorage.setItem('userId', response.data.user.id);
                        navigate("/messages")
                        alert ('Vous allez être redirigé sur le forum de partage d\'images')
                    } else {
                        console.log('Ça ne fonctionne pas :( ')
                        return 'Erreur lors de la connection, veuillez recommencer'
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            alert ('Erreur d\'adresse email ou de mot de passe')
        }
    };

    return(
        <>
            <Header />
            <div className="d-flex justify-content-center">
                <div className="card pb-3 pt-3 m-5 col-md-8 d-flex align-items-center">
                    <div className="mt-3 mb-4 h3">Connexion au réseau social de Groupomania</div>
                    <form action="" onSubmit={ handleLogin } className="form col-md-10 col-lg-7">
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
                        <div className="row flex-row mt-3">
                            <div className="d-flex justify-content-center col-6">
                                <button type='submit' className="btn mt-3 rounded border">Connexion </button>
                            </div>
                            <div className="d-flex justify-content-center col-6">
                                <Link to='/signup'><button className="btn mt-3 rounded border">Pas encore inscrit ?</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default Login;


