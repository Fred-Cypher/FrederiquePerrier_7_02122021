import React, { useEffect, useState } from "react";
import HeaderMessages from "../components/HeaderMessages";
import axios from "axios";
//import MessageDisplay from "../components/MessageDisplay";
//import Commentary from "./Commentaries";

const Messages = () => {
    const [messages, setMessages] = useState([]);

    /*useEffect(() => {
        const fetchData = async () => {
            try{
                const result = await axios.get('http://localhost:5500/api/messages',);
                setMessages(result.data)
                console.log('updated')
            }
            catch(error){ 
                console.log(error)
            }
            
        };
        fetchData();  
        console.log('mounted')
    }, []);*/

    useEffect(() => {
        axios.get('http://localhost:5500/api/messages')
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
            <div className="m-4">Affichage des images  <br /> </div>
            {messagesData.map((message) =>
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
            )}
        </>
        )
};

export default Messages;


//map sur data : messages