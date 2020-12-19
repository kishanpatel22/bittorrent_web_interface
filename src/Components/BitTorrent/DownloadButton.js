import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';


function DownloadButton(props) {
    const link_style = {
        display: 'inline-block',
        padding: '10px 20px',
        marginLeft: '11%',
        marginBottom: '2%',
    }
    let torrent_link = '/torrent_file/'  + String(props.torrent_id);
    return (
        <div style={link_style}>
            <Link to={torrent_link}>
                <Button variant="outline-success">
                    <h3> Start Downloading File ! </h3>
                </Button>{' '}
            </Link>
        </div>
    );
}
export default DownloadButton;
