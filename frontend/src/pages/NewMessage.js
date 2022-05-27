import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMessages from "../components/HeaderMessages";
import axios from "axios";

function NewMessage(){
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] =  useState('');
    const [picture, setPicture] = useState('');

    console.log('title ', title)
    console.log('description ', description)
    console.log('picture ', picture)


    const handleSubmit = (e) =>{
        e.preventDefault();

        if (title && description && picture){
            const userId = parseInt(localStorage.getItem('userId'));

            const message = {
                title: title,
                user_id: userId,
                description: description,
                image_url: picture
            }

            const token = localStorage.getItem('userToken'); 

            const options = {
                headers: {
                    'Accept': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            }

            axios.put('http://localhost:5500/api/messages', message, options)
                .then(function (response) {
                    console.log('response : ', response);
                })
                .then(() => {
                    navigate("/messages")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }


    return(
        <>
            <HeaderMessages />
            <div className="d-flex flex-column d-flex align-items-center">
                <div className="card pb-3 pt-3 col-md-8 d-flex align-items-center">
                    <div className="m-3 h3 text-center">Enregistrer un nouveau message : </div>
                    <form action='' onSubmit={ handleSubmit } method='POST' className="col-11 col-md-10 col-lg-7">
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
                            <small className="form-text"> Enregistrez le lien vers l'image souhaitée</small>
                            <input type='text' name='picture' id='picture' className="form-control" onChange={(e) => setPicture(e.target.value)} value={ picture } /> 
                        </div>
                        {/* Pour récupérer une image dans l'ordinateur
                        <div className="form-group mt-3">
                            <label htmlFor='picture' className="form-label">Image : </label>
                            <small className="form-text"> Seul les formats .gif, .png et .jpg sont autorisés</small>
                            <input type='file' name='picture' accept=".jpg, .jpeg, .png, .gif" id='picture' className="form-control" onChange={(e) => setPicture(e.target.files[0])}  /> 
                        </div>*/}
                        <div className="row flex-row mt-3">
                            <div className="d-flex justify-content-center">
                                <button type='submit' className="btn mt-3 rounded border">Enregistrer</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default NewMessage;