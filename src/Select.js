import React, {useEffect} from "react";
import {useState} from "react";
import {Item1} from "./Item1";

export const Select = () => {
    const [opened, setOpened] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const [current, setCurrent] = useState(undefined);

    useEffect(() => {
        loadScript("AIzaSyAuD3T4URXs0Vl4GqWuuDUuMxTqfjbr2g8")
    }, [])

    const handleSearch = async (e) => {
        const value = e.target.value;

        if (!value) {
            setOpened(false);
            setPredictions([]);
            setCurrent(undefined)
        } else {
            if (!opened) {
                setOpened(true);
            }

            const b = new window.google.maps.places.AutocompleteService();

            const predictions = await b.getPlacePredictions({input: e.target.value});

            setPredictions(predictions.predictions);
        }
    }

    const getDetails = async (p)=>{
        const emptyDiv = document.querySelector(".test");
        const detailsService = new window.google.maps.places.PlacesService(emptyDiv);
        await detailsService.getDetails({placeId: p.place_id}, (d)=>{
            console.log("v1: ", d);
            setCurrent(d)
        })
    }


    return <div>
        <div className="test" />
        <h1 >V1</h1>
        <input type="text" onClick={() => setOpened(true)} onChange={handleSearch}/>
        {(opened && predictions.length) ? <div className="list">
            {predictions.map((p,index) => (
                <div key={index} className="yyy"
                     onClick={() => getDetails(p)}>types: {JSON.stringify(p.types)} - {p.description}</div>
            ))}
        </div> : null}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        {current ? (
            <Item1 {...current}/>
        ) : null}
    </div>
}

function loadScript(api_key) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}&loading=async&libraries=places&callback=initMap`

    const body = document.querySelector("body");
    body.appendChild(script)
}