from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort
from bittorrent_app.db import get_db

bp = Blueprint('bittorrent_app', __name__)

@bp.route('/')
def index():
    return render_template('index.html', token='Hello react')

