import React from "react";
import HeaderMessages from "../components/HeaderMessages";
import axios from "axios";
import { useEffect, useState } from "react";
//import MessageDisplay from "../components/MessageDisplay";
//import Commentary from "./Commentaries";

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('userToken'); 
        const options = {
            headers: {
                'Accept': 'multipart/form-data',
                'Authorization': 'Bearer ' + token}
        }

        axios.get('http://localhost:5500/api/messages', options)
            .then(response => setMessages(response.data))
            .catch(error => console.log(error))
    }, []);
        
    if(!messages) return 'Rien à afficher';

    console.log('messages : ', messages);

    const messagesData = messages.response;

    console.log('messages data : ', messagesData)

    return(
        <>
            <HeaderMessages />
            <div className="m-4 text-center">Derniers messages<br /> </div>
            {/* Essai pour l'affichage des messages de la BDD, à revoir
            messagesData.map((message) =>
                <div key={message.id} className="d-flex flex-column d-flex align-items-center">
                    <div className="card pb-3 pt-3 mb-3 col-md-8 d-flex align-items-center">
                        <div  className="mb-2">
                            <div className="card-body">
                                <div className="card-title h3 mb-2">{message.title}</div>
                                <div className="card-subtitle mb-1">{message.description}</div>
                                <img src={message.image_url} alt={message.title} className="card-img-bottom img-fluid"></img>
                            </div>
                        </div>
                    </div>
                </div>
            )*/}

            {/***** Message exemple pour donner un aperçu de ce que sera la page quand elle sera fonctionnelle, image libre pour usage commercial  ********/}

            <div className="d-flex flex-column d-flex align-items-center">
                <div className="card pb-3 pt-3 mb-3 col-md-8 d-flex align-items-center">
                    <div  className="mb-2">
                        <div className="card-body">
                            <div className="card-title h3 mb-2">Escalade</div>
                            <div className="card-subtitle mb-1">J'y arriverai, j'y arriverai ! </div>
                            <img src="https://cdn.pixabay.com/photo/2018/08/31/15/44/kitten-3644941_960_720.jpg" alt="Chaton escaladant l'accoudoir d'un fauteuil en osier" className="card-img-bottom img-fluid"></img>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Messages;