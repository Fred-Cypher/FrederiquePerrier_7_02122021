import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMessages from "../components/HeaderMessages";

function NewMessage(){
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] =  useState('');
    const [picture, setPicture] = useState(null);

    console.log('title ', title)
    console.log('description ', description)
    console.log('picture ', picture)


    const handleSubmit = (e) =>{
        e.preventDefault();

        if (title && description && picture){
            const userId = localStorage.getItem('userId')

            let message = {
                title: title,
                user_id: userId,
                description: description,
                image_url: picture.name
            }

            console.log('message ', message)

            const token = localStorage.getItem('userToken');

            console.log('token 1 ', token)

            let fetchMessage = {
                method: 'POST',
                body: JSON.stringify(message),
                headers: {
                    'Accept': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            }
            
            console.log('fecth 1 ', fetchMessage)

            fetch('http://localhost:5500/api/messages', fetchMessage)
                .then(response => response.json())
                .then(() => {
                    console.log('titre : ', message.title)
                    console.log('userID: ', message.user_id)
                    console.log('description : ', message.description)
                    console.log('image : ', picture.name)
                    console.log('fetchmessage then :', fetchMessage)
                    console.log(token) 
                    navigate("/messages")
                    //alert('')
                    
                }) 
                .catch((err) => { 
                    console.log(err);
                });
        }
    }


    return(
        <>
            <HeaderMessages/>
            <div className="d-flex flex-column pb-3 pt-3 m-md-3 d-flex align-items-center">
                <div className="h3">Enregistrer un nouveau message : </div>
                    <form action='' onSubmit={ handleSubmit } method='POST' className="col-11 col-md-10 col-lg-7 m-4">
                        <div className="form-group mt-3">
                            <label htmlFor='title' className="form-label">Titre : </label>
                            <input type='text' name='title' id='title' className="form-control"  onChange={(e) => setTitle(e.target.value)} value = { title } /> 
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor='description' className="form-label">Description : </label>
                            <small className="form-text"> Limité à 100 caractères</small>
                            <input type='text' name='description' id='description' maxLength={100} className="form-control" onChange={(e) => setDescription(e.target.value)} value = { description } />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor='picture' className="form-label">Image : </label>
                            <small className="form-text"> Seul les formats .gif, .png et .jpg sont autorisés</small>
                            <input type='file' name='picture' accept=".jpg, .jpeg, .png, .gif" id='picture' className="form-control" onChange={(e) => setPicture(e.target.files[0])}  /> 
                        </div>
                        <div className="row flex-row mt-3">
                            <div className="d-flex justify-content-center">
                                <button type='submit' className="btn mt-3 rounded border">Enregistrer</button>
                            </div>
                        </div>
                    </form>
                </div>
        </>
    )
};


export default NewMessage;

// Trouver comment mettre l'input file en élément non-contrôlé 