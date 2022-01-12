//import React, {useState} from "react";
import HeaderMessages from "./HeaderMessages";
//import Commentary from "./Commentaries";
//import MessageDisplay from "./MessageDisplay";


const Messages = () => {
    /*const [message, setMessage] = useState({});
    const token = JSON.parse(localStorage.getItem('userToken'));
    
    const fetchMessage = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer' + token
        }
    }

    fetch('http://localhost:5500/api/messages', fetchMessage)
        .then(response => response.json)
        .then(dataMessage => {
            setMessage(dataMessage);
        }*/

    

return(
    <div>
        <HeaderMessages />
        Coucou <br />
        
    </div>
)

}

export default Messages;