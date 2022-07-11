import React from 'react'; 

function FooterComp({ dotPropCallback, leftCallback, rightCallback, currentPage }) { 

    //function 
    const sendOne = () => { 
        dotPropCallback(1); 
    }; 

    const sendTwo = () => {
        dotPropCallback(2); 
    }; 

    const sendThree = () => {
        dotPropCallback(3); 
    }; 

    const sendFour = () => {
        dotPropCallback(4); 
    }; 

    const sendFive = () => {
        dotPropCallback(5); 
    }; 

    const sendLeftArrow = () => {
        leftCallback('left');  
    }; 

    const sendRightArrow = () => {
        rightCallback('right'); 
    }; 

    return (
        <footer>
            <div className="left-footer">
                <img alt="" src={process.env.PUBLIC_URL + "/arrow.png"} onClick={sendLeftArrow} />
            </div>
            <div className="middle-footer">
                <div className={currentPage === 1 ? 'focus-dot' : 'unfocus-dot'} onClick={sendOne}></div>
                <div className={currentPage === 2 ? 'focus-dot' : 'unfocus-dot'} onClick={sendTwo}></div>
                <div className={currentPage === 3 ? 'focus-dot' : 'unfocus-dot'} onClick={sendThree}></div>
                <div className={currentPage === 4 ? 'focus-dot' : 'unfocus-dot'} onClick={sendFour}></div>
                <div className={currentPage === 5 ? 'focus-dot' : 'unfocus-dot'} onClick={sendFive}></div>
            </div>
            <div className="right-footer">
                <img alt="" src={process.env.PUBLIC_URL + "/arrow.png"} onClick={sendRightArrow} />
            </div>
        </footer>
    )
}

export default FooterComp
