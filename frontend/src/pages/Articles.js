//import React, { useState} from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import HeaderMessages from "../components/HeaderMessages";


const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('userToken'); 
        const options = {
            headers: {
                'Accept': 'multipart/form-data',
                'Authorization': 'Bearer ' + token}}

        axios.get('http://localhost:5500/api/articles', options)
            .then(response => setArticles(response.data))
            .catch(error => console.log(error))
    }, []);

    if(!articles) return 'Aucun article à afficher';

    console.log('articles : ', articles);

    const articlesData = articles.response;

    console.log('article data : ', articlesData);


    return(
        <div>
            <HeaderMessages />
            <div className="m-4 text-center">Derniers articles <br /> </div>
            <div className="container">
                {/*articlesData.map(article => 
                <div className="d-flex flex-column d-flex align-items-center">
                    <div className="card pb-3 pt-3 mb-3 col-md-8 d-flex align-items-center">
                        <div key={article.id} className="mb-2">
                            <div className="card-body">
                                <div className="card-title h4 mb-2 pb-2">{article.title}</div>
                                <div className="card-subtitle text-secondary mb-2">{article.summary}</div>
                                <div className="card-text">{article.content}</div>
                            </div>
                        </div>
                    </div>
                </div>
                )*/}

                {/***** Article exemple pour pour donner un aperçu de ce que sera la page quand elle sera fonctionnelle ********/}

                <div className="d-flex flex-column d-flex align-items-center">
                    <div className="card pb-3 pt-3 mb-3 col-md-8 d-flex align-items-center">
                        <div className="mb-2">
                            <div className="card-body">
                                <div className="card-title h4 mb-2 pb-2">Arthur Pendragon</div>
                                <div className="card-subtitle text-secondary mb-2">Arthur Pendragon, légendaire roi de Bretagne</div>
                                <div className="card-text">Arthur serait né vers 470/475 et serait originaire du Pays de Galles, 
                                ou de l'ouest de l'Angleterre, mais l'emplacement exact de sa cour, connue sous le nom de Camelot, 
                                reste un mystère. Il aurait repoussé l'invasion des Saxons au début du VIe siècle bien qu'il n'ait 
                                jamais été couronné roi. En effet, la chronique de Nennius (IXe siècle) le désigne comme un dux bellorum 
                                (chef de guerre) combattant « avec les rois bretons » et les textes médiévaux en gallois ne lui donnent 
                                jamais le titre de roi, mais l'appellent amerauder (« empereur »).</div>
                            </div>
                            <div className="card-text text-end text-secondary me-2">Auteur article : Sherlock</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )

}

export default Articles;


// Page à finir