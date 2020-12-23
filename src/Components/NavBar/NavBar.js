import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function NavBar(props) {
    let torrent_id = props.torrent_id;
    let nav_bar_id = props.nav_bar_id;

    /* defining all the links required for the nav bar */
    const torrent_file_link         = '/torrent_file/'
    const torrent_file_data_link    = '/torrent_file/' + String(torrent_id);
    const tracker_data_link         = torrent_file_data_link + '/tracker_data';
    const swarm_data_link           = torrent_file_data_link + '/swarm_data';
    const activity_data_link        = torrent_file_data_link + '/activity_data';
        
    /* styles for all the links will be common*/
    var torrent_file_style        = "outline-info" 
    var torrent_file_data_style   = "outline-info" 
    var tracker_data_style        = "outline-info"
    var swarm_data_style          = "outline-info" 
    var activity_data_style       = "outline-info" 
    
    if(nav_bar_id === 1) {
        torrent_file_style        = "info" 
    } else if(nav_bar_id === 2) {
        torrent_file_data_style   = "info" 
    } else if(nav_bar_id === 3) {
        tracker_data_style        = "info"
    } else if(nav_bar_id === 4) {
        swarm_data_style          = "info" 
    } else if(nav_bar_id === 5) {
        activity_data_style       = "info" 
    }
    
    /* style for the divs */
    const div_style = {
        paddingTop:'1%',
        paddingLeft:'5%',
        paddingBottom:'1%',
        display: 'inline-block'
    }

    return (
        <div>
            <div style={div_style}>
                <Link to={torrent_file_link}>
                    <Button variant={torrent_file_style}>
                        <h4> Torrent Files </h4>
                    </Button>{' '}
                </Link>
            </div>

            <div style={div_style}>
                <Link to={torrent_file_data_link}>
                    <Button variant={torrent_file_data_style}>
                        <h4> Torrent File Data </h4>
                    </Button>{' '}
                </Link>
            </div>

            <div style={div_style}>
                <Link to={tracker_data_link}>
                    <Button variant={tracker_data_style}>
                        <h4> Tracker Data </h4>
                    </Button>{' '}
                </Link>
            </div>

            <div style={div_style}>
                <Link to={swarm_data_link}>
                    <Button variant={swarm_data_style}>
                        <h4> Swarm Data </h4>
                    </Button>{' '}
                </Link>
            </div>

            <div style={div_style}>
                <Link to={activity_data_link}>
                    <Button variant={activity_data_style}>
                        <h4> Activity Logs </h4>
                    </Button>{' '}
                </Link>
            </div>
        </div>
    )
}
export default NavBar;


