import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {CheckUserLS, getData, apiURL} from '../page-tools'
import teama from "../teama.jpg"

export const Home = () => {
    let userArr = CheckUserLS(useNavigate()) //Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau]
    return(
        <>
        <h1>Welkom op de stock </h1>
        <img src={teama} width={300} alt="foto van team a" />
        <p>Dit project werdt gemaakt door team-A (<a href="https://github.com/SampersS">SampersS</a>, <a href="https://github.com/Rwill03">Rwill03</a>, <a href="https://github.com/andresdeklerck2023">andresdeklerck2023</a>)</p>
        </>
    )
}