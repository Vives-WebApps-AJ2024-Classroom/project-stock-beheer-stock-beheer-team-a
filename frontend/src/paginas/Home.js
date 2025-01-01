import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { CheckUserLS } from '../page-tools';
import teama from "../teama.jpg";
import "../styles/stylesHome.css"; // Ensure to import the CSS file

export const Home = () => {
    const navigatie = useNavigate()
    const role = localStorage.getItem('role'); // Haal de rol op uit localStorage
    
    useEffect(() => {
      /*  if (role !== '0' && role !== ) {
            navigatie("/geenToegang");
        }*/



    }, [role, navigatie]); 

    return (
        <div className="home-container">
            <h1>Welkom op de stock</h1>
            <img src={teama} width={300} alt="foto van team a" />
            <p>
                Dit project werdt gemaakt door team-A (
                <a href="https://github.com/SampersS">SampersS</a>, 
                <a href="https://github.com/Rwill03">Rwill03</a>, 
                <a href="https://github.com/andresdeklerck2023">andresdeklerck2023</a>)
            </p>
        </div>
    );
}