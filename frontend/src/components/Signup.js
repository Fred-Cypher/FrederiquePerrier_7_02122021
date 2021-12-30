import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
import Login from "./Login";

const Signup= () =>{
    const initialsValues = { firstName: '', lastName: '', email: '', password: '', verifPassword: ''};
    const [formValues, setFormValues] = useState(initialsValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};

        const firstNameRegex = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ-\' ]+$', 'g');
        const lastNameRegex = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ-\' ]+$', 'g');
        const emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,5}$', 'g');
        const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$');

        if(!values.firstName){
            errors.firstName = 'Le prénom est obligatoire'
        } else if (!firstNameRegex.test(values.firstName.trim())){
            errors.firstName = 'Le prénom ne doit comporter que des lettres (espaces, tirets et apostrophes autorisés)'
        }
        if(!values.lastName){
            errors.lastName = 'Le nom est obligatoire'
        } else if (!lastNameRegex.test(values.lastName.trim())){
            errors.lastName = 'Le nom ne doit comporter que des lettres (espaces, tirets et apostrophes autorisés)'
        }
        if(!values.email){
            errors.email = 'L\'adresse mail est obligatoire'
        } else if (!emailRegex.test(values.email.trim())){
            errors.email = 'Veuillez entrer une adresse mail valide'
        }
        if(!values.password){
            errors.password= 'Le mot de passe est obligatoire'
        } else if (!passwordRegex.test(values.password.trim())){
            errors.password = 'Le mot de passe doit comporter au minimum 8 caractères dont une majucule, une minuscule, un chiffre et un caractère spécial'
        }
        if(values.password !== values.verifPassword){
            errors.verifPassword = 'Mots de passe différents, réessayez.'
        }
        return errors;    
    }
    
    if(validate && !setFormErrors){
        let userData = {
            first_name: formValues.firstName,
            last_name: formValues.lastName,
            email: formValues.email,
            password: formValues.password
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
                setIsSubmit(true)
            })
            //.catch(error => res.status(500).json({ error : 'Problème lors de l\'enregistrement, veuillez recommencer votre inscription.' }))
        
    }

    return(
        <>
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <>
                    <div>Enregistrement réussi, vous pouvez maintenant vous connecter au réseau social</div>
                    <Login />
                </>
            ) : (
                <div>
                <Header/>
                <div className="d-flex justify-content-center">
                    <div className="card p-3 m-3 col-md-8 d-flex align-items-center">
                        <div className="mt-3 mb-4 h4">Inscription au réseau social de Groupomania</div>
                        <form action='' onSubmit={ handleSubmit } method='POST' className="col-md-10 col-lg-7">
                            <div className="form-group">
                                <label htmlFor='firstName' className="form-label">Prénom : </label>
                                <input type='text' name='firstName' id='firstName' className="form-control" onChange={ handleChange} value= { formValues.firstName } /> 
                                <small className="small">{formErrors.firstName}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor='lastName' className="form-label">Nom : </label>
                                <input type='text' name='lastName' id='lastName' className="form-control" onChange={ handleChange} value= { formValues.lastName }  />
                                <small className="small">{formErrors.lastName}</small> 
                            </div>
                            <div className="form-group">
                                <label htmlFor='email' className="form-label">Adresse e-mail : </label>
                                <input type='text' name='email' id='email' className="form-control" onChange={ handleChange} value= { formValues.email } /> 
                                <small className="small">{formErrors.email}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor='password' className="form-label"> Mot de passe : </label>
                                <input type="password" name='password' id='password' className="form-control" onChange={ handleChange} value= { formValues.password } /> 
                                <small className="small">{formErrors.password}</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor='verifPassword' className="form-label"> Vérification du mot de passe : </label>
                                <input type="password" name='verifPassword' id='verifPassword' className="form-control" onChange={ handleChange} value= { formValues.verifPassword } /> 
                                <small className="small">{formErrors.verifPassword}</small>
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
