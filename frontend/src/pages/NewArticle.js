import React, { useState} from "react";
import HeaderMessages from "../components/HeaderMessages";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewArticle = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');

    console.log('titre : ', title);
    console.log('résumé : ', summary);
    console.log('article : ', content);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(title && summary && content){
            const userId = parseInt(localStorage.getItem('userId'));

            console.log('user id : ', userId)

            const article = {
                title: title,
                summary: summary,
                content: content,
                user_id: userId
            }

            console.log('article : ', article);

            axios.put('http://localhost:5500/api/articles', article)
                .then(function (response) {
                    console.log('response : ', response);
                })
                .then(() => {
                    navigate("/messages")
                })
                .catch((err) =>{
                    console.log(err)
                });
        }
    }

    return(
        <>
            <HeaderMessages/>
            <div className="d-flex flex-column d-flex align-items-center">
                <div className="card pb-3 pt-3 col-md-8 d-flex align-items-center">
                    <div className="m-3 h3 text-center">Enregistrer un nouvel article : </div>
                    <form action='' onSubmit={ handleSubmit } method='POST' className="col-11 col-md-10 col-lg-7">
                        <div className="form-group mt-3">
                            <label htmlFor='title' className="form-label" >Titre : </label>
                            <input type='text' name='title' id='title' className="form-control" onChange={(e) => setTitle(e.target.value)} value = { title } /> 
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor='summary' className="form-label">Résumé : </label>
                            <small className="form-text"> Résumé limité à 250 caractères</small>
                            <input type='text' name='summary' id='summary' maxLength={250} className="form-control" onChange={(e) => setSummary(e.target.value)} value = { summary }/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor='content' className="form-label">Article : </label>
                            <small className="form-text"> Limité à 2000 caractères</small>
                            <textarea type='text' name='content' id='content' maxLength={2000} className="form-control" placeholder="Entrez le texte de votre article..." onChange={(e) => setContent(e.target.value)} value = { content }/> 
                        </div>
                        <div className="row flex-row mt-3">
                            <div className="d-flex justify-content-center">
                                <button type='submit' className="btn mt-3 rounded border">Enregistrer l'article</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default NewArticle;
