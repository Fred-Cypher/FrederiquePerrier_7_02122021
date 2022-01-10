import React, { useState } from "react";
import Header from "./Header";
import Messages from './Messages';
import '../style/signup.css';
import { Link } from "react-router-dom";

const Login = () =>{
    localStorage.clear();
    const [formSubmit, setFormSubmit] = useState(false);
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
            const userLogin = {
                email: email,
                password: password
            }

            console.log('userLogin :' , userLogin);

            const fetchData = {
                method: 'POST',
                body: JSON.stringify(userLogin),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            console.log('fetchdata : ', fetchData);
            

            fetch('http://localhost:5500/api/auth/login', fetchData)
                .then(response => response.json())
                .then(data => {
                    console.log('userLogin.email : ', userLogin.email); // OK
                    console.log('userLogin.password :', userLogin.password); // OK
                    console.log('data.email : ', data.email); // OK
                    console.log('data.first_name : ', data.first_name); // OK
                    console.log('data.last_name : ', data.last_name); // OK
                    console.log('base de données : ', data); // OK
                    if(userLogin.email === data.email){
                        console.log('OK')
                        setFormSubmit(true)
                        localStorage.setItem('userId', data.id);
                        localStorage.setItem('userFirstName', data.first_name);
                        localStorage.setItem('userLastName', data.last_name);
                    } else {
                        console.log('Ça ne fonctionne pas :( ')
                        setFormSubmit(false)
                        return 'Erreur lors de la connection, veuillez recommencer'
                    }
                    
                })
                .catch((err) => { 
                    console.log(err);
                    e.preventDefault();
                });
        }
    };

    

    return(
        <>
        { formSubmit? (
            <>
                <div>Bienvenue sur le forum de partage d'images</div>
                <Messages />
            </>
        ) : (
            <div>
                <Header />
                <div className="d-flex justify-content-center">
                    <div className="card p-3 m-3 col-md-8 d-flex align-items-center">
                        <div className="mt-3 mb-4 h4">Connexion au réseau social de Groupomania</div>
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
                            <div className="row flex-row">
                                <div className="d-flex justify-content-center col-6">
                                    <button type='submit' className="btn mt-3 rounded border">Connexion </button>
                                </div>
                                <div className="d-flex justify-content-center col-6">
                                    <Link to='/Signup'><button className="btn mt-3 rounded border">Pas encore inscrit ?</button></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
        
        </>
        
    )
};

export default Login;
