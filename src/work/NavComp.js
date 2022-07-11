import React, { useState, useEffect } from 'react';  
import '../nav.scss'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBars, faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons'; 

function NavComp(props) { 

    const navigate = useNavigate();

    //useState 
    const [searchValue, setSearchValue] = useState(""); 
    const [finalValue, setFinalValue] = useState(""); 

    const [searchErrorVisible, setSearchErrorVisible] = useState(false); 

    const [showNavBool, setShowNavBool] = useState(false); 

    //window size 
  const size = useWindowSize();

  function useWindowSize() {
      const [windowSize, setWindowSize] = useState({
          width: undefined,
          height: undefined,
      });
      
      useEffect(() => {
          // Handler to call on window resize
          function handleResize() {
          // Set window width/height to state
          setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
          });
          }

          // Add event listener
          window.addEventListener("resize", handleResize);
          
          // Call handler right away so state gets updated with initial window size
          handleResize();
          
          // Remove event listener on cleanup
          return () => window.removeEventListener("resize", handleResize);
      }, []); // Empty array ensures that effect is only run on mount
      
      return windowSize;
  }

    //functions 
    const changeSearch = e => {
        e.preventDefault(); 

        setSearchValue(e.target.value); 
    }; 

    const submitSearch = e => {
        e.preventDefault(); 

        setFinalValue(searchValue.trim()); 

        var removeAscii = searchValue.replace(/[^a-zA-Z ]/g, ""); 

        if (removeAscii.trim() === "") {
            setSearchErrorVisible(true); 
            //console.log("not navigating because ASCII chars were found"); 
        }

        else if (finalValue.trim() === "" && searchValue.trim() === "") {
            setSearchErrorVisible(true); 
            //console.log("not navigating because no input value was taken"); 
        } 

        else {
            var str = searchValue; 
            //remove any ASCII char 
            str = str.replace(/[^a-zA-Z ]/g, ""); 

            //remove "/" value 
            str = Array.from(new Set(str.split('/'))).toString(); 

            navigate("/around-world/search/" + str); 
        }
    }; 

    const handleNavOpen = () => {
        setShowNavBool(true); 
    }; 

    const handleNavClose = () => {
        setShowNavBool(false); 
    }; 

    const goToHomePage = () => {
        navigate("/around-world"); 
    }

    if (showNavBool) {
        document.body.style.overflowY = "hidden"; 
    } 

    else {
        document.body.style.overflowY = "scroll"; 
    }

    return (
        <nav> 
            {
                size.width <= 1024 ? 

                <div id="mobile-nav-container" style={{display: showNavBool ? 'flex' : 'none'}}>
                    <div className="background" onClick={handleNavClose}></div> 
                    <div id="nav-x" onClick={handleNavClose}>
                        <FontAwesomeIcon icon={faX} style={{width: '25x', height: '25px'}} /> 
                    </div>
                    <div className="mobile-nav">
                        <form onChange={changeSearch} onSubmit={submitSearch}>
                            <button onClick={submitSearch}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} color="white" /> 
                            </button>
                            <input placeholder='Search Location' /> 
                            <div className="input-error" style={{opacity: searchErrorVisible ? 1 : 0}}>Invalid Search Value</div>
                        </form>
                        <div className="link-container"> 
                            <Link id="nav-link" to="/around-world">Home</Link>
                            <Link id="nav-link" to={"/around-world/search/" + null}>Search</Link> 
                            <a id="nav-link" rel="noreferrer" target="_blank" href="https://en.wikipedia.org/wiki/Main_Page">More</a>
                        </div>
                    </div>
                </div> 

                : 

                null 
            }

            <div className="nav-center"> 

                <div className="nav-left">
                    <img alt="" onClick={goToHomePage} src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/944/7467977944_58e02453-ae77-490c-a9ad-8737fb5ed08a.png?cb=1655510403" /> 
                    {
                        props.pageProp === 'home' ? 

                        <Link className="nav-page-link disabled" to="/around-world/">Home</Link> 
                        
                        : 
                        
                        <Link className="nav-page-link" to="/around-world/">Home</Link>
                    }
                    {
                        props.pageProp === 'search' ? 

                        <Link className="nav-page-link disabled" to={"/around-world/search" + null}>Search</Link> 

                        : 

                        <Link className="nav-page-link" to={"/around-world/search/" + null}>Search</Link>
                    }

                    <a className="nav-page-link" rel="noreferrer" target="_blank" href="https://en.wikipedia.org/wiki/Main_Page">More</a>
                </div> 

                <form className="nav-right" onChange={changeSearch} onSubmit={submitSearch}>
                    <button onClick={submitSearch} style={{display: props.pageProp === 'search' ? 'none' : ''}}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" /> 
                    </button>
                    <input placeholder='Search Location' style={{display: props.pageProp === 'search' ? 'none' : ''}} /> 
                    <div className="input-error" style={{opacity: searchErrorVisible ? 1 : 0}}>Invalid Search Value</div>
                    <FontAwesomeIcon id="hamburger" icon={faBars} onClick={handleNavOpen} /> 
                </form>

            </div>
        </nav>
    )
}

export default NavComp
