import React, { useState } from "react";
import HeaderMessages from "./HeaderMessages";

function NewMessage(){
    const [formSubmit, setFormSubmit] = useState(false)
    const [title, setTitle] = useState('');
    const [description, setDescription] =  useState('');
    const [picture, setPicture] = useState('');

    console.log('title ', title)
    console.log('description ', description)
    console.log('picture ', picture)


    const handleSubmit = (e) =>{
        e.preventDefault();

        if (title && description && picture){
            const userId = localStorage.getItem('userId')

            const message = {
                title: title,
                user_id: userId,
                description: description,
                image_url: picture
            }

            console.log('message ', message)

            const token = localStorage.getItem('userToken');

            console.log('token 1 ', token)

            const fetchMessage = {
                method: 'POST',
                body: JSON.stringify(message),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
            
            console.log('fecth 1 ', fetchMessage)

            fetch('http://localhost:5500/api/messages', fetchMessage)
                .then(response => response.json())
                .then(data => {
                    console.log('titre : ', message.title)
                    console.log('userID: ', message.user_id)
                    console.log('description : ', message.description)
                    console.log('image : ', message.image_url)
                    console.log(fetchMessage)
                    console.log(token)
                    setFormSubmit(true)
                }) 
                .catch((err) => { 
                    console.log(err);
                    e.preventDefault();
                });
        }
    }


    return(
        <>
        { formSubmit? (
            <>
                <HeaderMessages/>
                <div>Votre message a bien été enregistré</div>
            </>
        ) : (
            <>
                <HeaderMessages/>
                <div>Enregistrer un nouveau message</div>

                <form action='' onSubmit={ handleSubmit } method='POST' className="col-md-10 col-lg-7 m-4">
                    <div className="form-group">
                        <label htmlFor='title' className="form-label">Titre : </label>
                        <input type='text' name='title' id='title' className="form-control"  onChange={(e) => setTitle(e.target.value)} value = { title } /> 
                    </div>
                    <div className="form-group">
                        <label htmlFor='description' className="form-label">Description : </label>
                        <small className="form-text"> Limité à 100 caractères</small>
                        <input type='text' name='description' id='description' maxLength={100} className="form-control" onChange={(e) => setDescription(e.target.value)} value = { description } />
                    </div>
                    <div className="form-group">
                        <label htmlFor='picture' className="form-label">Image : </label>
                        <small className="form-text"> Seul les formats .gif, .png et .jpg sont autorisés</small>
                        <input type='file' name='picture' accept=".jpg, .jpeg, .png, .gif" id='picture' className="form-control" onChange={(e) => setPicture(e.target.files[0])} value = { picture } /> 
                    </div>
                    <div className="row flex-row">
                        <div className="d-flex justify-content-center col-6">
                            <button type='submit' className="btn mt-3 rounded border">Enregistrer</button>
                        </div>
                    </div>
                </form>
            </>
        )}
        </>
    )
};

export default NewMessage;

// Trouver comment mettre l'input file en élément non-contrôlé 