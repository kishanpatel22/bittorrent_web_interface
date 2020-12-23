import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar.js'
import { Table } from 'react-bootstrap'

class TrackerData extends React.Component {
    constructor(props) {
        super(props);
        let torrent_id = this.props.match.params.torrent_id
        this.state = { torrent_id: torrent_id, data:{}, loading:true};
        this.getTrackerData = this.getTrackerData.bind(this)
    }

    componentDidMount() {
        this.getTrackerData();
    }
    
    getTrackerData() {
        let tracker_url = '/bittorrent-api/torrent_file/'+String(this.state.torrent_id)+'/tracker_data';
        fetch(tracker_url).then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then((data) => {
            this.setState({data: data});
            this.setState({loading: false});
            console.log(this.state.data.tracker_data[0])
        })
    }
    
    render() {
        if(this.state.loading) {
            return (
                <div>
                    <p> Still loading the page ! </p>
                </div>
            )
        } else {
            return(
                <div>
                    <NavBar torrent_id={this.state.torrent_id} nav_bar_id={3}  />
                    <div style={{padding: '1%', width: '80%', margin: 'auto'}}> 
                        <div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Tracker URL</th>
                                        <th>Connection Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.data.tracker_data.map((tracker_data, index) => (
                                    <tr>
                                        <td>{tracker_data.tracker_url}</td>
                                        <td>{tracker_data.connection_status}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default TrackerData;



