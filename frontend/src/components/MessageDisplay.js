import React from "react";

function MessageDisplay({ title, user, image_url, description, created_at }){
    return(
        <li>
            <div>{title}</div>
            <div>{description}</div>
            <div>{user} <span>{created_at}</span></div>
            <img src={image_url} alt={title} />
        </li>

    )
};

export default MessageDisplay;