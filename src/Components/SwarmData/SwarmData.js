import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar.js'
import { Fade, Spinner } from 'react-bootstrap'

const div_style = {
    width : '240px', 
    height: '225px', 
    backgroundColor: '#C5EBF0', 
    marginLeft: '4%',
    marginTop: '2%',
    marginBottom: '2%',
    border: '5px solid black',
    display: 'inline-block',
}
const peer_style = {
    fontSize: '18px', 
    color: '#03515B',
    fontWeight: 'bold'
}


class SwarmData extends React.Component {
    constructor(props) {
        super(props);
        let torrent_id = this.props.match.params.torrent_id
        this.state = { torrent_id: torrent_id, data:{}, loading:true, status : false};
        this.getSwarmData = this.getSwarmData.bind(this)
        this.dynamic_swarm_data = this.dynamic_swarm_data.bind(this)
        this.interval_id = null
    }

    componentDidMount() {
        this.getSwarmData()
        this.interval_id = setInterval(this.dynamic_swarm_data, 3000);
    }
    
    getSwarmData() {
        let tracker_url = '/bittorrent-api/torrent_file/'+String(this.state.torrent_id)+'/swarm_data';
        fetch(tracker_url).then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then((data) => {
            if(data !== undefined) {
                if(data.swarm_data.length !== 0) {
                    this.setState({data: data})
                    this.setState({loading: false})
                }
                if(data.swarm_status) {
                    this.setState({status: true})
                    clearInterval(this.interval_id)
                } 
            }
        })
    }
  
    dynamic_swarm_data() {
        console.log(this.state.status)
        if(!this.state.status) {
            console.log('Trying')
            this.getSwarmData() 
        } else {
            console.log('Not Trying')
        }
    }

    render() {
        if(this.state.loading) {
            return (
                <div>
                    <NavBar torrent_id={this.state.torrent_id} nav_bar_id={4}  />
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
                    <NavBar torrent_id={this.state.torrent_id} nav_bar_id={4}  />
                    {this.state.data.swarm_data.map((swarm_data, index) => (
                        <Fade in={true}>
                            <div style={div_style}>
                                <div style={{textAlign:'left', paddingLeft: '2%'}}>
                                    <p>
                                        <span style={peer_style}> 
                                            Peer Index :
                                        </span>
                                        <span> {index + 1} </span>
                                    </p> 
                                    <p> 
                                        <span style={peer_style}> 
                                            IP address :
                                        </span>
                                        <span> {swarm_data.peer_ip}  </span>
                                    </p>
                                    <p> 
                                        <span style={peer_style}> 
                                            PORT :
                                        </span>
                                        <span> {swarm_data.peer_port} </span>
                                    </p>
                                    <p> 
                                        <span style={peer_style}> 
                                            Pieces Downloaded :
                                        </span>
                                        <span> {swarm_data.num_downloaded_pieces} </span>
                                    </p>
                                     <p> 
                                        <span style={peer_style}> 
                                            Download Rate :
                                        </span>
                                        <span> {swarm_data.download_rate} KBps </span>
                                    </p>
                                </div>
                            </div>
                        </Fade>
                    ))}
                </div>
            )
        }
    }
}

export default SwarmData

