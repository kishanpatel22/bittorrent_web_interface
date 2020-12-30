import React, {useState, useEffect} from 'react'
import BitTorrent from './Components/BitTorrent/BitTorrent'
import TorrentFileData from './Components/TorrentFileData/TorrentFileData'
import TrackerData from './Components/TrackerData/TrackerData'
import SwarmData from './Components/SwarmData/SwarmData'
import ActivityData from './Components/ActivityData/ActivityData'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

/* We can write functions for creating HTML components
 * fuctions returns the HTML in form of JSX which will be rendered
 * logic to the component is written before the return statement
 */

/* functions can actually returns HTML code */
function App() {
    /* logic part of the app component */
    const app_styles = {
        backgroundColor : '#000F23', 
    }
    
    /* returns JSX  */
    return(
        <Router>
            <div style={app_styles}>
                <Route exact path="/" component={BitTorrent} />
                <Route exact path="/torrent_file/:torrent_id" 
                       component={TorrentFileData} />
                <Route exact path="/torrent_file/:torrent_id/tracker_data" 
                       component={TrackerData} />
                <Route exact path="/torrent_file/:torrent_id/swarm_data"    
                       component={SwarmData} />
                <Route exact path="/torrent_file/:torrent_id/activity_data" 
                       component={ActivityData} />
            </div>
        </Router>
    );
}
export default App

