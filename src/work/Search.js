import React, { useState, useEffect } from 'react'
import NavComp from './NavComp'; 
import '../search.scss'; 
import { locationObj } from './LocationData'; 
import { Link } from 'react-router-dom';  
import { useParams, useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 

function Search() { 

    const { value } = useParams(); 
    const navigate = useNavigate(); 

    //useState 
    const [searchValue, setSearchValue] = useState(""); 

    const [outputSearchValueName, setOutputSearchValueName] = useState([]); 
    const [outputSearchValueImg, setOutputSearchValueImg] = useState([]); 

    const [finalSearchValue, setFinalSearchValue] = useState(""); 

    const [alternateSearchBool, setAlternateSearchBool] = useState(false); 

    const [searchErrorVisible, setSearchErrorVisible] = useState(false); 

    //useEffect 
    useEffect(() => { 
        if (value !== 'null') {
            var locationsName = []; 
            var locationsImg = []; 

            for (var name in locationObj) {
                if ((name.toLowerCase().trim()).includes(value.toLowerCase().trim())) {
                    for (var i = 0; i < locationObj[name].image.length; i++) {
                        locationsName.push(locationObj[name].name[i]); 
                        locationsImg.push(locationObj[name].image[i]); 
                    }
                } 

                for (var j = 0; j < locationObj[name].name.length; j++) {
                    if (((locationObj[name].name[j]).toLowerCase().trim()).includes(value.toLowerCase().trim())) {
                        locationsName.push(locationObj[name].name[j]); 
                        locationsImg.push(locationObj[name].image[j]); 
                    }
                }
            }

            setOutputSearchValueName([...new Set(locationsName)]); 
            setOutputSearchValueImg([...new Set(locationsImg)]); 

            setAlternateSearchBool(true); 

            setFinalSearchValue(searchValue);  
        }
    }, [searchValue, value]); 

    //functions 
    const onChangeSearch = e => {
        e.preventDefault(); 
        setSearchValue(e.target.value); 
    }; 

    const onSubmitSearch = e => { 
        e.preventDefault(); 

        setFinalSearchValue(searchValue.trim()); 

        var removeAscii = searchValue.replace(/[^a-zA-Z ]/g, ""); 
        
        if (removeAscii.trim() === "") {
            setSearchErrorVisible(true); 
            //console.log("not navigating because ASCII chars were found");  
        }

        else if (finalSearchValue.trim() === "" && searchValue.trim() === "") {
            setSearchErrorVisible(true); 
            //console.log("not navigating because no input value was taken");  
        }

        else {
            var title = searchValue; 

            //remove any ASCII char 
            title = title.replace(/[^a-zA-Z ]/g, ""); 

            //remove "/" value 
            title = Array.from(new Set(title.split('/'))).toString(); 

            navigate("/around-world/search/" + title); 
        }
    }; 

    return (
        <div className="search-page">
            <NavComp pageProp='search' />

            <form className="search-input-container" onChange={onChangeSearch} onSubmit={onSubmitSearch}> 
                <button type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} color="white" style={{width: '20px', height: '20px'}} /> 
                </button>
                <input placeholder="Search Location" /> 
                <div className="input-error" style={{opacity: searchErrorVisible ? 1 : 0}}>Invalid Search Value</div>
            </form>

            {
                value !== 'null' ? 

                <h2>Results for '{value}'</h2> 

                : 

                <h2 style={{display: alternateSearchBool ? 'flex' : 'none'}}>Results for '{finalSearchValue}'</h2>
            }
            
            {
                alternateSearchBool ? 

                <div className="search-content">
                    <div className="search-content-grid">
                    {
                        outputSearchValueName.map((x, y) => 
                            <Link to={"/around-world/location/" + x} className="content-img-container" key={x} style={{background: "url(" + outputSearchValueImg[outputSearchValueName.indexOf(x)] + ")"}} id="a">
                                <div className="dark" id="b">
                                    <span id="c">{x}</span>
                                </div>
                            </Link> 
                        )
                    }
                    </div>
                </div>

                : 

                <div className="search-content">
                    <h1>France</h1>

                    <div className="search-content-grid">
                        { 
                            locationObj.France.image.map((x, y) => 
                                <Link to={"/around-world/location/" + locationObj.France.name[locationObj.France.image.indexOf(x)]} className="content-img-container" key={x} style={{background: "url(" + x + ")"}} id="a">
                                    <div className="dark" id="b">
                                        <span id="c">{locationObj.France.name[locationObj.France.image.indexOf(x)]}</span>
                                    </div>
                                </Link>
                            )
                        }
                    </div>

                    <h1>Spain</h1> 

                    <div className="search-content-grid">
                        { 
                            locationObj.Spain.image.map((x, y) => 
                                <Link to={"/around-world/location/" + locationObj.Spain.name[locationObj.Spain.image.indexOf(x)]} className="content-img-container" style={{background: "url(" + x + ")"}} key={x} id="a">
                                    <div className="dark" id="b">
                                        <span id="c">{locationObj.Spain.name[locationObj.Spain.image.indexOf(x)]}</span>
                                    </div>
                                </Link>
                            )
                        }
                    </div>

                    <h1>United States</h1> 

                    <div className="search-content-grid">
                        {
                            locationObj['United States'].image.map((x, y) => 
                                <Link to={"/around-world/location/" + locationObj['United States'].name[locationObj['United States'].image.indexOf(x)]} className="content-img-container" style={{background: "url(" + x + ")"}} key={x} id="a">
                                    <div className="dark" id="b">
                                        <span id="c">{locationObj['United States'].name[locationObj['United States'].image.indexOf(x)]}</span>
                                    </div>
                                </Link>
                            )
                        }
                    </div>

                    <h1>China</h1> 

                    <div className="search-content-grid">
                        {
                            locationObj.China.image.map((x, y) => 
                                <Link to={"/around-world/location/" + locationObj.China.name[locationObj.China.image.indexOf(x)]} className="content-img-container" style={{background: "url(" + x + ")"}} key={x} id="a">
                                    <div className="dark" id="b">
                                        <span id="c">{locationObj.China.name[locationObj.China.image.indexOf(x)]}</span>
                                    </div>
                                </Link>
                            )
                        }
                    </div>

                    <h1>Italy</h1> 

                    <div className="search-content-grid">
                        {
                            locationObj.Italy.image.map((x, y) => 
                                <Link to={"/around-world/location/" + locationObj.Italy.name[locationObj.Italy.image.indexOf(x)]} className="content-img-container" style={{background: "url(" + x + ")"}} key={x} id="a">
                                    <div className="dark" id="b">
                                        <span id="c">{locationObj.Italy.name[locationObj.Italy.image.indexOf(x)]}</span>
                                    </div>
                                </Link>
                            )
                        }
                    </div>

                    <h1>Turkey</h1> 

                    <div className="search-content-grid">
                        {
                            locationObj.Turkey.image.map((x, y) => 
                                <Link to={"/around-world/location/" + locationObj.Turkey.name[locationObj.Turkey.image.indexOf(x)]} className="content-img-container" style={{background: "url(" + x + ")"}} key={x} id="a">
                                    <div className="dark" id="b">
                                        <span id="c">{locationObj.Turkey.name[locationObj.Turkey.image.indexOf(x)]}</span>
                                    </div>
                                </Link>
                            )
                        }
                    </div>

                    <h1>Mexico</h1> 

                    <div className="search-content-grid">
                        {
                            locationObj.Mexico.image.map((x, y) => 
                                <Link to={"/around-world/location/" + locationObj.Mexico.name[locationObj.Mexico.image.indexOf(x)]} className="content-img-container" style={{background: "url(" + x + ")"}} key={x} id="a">
                                    <div className="dark" id="b"> 
                                        <span id="c">{locationObj.Mexico.name[locationObj.Mexico.image.indexOf(x)]}</span>
                                    </div>
                                </Link>
                            )
                        }
                    </div>

                    <h1>Thailand</h1> 

                    <div className="search-content-grid">
                        {
                            locationObj.Thailand.image.map((x, y) => 
                                <Link to={"/around-world/location/" + locationObj.Thailand.name[locationObj.Thailand.image.indexOf(x)]} className="content-img-container" style={{background: "url(" + x + ")"}} key={x} id="a">
                                    <div className="dark" id="b">
                                        <span id="c">{locationObj.Thailand.name[locationObj.Thailand.image.indexOf(x)]}</span>
                                    </div>
                                </Link>
                            )
                        }
                    </div>

                    <h1>Germany</h1> 

                    <div className="search-content-grid">
                        {
                            locationObj.Germany.image.map((x, y) => 
                                <Link to={"/around-world/location/" + locationObj.Germany.name[locationObj.Germany.image.indexOf(x)]} className="content-img-container" style={{background: "url(" + x + ")"}} key={x} id="a">
                                    <div className="dark" id="b">
                                        <span id="c">{locationObj.Germany.name[locationObj.Germany.image.indexOf(x)]}</span>
                                    </div>
                                </Link>
                            )
                        }
                    </div>

                    <h1>United Kingdom</h1> 

                    <div className="search-content-grid">
                        {
                            locationObj['United Kingdom'].image.map((x, y) => 
                                <Link to={"/around-world/location/" + locationObj['United Kingdom'].name[locationObj['United Kingdom'].image.indexOf(x)]} className="content-img-container" style={{background: "url(" + x + ")"}} key={x} id="a">
                                    <div className="dark" id="b">
                                        <span id="c">{locationObj['United Kingdom'].name[locationObj['United Kingdom'].image.indexOf(x)]}</span>
                                    </div> 
                                </Link>
                            )
                        }
                    </div>

                </div>
            }

        </div>
    )
}

export default Search
