import  React from 'react'
import About from './About'

function BitTorrent() {
    /* styling for the Bittorrent */
    const header_style = {
        color:"white",
        textAlign: "center",
        fontSize: '50px'
    };
    const form_style = {
        display: 'block',
        textAlign: 'center'
    };
     const button_style = {
        padding: '10px 20px',
        marginLeft: '20%',
        border: 'none',
        borderRadius: '10px',
        background: '#92C100',
        color: 'white',
        fontSize: '25px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: '.3s background',
        '&:hover': {
          background: '#40a9ff'
        }
    };
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
    };
    const input_style = {
    	width: '0.1px',
	    height:' 0.1px',
	    opacity: '0',
	    overflow: 'hidden',
	    position: 'absolute',
    }
    /* logic for download button */
    const button_event_mouse_over = (button_react) => {
        var label_input =  document.getElementById('file').value
        var button_dom = document.getElementsByTagName('button')[0];
        if(label_input.length === 0) {
            button_dom.style.background = "red";
        } else {
            button_dom.style.background = "#92C100";
        }
    };
    const button_event_mouse_out = (button_react) => {
        var label_input =  document.getElementById('file').value
        var button_dom = document.getElementsByTagName('button')[0];
        if(label_input.length === 0) {
            button_dom.style.background = "#92C100";
        } else {
            button_dom.style.background = "#288001";
        }
    }

    return (
        <div className="BitTorrent">
            <h1 style={header_style}> KP-BitTorrent Client Web Interface </h1>
            <About />
            <div style={form_style}>
                <form action="" method="POST" id="file-input" enctype="multipart/form-data">
                    <input style={input_style} id="file" type="file" name="file"
                           accept=".torrent" required />
                    <label style={label_style} for="file">Select file</label>
                    <button style={button_style} onMouseOver={button_event_mouse_over} 
                            onMouseOut={button_event_mouse_out} type="submit"> 
                        Download Torrent File 
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BitTorrent;
