import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar.js'
import { Table, Spinner, Button } from 'react-bootstrap'
import { AnimateOnChange } from 'react-animation'

class TrackerData extends React.Component {
    constructor(props) {
        super(props);
        let torrent_id = this.props.match.params.torrent_id
        this.interval_id = null
        this.state = {torrent_id: torrent_id, data:{}, loading:true, status:false}
        this.getTrackerData = this.getTrackerData.bind(this)
        this.dynamic_tracker_data = this.dynamic_tracker_data.bind(this)
    }

    componentDidMount() {
        this.getTrackerData()
        this.interval_id = setInterval(this.dynamic_tracker_data, 4000);
    }
    
    getTrackerData() {
        let tracker_url = '/bittorrent-api/torrent_file/'+String(this.state.torrent_id)+'/tracker_data';
        fetch(tracker_url).then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then((data) => {
            if(data !== undefined) {
                if(data.tracker_data.length !== 0) {
                    this.setState({data: data});
                    this.setState({loading: false})
                } 
                if(data.tracker_status) {
                    this.setState({status: true})
                    clearInterval(this.interval_id)
                } 
            }
        })
    }
    
    dynamic_tracker_data() {
        if(!this.state.status) {
            console.log('Trying')
            this.getTrackerData() 
        } else {
            console.log('Not trying')
        }
    }

    render() {
        var tracker_status = <span></span>;
        if(!this.state.status) {
            tracker_status = <div style={{ marginLeft: '45%' }}>
                                <Spinner animation="grow" variant="info" /> 
                                <Spinner animation="grow" variant="info" /> 
                                <Spinner animation="grow" variant="info" /> 
                            </div>;
        } 

        if(this.state.loading) {
            return (
                <div>
                    <NavBar torrent_id={this.state.torrent_id} nav_bar_id={3}  />
                    <div style={{ marginLeft: '45%' }}>
                        <Spinner animation="grow" variant="info" /> 
                        <Spinner animation="grow" variant="info" /> 
                        <Spinner animation="grow" variant="info" /> 
                    </div>
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
                        {tracker_status} 
                    </div>
                </div>
            )
        }
    }
}

export default TrackerData;



