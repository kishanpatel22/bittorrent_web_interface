import React from 'react'

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
    }

    form_request(event) {
        event.preventDefault();
        fetch('/api/torrent_file', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "file": this.state.file
            })
        }).then((response) => {
            if(response.ok) {
                console.log(response)
            }
        })
    }

    render() {
      return (
        <form onSubmit={this.form_request} style={form_style}>

            <input style={input_style} id="file" type="file" name="file" accept=".torrent" 
                          onChange={this.torrent_file_input} 
                          value={this.setState.file} required />

            <label style={label_style} for="file"> Select file </label>

            <button style={this.state.button_style}
                    onMouseOver={this.button_event_mouse_over} 
                    onMouseOut={this.button_event_mouse_out} type="submit"> 
                Download Torrent File 
            </button>
        </form>
      );
    }
}

export default BittorrentForm;

