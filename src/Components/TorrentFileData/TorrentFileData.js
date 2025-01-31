import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
import { Table, Spinner } from 'react-bootstrap'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const data_style = {
    padding : '2%',
    width:'65%',
}
const download_style = {
    width:'33%',
    height:'400px',
    marginTop: '2%',
    backgroundColor: 'white',
}
const div_style = {
    padding: '1%',
    height: '90%',
    display:'flex',
}

class TorrentFileData extends React.Component {
    constructor(props) {
        super(props);
        let torrent_id = this.props.match.params.torrent_id
        this.state = { torrent_id: torrent_id, data:{}, loading:true, status: false};
        this.getTorrentFileData = this.getTorrentFileData.bind(this)
        this.dynamic_torrent_data = this.dynamic_torrent_data.bind(this)
        this.interval_id = null
    }

    componentDidMount() {
        this.getTorrentFileData();
        this.interval_id = setInterval(this.dynamic_torrent_data, 1000);
    }
    
    getTorrentFileData() {
        let torrent_file_url = '/bittorrent-api/torrent_file/' + String(this.state.torrent_id);
        fetch(torrent_file_url).then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then((data) => {
            if(data !== undefined) {
                this.setState({data: data});
                this.setState({loading: false});
                if(this.state.data.torrent_data.swarm_status) {
                    this.setState({status: true});
                    clearInterval(this.interval_id)
                }
            }
        })
    }
    
    dynamic_torrent_data() {
        if(!this.state.status) {
            this.getTorrentFileData()
        } else {
            clearInterval(this.interval_id)
        }
    }

    render() {
        if(this.state.loading) {
            return (
                <div>
                    <NavBar torrent_id={this.state.torrent_id} nav_bar_id={2}  />
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
                    <NavBar torrent_id={this.state.torrent_id} nav_bar_id={2}  />
                    <div style={div_style}> 
                        <div style={data_style}>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Torrent File Data</th>
                                        <th>Data Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Trackers List</td>
                                        <td>{this.state.data.torrent_file_data.tracker_list}</td>
                                    </tr>
                                    <tr>
                                        <td>File Name</td>
                                        <td>{this.state.data.torrent_file_data.file_name}</td>
                                    </tr>
                                    <tr>
                                        <td>File Size</td>
                                        <td>{this.state.data.torrent_file_data.file_size} MB</td>
                                    </tr>
                                    <tr>
                                        <td>Piece Length</td>
                                        <td>{this.state.data.torrent_file_data.piece_length} KB</td>
                                    </tr>
                                    <tr>
                                        <td>Info Hash</td>
                                        <td>{this.state.data.torrent_file_data.info_hash}</td>
                                    </tr>
                                    <tr>
                                        <td>Number of Pieces</td>
                                        <td>{this.state.data.torrent_file_data.num_pieces}</td>
                                    </tr>
                                    <tr>
                                        <td>Client Peer ID</td>
                                        <td>{this.state.data.torrent_file_data.client_peer_id}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div style={download_style}>
                            <h2 style={{color:'blue',textAlign:'center'}}> 
                                File Download Progress 
                            </h2>  
                            <div style={{width:'70%', height:'70%', margin:'auto' }}>
                                <CircularProgressbar 
                                    value={this.state.data.torrent_data.download_percentage} 
                                    text={`${this.state.data.torrent_data.download_percentage}%`} />;
                            </div>
                            <h4 style={{ marginTop: '5%',marginLeft:'2%',color:'blue',textAlign:'left'}}>
                                Expected Time : {this.state.data.torrent_data.download_time}
                            </h4>
                        </div>
                    </div>
                </div>
            )    
        }
    }
}

export default TorrentFileData;
