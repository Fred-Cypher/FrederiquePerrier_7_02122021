import React, { useEffect, useState } from "react";
import HeaderMessages from "../components/HeaderMessages";
import axios from "axios";
//import MessageDisplay from "../components/MessageDisplay";
//import Commentary from "./Commentaries";


const Messages = () => {
    const [messages, setMessages] = useState([]);

    //const token = localStorage.getItem('userToken');
    /*let fetchMessage = {
        method: 'GET',
        headers: {
            'Accept': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }*/

    useEffect(() => {
        /*fetch('http://localhost:5500/api/messages', fetchMessage)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))*/
            axios.get('http://localhost:5500/api/messages')
                .then(response => setMessages(response.data))
                .catch(error => { 
                    console.log(error)
                });
    }, []);
    
    if(!messages) return null;


    return(
        <div>
            <HeaderMessages />
            <div className="m-4">Affichage des images  <br /> </div>
            {/*<ul {messages.map(message =>
                <li key={message.id}>
                    <MessageDisplay 
                        title={title}
                        description={description}
                        user={user}
                        image_url={image_url}/>
            </li>)}/>*/}
        </div>
        )

};


export default Messages;


//map sur data : messages

/*function MessageDisplay({ title, user, image_url, description, created_at }){
    return(
        <li>
            <div>{title}</div>
            <div>{description}</div>
            <div>{user} <span>{created_at}</span></div>
            <img src={image_url} alt={title} />
        </li>

    )
}; */
