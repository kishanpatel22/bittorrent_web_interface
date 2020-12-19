import React from 'react'
import { ProgressBar } from 'react-bootstrap'

function TorrentFileUploadProgressBar(props) {
    const upload_style = {
        height: '35px',
        width: '55%',
        borderRadius: '5%',
    }
    const  heading_style = {
        color:"white",
        textAlign: "center",
        fontSize: '25px'
    }
    var Header = <h3 style={heading_style}> Click Upload File Button ! </h3>;
    if(props.progress !== 0) {
        Header = <h3 style={heading_style}> Uploading Torrent File ... </h3>;
    } 
    return(
        <div>
            { Header }
            <div style={{ paddingLeft : '30%', paddingBottom: '2%'}}>
                <ProgressBar animated now={props.progress} 
                             label={`${props.progress}% completed`}
                             style={upload_style} />
            </div>
        </div>
    );
}

export default TorrentFileUploadProgressBar;
