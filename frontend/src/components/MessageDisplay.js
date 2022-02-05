import React from "react";

function MessageDisplay({ title, user, image_url, description, created_at }){
    return(
        <div className="col-12 col-md-8" >
            <div className="card mt-4 mb-5">
                <div className="card-title h5">{title}</div>
                <div className="card-subtitle">{user} <small className="text-muted">{created_at}</small></div>
                <div className="card-text">{description}</div>
                <img src={image_url} alt={title} className="card-img-bottom"/>
            </div>
        </div>
    )
};

export default MessageDisplay;