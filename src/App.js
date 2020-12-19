import React, {useState, useEffect} from 'react'
import BitTorrent from './Components/BitTorrent/BitTorrent'
import TorrentFile from './Components/TorrentFile/TorrentFile'
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
        margin      : '2%'
    }
    
    /* returns JSX  */
    return(
        <Router>
            <div style={app_styles}>
                <Route exact path="/" component={BitTorrent} />
                <Route exact path="/torrent_file/:torrent_id" component={TorrentFile} />
            </div>
        </Router>
    );
}
export default App

