import React from "react";
import HeaderMessages from "./HeaderMessages";
//import Commentary from "./Commentaries";
//import MessageDisplay from "./MessageDisplay";


const Messages = () => {
    //const [messages, setMessages] = useState([]);

    const token = localStorage.getItem('userToken');
    let fetchMessage = {
        method: 'GET',
        headers: {
            'Accept': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }

    fetch('http://localhost:5500/api/messages', fetchMessage)
        .then(response => console.log(response))
        



    return(
        <div>
            <HeaderMessages />
            <div className="m-4">Affichage des images  <br /> </div>
            
        </div>
        )

}


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
