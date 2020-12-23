import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
import FileInfo from './FileInfo'
import DownloadingStatus from './DownloadingStatus'

function TorrentFileData({match, location}) {
    const { params: { torrent_id } } = match
    const [state, setState] = useState([])

    let torrent_file_url = '/bittorrent-api/torrent_file/' + String(torrent_id);
    useEffect(() => {
        fetch(torrent_file_url).then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then((data) => {
            let new_state = [...state, data]
            setState(new_state);
        })
    }, []);

    return (
        <div>
            <NavBar torrent_id={torrent_id} nav_bar_id={2}/>
            <FileInfo torrent_file_data={state}/>
            <DownloadingStatus torrent_data="bye world" />
        </div>
    )
};

export default TorrentFileData
