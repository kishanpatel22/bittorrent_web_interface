import React, {useState, useEffect} from 'react'
import About from '../Info/About'
import BitTorrentForm from './BitTorrentForm'

function BitTorrent() {
    const header_style = {
        color:"white",
        textAlign: "center",
        fontSize: '50px'
    };
    /* This will be the route to the first page on website */
    const [bittorrent, set_bittorrent] = useState([]);
    useEffect(() => {
        fetch('/bittorrent-api/').then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then(data => console.log(data))
    }, []);
 
    return (
        <div className="BitTorrent">
            <h1 style={header_style}> KP-BitTorrent Client Web Interface </h1>
            <About />
            <BitTorrentForm />
        </div>
    );
}

export default BitTorrent;
