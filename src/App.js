import React, {useState, useEffect} from 'react'
import BitTorrent from './BitTorrent'

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
    
    /* returns JSX  */
    return(
        <div style={app_styles}>
            <BitTorrent /> 
            <p> {bittorrent} </p>
        </div>
    );
}
export default App

