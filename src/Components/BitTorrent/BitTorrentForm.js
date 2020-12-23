import React from 'react'
import TorrentFileUploadProgressBar from './TorrentFileUploadProgressBar'
import DownloadButton from './DownloadButton.js'

const form_style = {
    display: 'block',
    textAlign: 'center',
}

const label_style = {
    display: 'inline-block',
    width: '200px',
    textAlign: 'center',
    fontSize: '1.25em',
    fontWeight: '700',
    color: 'white',
    backgroundColor: 'blue',
    borderRadius: '10px',
    cursor: 'pointer',
    lineHeight: 2
}

const input_style = {
    width: '0.1px',
    height:' 0.1px',
    opacity: '0',
    overflow: 'hidden',
    position: 'absolute'
}

class BittorrentForm extends React.Component {
    constructor(props) {
        /* styling for the Bittorrent */
        super(props);
        this.state = {file: '', 
                      upload_status: null,
                      torrent_id: 0,
                      button_style : {
                            padding: '10px 20px',
                            marginLeft: '20%',
                            marginBottom: '2%',
                            border: 'none',
                            borderRadius: '10px',
                            background: '#92C100',
                            color: 'white',
                            fontSize: '25px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }
                     };
                     
        this.torrent_file_input = this.torrent_file_input.bind(this);
        this.form_request = this.form_request.bind(this);

        this.button_event_mouse_over = this.button_event_mouse_over.bind(this);
        this.button_event_mouse_out = this.button_event_mouse_out.bind(this);
    }
    
    /* logic for mouse over download button */
    button_event_mouse_over(event) {
        if(this.state.file.length === 0) {
            this.setState({button_style: {...this.state.button_style, background:'red'}})
        } else {
            this.setState({button_style: {...this.state.button_style, background:'#92C100'}})
        }
    }

    /* logic for mouse out download button */
    button_event_mouse_out(event) {
        if(this.state.file.length === 0) {
            this.setState({button_style: {...this.state.button_style, background:'#92C100'}})
        } else {
            this.setState({button_style: {...this.state.button_style, background:'#288001'}})
        }
    }

    torrent_file_input(event) {
        this.setState({file: event.target.value});
        this.setState({upload_status: 0});
    }

    /* the form request for downloading the torrent file */
    form_request(event) {
        event.preventDefault();
        
        /* extracting the data from the DOM */
        var torrent_request_data = new FormData()
        var torrent_file_data = document.getElementById('file').files[0];
        torrent_request_data.append('file', torrent_file_data) 

        this.setState({upload_status: 20});

        fetch('/bittorrent-api/torrent_file_reader', {
            method: 'POST',
            body: torrent_request_data
        })
        .then((response) => {return response.json()})
        .then((data) => {this.setState({torrent_id : data.torrent_id})})
        
        this.setState({upload_status: 100});
    }

    render() {
        let UploadFileProgress = <span></span>;
        let Button =  <button style={this.state.button_style}
                              onMouseOver={this.button_event_mouse_over} 
                              onMouseOut={this.button_event_mouse_out} type="submit"> 
                              Upload Torrent File 
                      </button>;

        if(this.state.upload_status != null) {
            UploadFileProgress = <TorrentFileUploadProgressBar progress={this.state.upload_status}  />;
        }
        
        if(this.state.upload_status === 100) {
            Button = <DownloadButton torrent_id={this.state.torrent_id} />
        }

        return (
            <form onSubmit={this.form_request} style={form_style}>

                <input style={input_style} id="file" type="file" name="file" accept=".torrent" 
                              onChange={this.torrent_file_input} 
                              value={this.setState.file} required />

                <label style={label_style} for="file"> Select Torrent file </label>
                
                { Button }

                { UploadFileProgress } 

            </form>
        );
    }
}

export default BittorrentForm;


