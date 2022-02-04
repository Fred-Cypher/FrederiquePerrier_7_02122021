import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMessages from "../components/HeaderMessages";


const Profil = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userToken = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');

    console.log(userToken);
    console.log(userId);

    const handleChange = (e) =>{
        e.preventDefault();

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

        // Préparation de la validation de l'adresse mail
        const emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,5}$', 'g');
        const emailInput = document.getElementById('email');
        const emailInvalid = '⛔ Veuillez entrer une adresse mail valide';

        // Préparation de la validation du mot de passe
        const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$', 'g')
        const passwordInput = document.getElementById('password');
        const passwordInvalid= '⛔ Le mot de passe doit comporter au minimum 8 caractères dont une majucule, une minuscule, un chiffre et un caractère spécial';

         // Validation des différents champs du formulaire
        const validEmail = validInput(emailInput, email, emailRegex, emailInvalid);
        const validpassword = validInput(passwordInput, password, passwordRegex, passwordInvalid);

        console.log('validEmail', validEmail);
        console.log('validPassword', validpassword);

        if(validEmail && validpassword){
            const token = localStorage.getItem('userToken'); 
            const options = {
                headers: {
                    'Accept': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            }
            const user = {
                    email: email,
                    password: password
                }
                
            axios.patch('http://localhost:5500/api/users/'+userId, user, options)
                .then(function (response){
                    console.log(response)
                    navigate('/messages')
                })
        }

    }

    return(
        <div>
            <HeaderMessages />
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="card pb-3 pt-3 md-5 col-md-8 d-flex align-items-center">
                    <div className="mt-3 mb-4 h3 text-center">Modification du profil</div>
                    <div className="mt-3 mb-4 h5 text-center">Seuls l'adresse mail et le mot de passe peuvent être modifiés</div>
                    <form action="" onSubmit={ handleChange } className="form col-11 col-md-10 col-lg-7">
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
                
            </div>
        </div>
    )
};

export default Profil;