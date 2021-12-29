import React from "react";
import { useState } from "react";
import Header from "./Header";
import Login from "./Login";

const Signup = () =>{
    const [formsubmit, setFormSubmit] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifPassword, setVerifPassword] = useState('');
    
        
    const handleOnChange  = (event) => {
        event.preventDefault();

        const validFirstName = function(inputFirstName){
            const firstNameRegex = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ-\' ]+$', 'g');
            const smallFirst = document.querySelector('.smallFirst');
            if(firstNameRegex.test(inputFirstName.trim())) {
                inputFirstName.setAttribute('class', 'form-control border border-success');
                smallFirst.innerHTML = `<i class="fas fa-check"></i> OK`;
                smallFirst.classList.remove('text-danger');
                smallFirst.classList.add('text-success');
                return true;
            } else {
                inputFirstName.setAttribute('class', 'form-control border border-danger');
                smallFirst.innerHTML = `<i class="fas fa-times"></i> Le nom ne doit comporter que des lettres`;
                smallFirst.classList.remove('text-success');
                smallFirst.classList.add('text-danger');
                return false;
            }
        }

        const validLastName = function(inputLastName){
            const lastNameRegex = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ-\' ]+$', 'g');
            const smallLast = document.querySelector('.smallLast');
            if(lastNameRegex.test(inputLastName.trim())) {
                inputLastName.setAttribute('class', 'form-control border border-success');
                smallLast.innerHTML = `<i class="fas fa-check"></i> OK`;
                smallLast.classList.remove('text-danger');
                smallLast.classList.add('text-success');
                return true;
            } else {
                inputLastName.setAttribute('class', 'form-control border border-danger');
                smallLast.innerHTML = `<i class="fas fa-times"></i> Le nom ne doit comporter que des lettres`;
                smallLast.classList.remove('text-success');
                smallLast.classList.add('text-danger');
                return false;
            }
        }
        
        const validEmail = function(inputEmail){
            const emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,5}$', 'g');
            let smallEmail = document.querySelector('.smallEmail');
            if(emailRegex.test(inputEmail.trim())) {
                inputEmail.setAttribute('class', 'form-control border border-success');
                smallEmail.innerHTML = `<i class="fas fa-check"></i> OK`;
                smallEmail.classList.remove('text-danger');
                smallEmail.classList.add('text-success');
                return true;
            } else {
                inputEmail.setAttribute('class', 'form-control border border-danger');
                smallEmail.innerHTML = `<i class="fas fa-times"></i> Veuillez entrer une adresse mail valide`;
                smallEmail.classList.remove('text-success');
                smallEmail.classList.add('text-danger');
                return false;
            }
        }
        
        const validPassword = function(inputPassword){
            const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$');
            const smallPassword = document.querySelector('.smallPassword');
            if(passwordRegex.test(inputPassword.trim())){
                inputPassword.setAttribute('class', 'form-control border border-success');
                smallPassword.innerHTML = `<i class="fas fa-check"></i> OK`;
                smallPassword.classList.remove('text-danger');
                smallPassword.classList.add('text-success')
            } else {
                inputPassword.setAttribute('class', 'form-control border border-danger');
                smallPassword.innerHTML = `<i class="fas fa-times"></i> Le mot de passe doit comporter au minimum 8 caractères dont une majucule, une minuscule, un chiffre et un caractère spécial`;
                smallPassword.classList.remove('text-success');
                smallPassword.classList.add('text-danger');
                return false;
            }
        }

        const comparePassword = function(inputVerifPassword){
            const smallVerifPassword = document.querySelector('.smallVerifPassword');
            if(password === verifPassword){
                inputVerifPassword.setAttribute('form-control border border-success');
                smallVerifPassword.innerHTML = `<i class="fas fa-check"></i> OK`;
                smallVerifPassword.classList.remove('text-danger');
                smallVerifPassword.classList.add('text-success')
            } else {
                inputVerifPassword.setAttribute('class', 'form-control border border-danger')
                smallVerifPassword.innerHTML = `<i class="fas fa-times"></i> Mot de passe différent du précédent`;
                smallVerifPassword.classList.remove('text-success');
                smallVerifPassword.classList.add('text-danger');
                return false;
            }
        }

        if(validFirstName && validLastName && validEmail && validPassword && comparePassword){

            let userData = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            }

            let fetchData = {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            fetch('http://localhost:5500/api/auth/signup', fetchData)
                .then(response => response.json())
                .then(() => {
                    localStorage.setItem('user', JSON.stringify(userData));
                    setFormSubmit(true)
                })
                //.catch(error => res.status(500).json({ error : 'Problème lors de l\'enregistrement, veuillez recommencer votre inscription.' }))
            
            
        }
}


    return(
        <>
            {formsubmit ? (
                <>
                    <div>Enregistrement réussi, vous pouvez maintenant vous connecter au réseau social</div>
                    <Login />
                </>
            ): (
                <div>
                <Header/>
                <div className="d-flex justify-content-center">
                    <div className="card p-3 m-3 col-md-8 d-flex align-items-center">
                        <div className="mt-3 mb-4 h4">Inscription au réseau social de Groupomania</div>
                        <form action='' onSubmit={ handleOnChange } method='POST' className="col-md-10 col-lg-7">
                            <div className="form-group">
                                <label htmlFor='firstName' className="form-label">Prénom : </label>
                                <input type='text' name='firstName' id='firstName' className="form-control" onChange={(event) => setFirstName(event.target.value)} value= { firstName } required /> 
                                <small className="smallFirst"></small>
                            </div>
                            <div className="form-group">
                                <label htmlFor='lastName' className="form-label">Nom : </label>
                                <input type='text' name='lastName' id='lastName' className="form-control" onChange={(event) => setLastName(event.target.value)} value= { lastName } required />
                                <small className="smallLast"></small> 
                            </div>
                            <div className="form-group">
                                <label htmlFor='email' className="form-label">Adresse e-mail : </label>
                                <input type='email' name='email' id='email' className="form-control" onChange={(event) => setEmail(event.target.value)} value= { email } required /> 
                                <small className="SmallEmail"></small>
                            </div>
                            <div className="form-group">
                                <label htmlFor='password' className="form-label"> Mot de passe : </label>
                                <input type="password" name='password' id='password' className="form-control" onChange={(event) => setPassword(event.target.value)} value= { password } required /> 
                                <small className="smallEmail"></small>
                            </div>
                            <div className="form-group">
                                <label htmlFor='verifPassword' className="form-label"> Vérification du mot de passe : </label>
                                <input type="password" name='verifPassword' id='verifPassword' className="form-control" onChange={(event) => setVerifPassword(event.target.value)} value= { verifPassword } required /> 
                                <small className="smallVerifPassword"></small>
                            </div>
                            <div >
                                <button type='submit' className="btn mt-3 rounded border">Inscription </button>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>
            )}
            
        </>
    )
};

export default Signup;
