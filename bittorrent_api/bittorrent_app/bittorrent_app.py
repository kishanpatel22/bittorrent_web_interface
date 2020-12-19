from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, current_app
)

import os
import base64

from werkzeug.exceptions import abort
from bittorrent_app.db import get_db

from bittorrent.client import *

bp = Blueprint('bittorrent_app', __name__)

@bp.route('/bittorrent-api/')
def index():
    db = get_db()
    return {'message':'hello world', 'name' : 'kishan patel'}


@bp.route('/bittorrent-api/torrent_file_reader', methods=['POST'])
def torrent_file_reader():
    torrent_file = request.files['file']
    dir_file_path = current_app.config['TORRENT_FILE_FOLDER']
    torrent_file_path = os.path.join(dir_file_path, torrent_file.filename)
    torrent_file.save(torrent_file_path)
    
    download_dir_path = current_app.config['TORRENT_DOWNLOAD_DIR_PATH']
    kp_client = bittorrent_client({TORRENT_FILE_PATH : torrent_file_path,
                                   DOWNLOAD_DIR_PATH : download_dir_path})
    
    return kp_client.torrent_file_data()


@bp.route('/bittorrent-api/torrent_file/<int:torrent_id>', methods=['GET'])
def torrent_file(torrent_id):
    return {'message' : 'Get request !'}


