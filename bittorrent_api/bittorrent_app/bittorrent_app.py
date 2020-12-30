from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, current_app
)
from threading import *
import os
import base64
from werkzeug.exceptions import abort
from bittorrent_app.db import get_db
from bittorrent.client import *

bp = Blueprint('bittorrent_app', __name__)

# For multiple downloads the data structure used is queue
kp_bittorrent_clients = []

@bp.route('/bittorrent-api/')
def index():
    return {'message':'hello world', 'name' : 'kishan patel'}

# stores the torrent file on sever side 
@bp.route('/bittorrent-api/torrent_file_reader', methods=['POST'])
def torrent_file_reader():
    
    # extract the file from the request and store on server side
    torrent_file = request.files['file']
    dir_file_path = current_app.config['TORRENT_FILE_FOLDER']
    torrent_file_path = os.path.join(dir_file_path, torrent_file.filename)
    torrent_file.save(torrent_file_path)
    # defualt place for downloading the file 
    download_dir_path = current_app.config['TORRENT_DOWNLOAD_DIR_PATH']
    
    # record the torrent file data in database 
    db = get_db()
    db.execute('insert into torrent (torrent_file_name) values (?)',
              (torrent_file.filename, ))
    db.commit()
    
    # extract the torrent id 
    torrent_id = db.execute(""" 
                                select seq from sqlite_sequence where name='torrent'
                            """).fetchone()[0]
    
    # creating bittorrent client object 
    kp_client = bittorrent_client({TORRENT_FILE_PATH : torrent_file_path,
                                   DOWNLOAD_DIR_PATH : download_dir_path,
                                   TORRENT_ID        : torrent_id})
    
    kp_client_thread = Thread(target=kp_client.start_downloading)
    kp_client_thread.start()

    kp_bittorrent_clients.append(kp_client)
    
    # return the unqiue id of the torrent file
    return {'torrent_id' : torrent_id}


# gets the information about all the torrent files are being downloaded
@bp.route('/bittorrent-api/torrent_file', methods=['POST'])
def torrent_file(torrent_id):
    return {'torrent_file': 'It will contain all information about all torrent files' }


# gets the torrent file data for the pariticular torrent id
@bp.route('/bittorrent-api/torrent_file/<int:torrent_id>', methods=['GET'])
def torrent_file_data(torrent_id):
    db = get_db()
    torrent_data = db.execute("""
                                select * from torrent where 
                                torrent_id = ?
                              """, (torrent_id, )).fetchone()
    
    torrent_file_data = db.execute("""
                                        select * from torrent_file_data where 
                                        torrent_id = ?
                                   """, (torrent_id, )).fetchone()

    return {'torrent_data' : dict(torrent_data), 'torrent_file_data' : dict(torrent_file_data) }


# gets the tracker information for the pariticular torrent id
@bp.route('/bittorrent-api/torrent_file/<int:torrent_id>/tracker_data', methods=['GET'])
def tracker_data(torrent_id):
    db = get_db()
    torrent_tracker_data = db.execute("""
                                        select * from tracker_list where 
                                        torrent_id = ?
                                      """, (torrent_id, )).fetchall()
    
    tracker_status = db.execute("""
                                    select tracker_status from torrent where
                                    torrent_id = ?
                               """, (torrent_id, )).fetchone()[0]
    return {'tracker_data' : [dict(tracker_data) for tracker_data in torrent_tracker_data],
            'tracker_status' : tracker_status }


# gets the swarm information for the pariticular torrent id
@bp.route('/bittorrent-api/torrent_file/<int:torrent_id>/swarm_data', methods=['GET'])
def swarm_data(torrent_id):
    db = get_db()
    torrent_swarm_data = db.execute("""
                                        select * from swarm where 
                                        torrent_id = ? order by download_rate desc 
                                    """, (torrent_id, )).fetchall()
        
    swarm_status = db.execute("""
                                select swarm_status from torrent where
                                torrent_id = ?
                              """, (torrent_id, )).fetchone()[0]


    return {'swarm_data' : [dict(swarm_data) for swarm_data in torrent_swarm_data],
            'swarm_status' : swarm_status}

# gets the activity logs for the pariticular torrent id
@bp.route('/bittorrent-api/torrent_file/<int:torrent_id>/activity_data', methods=['GET'])
def activity_data(torrent_id):
    return {'activity_data' : 'It will contain all the activity data !'}




