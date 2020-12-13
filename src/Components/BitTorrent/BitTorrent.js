import  React from 'react'
import About from '../Info/About'
import BitTorrentForm from './BitTorrentForm'

function BitTorrent() {
    const header_style = {
        color:"white",
        textAlign: "center",
        fontSize: '50px'
    };
    return (
        <div className="BitTorrent">
            <h1 style={header_style}> KP-BitTorrent Client Web Interface </h1>
            <About />
            <BitTorrentForm />
        </div>
    );
}

export default BitTorrent;
