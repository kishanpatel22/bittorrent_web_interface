from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, current_app
)
from werkzeug.exceptions import abort
from bittorrent_app.db import get_db

from flask_socketio import emit, ConnectionRefusedError, disconnect

from .web_sockets import IOBlueprint

ws = IOBlueprint('events', __name__)



