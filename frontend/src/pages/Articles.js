//import React, { useState} from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import HeaderMessages from "../components/HeaderMessages";


const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5500/api/articles')
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
            <div className="m-4">Ici seront affichés les articles <br /> </div>
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
                </div>
        </div>
        )

}

export default Articles;


// Page à finir