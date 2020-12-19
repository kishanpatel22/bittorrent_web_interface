import React, {useState, useEffect} from 'react'

function TorrentFile({match, location}) {
    const { params: { torrent_id } } = match;
    const [torrent_file, set_torrent_file] = useState([]);
        
    let torrent_file_url = '/bittorrent-api/torrent_file/' + String(torrent_id);
    useEffect(() => {
        fetch(torrent_file_url).then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then(data => console.log(data))
    }, []);

    return (
        <div>
            <p> Hello page will display torrent file information </p>
        </div>
    )
};

export default TorrentFile
