import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar.js'

function ActivityData({match, location}) {
    const { params: { torrent_id } } = match
    const [torrent_file, set_torrent_file] = useState([])
    let activity_data= null;

    let torrent_file_url = '/bittorrent-api/torrent_file/' + String(torrent_id) + '/activity_data';
    useEffect(() => {
        fetch(torrent_file_url).then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then((data) => {
            console.log(data);
        })
    }, []);

    return (
        <div>
            <NavBar torrent_id={torrent_id} nav_bar_id={5}/>
        </div>
    )
};

export default ActivityData
