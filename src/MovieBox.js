import {Modal} from "react-bootstrap";
import React, {useState} from "react";
import './App.css';

const MovieBox =({movie, handelResentlyWatched})=>{

    const[show, setShow]=useState(false);

    const handleShow=()=>setShow(true);
    const handleCLose=()=>setShow(false);

    return(
        <div className="w w-50">
        <div className="card text-center bg-secondary mb-3" key={movie.id}>
            <div className="card-body">
             <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${movie?movie.poster_path:""}`} alt="movieImg"/>
             <div className="card-body">
                <div onClick={() => handelResentlyWatched(movie)}><button type="button" className="btn btn-dark" onClick={handleShow}>View More</button></div>
                <Modal show={show} onHide={handleCLose}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <img className="card-img-top" style={{width:'14rem'}} src={`https://image.tmdb.org/t/p/w500/${movie?movie.poster_path:""}`} alt="movieImg"/>
                    <h3>{movie?movie.orginal_title:""}</h3>
                    <h4>ImDb: {movie?movie.vote_average:""}<i className="fad fa-star"/></h4>
                    <h5>release Date: {movie?movie.release_date:""}</h5>
                    <br></br>
                    <h6>overview</h6>
                    <p>{movie?movie.overview:""}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" onClick={handleCLose}>Close</button>
                    </Modal.Footer>
                </Modal>
             </div>
            </div>
        </div>
        </div>
    )
}

export default MovieBox;