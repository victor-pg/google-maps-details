import React from "react";
import {useState} from "react";
import {Item2} from "./Item2";

const API_KEY_NEW = "AIzaSyCjxVeoQ667XqIBaNmpMJwkGmFRNP4ix_g";

export const Select2 = () => {
    const [opened, setOpened] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [current, setCurrent] = useState(undefined);

    const get = async (input, callback) => {
        await fetch(`https://places.googleapis.com/v1/places:autocomplete?key=${API_KEY_NEW}`, {
            method: "POST", body: JSON.stringify({input})
        }).then(r => {
            return r.json();
        }).then(r => callback(r.suggestions));
    }

    const handleSearch = async (e) => {
        const value = e.target.value;

        if (!value) {
            return;
        }

        await get(value, setSuggestions);
    }

    const getDetails = async ({placeId}, callback)=> {
        await fetch(`https://places.googleapis.com/v1/places/${placeId}?key=${API_KEY_NEW}`, {
            headers:{
                "X-Goog-FieldMask":" *"
            }
        }).then(r => {
            return r.json();
        }).then(r => {console.log("v2: ", r);
            callback(r);
        });
    }

        return <div>
        <h1>V2</h1>
        <input type="text" onClick={() => setOpened(true)} onChange={handleSearch}/>
        {(opened && suggestions?.length) ? <div className="list">
            {suggestions.map((p,index) => (
                <div key={index} className="yyy" onClick={() => getDetails(p.placePrediction, setCurrent)}>types: {JSON.stringify(p.placePrediction?.types)}   - {p.placePrediction?.text?.text ?? "DOES NOT EXIST"}</div>
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
                <Item2 {...current}/>
            ) : null}
    </div>
}