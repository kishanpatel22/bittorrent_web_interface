import React, {useState, useEffect} from 'react'
import BitTorrent from './Compenents/BitTorrent/BitTorrent'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

/* We can write functions for creating HTML components
 * fuctions returns the HTML in form of JSX which will be rendered
 * logic to the component is written before the return statement
 */


/* functions can actually returns HTML code */
function App() {
    /* logic part of the app component */
    const app_styles = {
        background  : '#000F23', 
        width       : '95%',
        margin      : 'auto'
    }
    const [bittorrent, set_bittorrent] = useState([])
    useEffect(() => {
        fetch('/api').then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then(data => console.log(data))
    }, []);

    /* returns JSX  */
    return(
        <div style={app_styles}>
            <BitTorrent /> 
        </div>
    );
}
export default App

