import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Fonction générale pour valider les input

        const validInput = function (inputField, inputValue, regex, invalidMessage) {
            const small = inputField.nextElementSibling;

            if (regex.test(inputValue.trim())) {
                small.textContent = '✅ OK';
                small.classList.remove('text-danger');
                small.classList.add('text-success');
                inputField.style.borderColor = 'green';
                return true;
            } else if (!regex.test(inputValue.trim())) {
                small.textContent = invalidMessage;
                small.classList.remove('text-success');
                small.classList.add('text-danger');
                inputField.style.borderColor = 'red';
                return false;
            }
        };

        // Préparation de la validation du prénom         
        const firstNameRegex = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ-\' ]+$', 'g');
        const firstNameInput = document.getElementById('firstName');
        const firstNameInvalid = '⛔ Le prénom ne doit comporter que des lettres (espace, tiret et apostrophe autorisés)';

        // Préparation de la validation du nom
        const lastNameRegex = new RegExp("^([A-Za-z]+)[' -]?([A-Za-z]+)$", "g");
        const lastNameInput = document.getElementById('lastName');
        const lastNameInvalid = '⛔ Le nom ne doit comporter que des lettres (espace, tiret et apostrophe autorisés)';

        // Préparation de la validation de l'adresse mail
        const emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,5}$', 'g');
        const emailInput = document.getElementById('email');
        const emailInvalid = '⛔ Veuillez entrer une adresse mail valide';

        // Préparation de la validation du mot de passe
        const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$', 'g')
        const passwordInput = document.getElementById('password');
        const passwordInvalid= '⛔ Le mot de passe doit comporter au minimum 8 caractères dont une majucule, une minuscule, un chiffre et un caractère spécial';

        // Validation des différents champs du formulaire
        const validFirstName = validInput(firstNameInput, firstName, firstNameRegex, firstNameInvalid);
        const validLastName = validInput(lastNameInput, lastName, lastNameRegex, lastNameInvalid);
        const validEmail = validInput(emailInput, email, emailRegex, emailInvalid);
        const validpassword = validInput(passwordInput, password, passwordRegex, passwordInvalid);

        console.log('validFirtsName', validFirstName);
        console.log('validLastName', validLastName);
        console.log('validEmail', validEmail);
        console.log('validPassword', validpassword);

        // Validation du formulaire
        if (validFirstName && validLastName && validEmail && validpassword) {
            const verifPassword = document.getElementById('verifPassword');
            // Vérification du mot de passe 
            if (password !== checkPassword) {
                verifPassword.nextElementSibling.textContent = '⛔ Mots de passe différents, réessayez.';
                verifPassword.nextElementSibling.classList.remove('text-success');
                verifPassword.nextElementSibling.classList.add('text-danger');
                verifPassword.style.borderColor = 'red';
            }
            else {
                const user = {
                    first_name: firstName, 
                    last_name: lastName, 
                    email: email,
                    password: password
                }
                axios.put('http://localhost:5500/api/users/signup', user)
                    .then(function (response) {
                        console.log(response);
                    })
                    .then(() => {
                            navigate("/login")
                        })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }

    return (
        <div>
            <Header/>
            <div className="d-flex justify-content-center">
                <div className="card pb-3 pt-3 m-5 col-md-8 d-flex align-items-center">
                    <div className="mt-3 mb-4 h3">Inscription au réseau social de Groupomania</div>
                    <form action='' onSubmit={ handleSubmit } method='POST' className="col-md-12 col-lg-7">
                        <div className="form-group ">
                            <label htmlFor='firstName' className="form-label">Prénom : </label>
                            <input type='text' name='firstName' id='firstName' className="form-control"  onChange={(e) => setFirstName(e.target.value)} value= { firstName } /> 
                            <small className="small"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor='lastName' className="form-label">Nom : </label>
                            <input type='text' name='lastName' id='lastName' className="form-control" onChange={(e) => setLastName(e.target.value)} value= { lastName }  />
                            <small className="small"></small> 
                        </div>
                        <div className="form-group">
                            <label htmlFor='email' className="form-label">Adresse e-mail : </label>
                            <input type='text' name='email' id='email' className="form-control" onChange={(e) => setEmail(e.target.value)} value= { email } /> 
                            <small className="small"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor='password' className="form-label"> Mot de passe : </label>
                            <input type="password" name='password' id='password' className="form-control" onChange={(e) => setPassword(e.target.value)} value= { password } /> 
                            <small className="small"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor='verifPassword' className="form-label"> Vérification du mot de passe : </label>
                            <input type="password" name='verifPassword' id='verifPassword' className="form-control" onChange={(e) => setCheckPassword(e.target.value)} value= { checkPassword } /> 
                            <small className="small"></small>
                        </div>
                        <div className="row flex-row  mt-3">
                            <div className="d-flex justify-content-center col-6">
                                <button type='submit' className="btn mt-3 rounded border">Inscription </button>
                            </div>
                            <div className="d-flex justify-content-center col-6">
                                <Link to='/login'><button className="btn mt-3 rounded border">Déjà inscrit ?</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Signup;
