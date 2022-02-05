import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderMessages from "../components/HeaderMessages";

const DeleteAccount = () => {
    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.preventDefault();
        
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('userToken');

        const options = {
            headers: {
                'Accept': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        }

        axios.delete('http://localhost:5500/api/users/'+ userId, options)
            .then(function (response){
                console.log(response)
                localStorage.clear();
                alert('Le compte a bien été supprimé')
                navigate('/');
            })
    }

    return(
        <div>
            <HeaderMessages/>
            <div className="card pb-3 pt-3 m-5 col-8 d-flex align-items-center border-danger">
            <div className="mt-3 mb-4 h3 text-center">Suppression du compte</div>
            <div className="mt-3 mb-4 h4 text-center text-danger">Attention, la suppression du compte est définitive</div>
            <div className="row flex-row justify-content-center mt-3">
                <div className="d-flex align-items-center justify-content-center col-10">
                    <button onClick={ handleDelete } className="btn mt-3 rounded border-danger">Supprimer mon compte </button>
                </div>
            </div>
        </div>
        </div>
    )
};

export default DeleteAccount;