import React from 'react'

function FileInfo(props) {
    let data = props.torrent_file_data;
    console.log(props)
    return (
        <div>
            <p>Hello world</p>
            <p>{data}</p>
        </div>
    )
}


export default FileInfo;
