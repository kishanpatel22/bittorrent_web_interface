import sys

# torrent file hander module for reading .torrent files
from bittorrent.torrent_file_handler import torrent_file_reader

# tracker module for making tracker request and recieving peer data
from bittorrent.tracker import torrent_tracker

# torrent module holds all the information about the torrent file
from bittorrent.torrent import *

# swarm module controls the operations over the multiple peers
from bittorrent.swarm import swarm

# share file handler module provides file I/O interface
from bittorrent.shared_file_handler import torrent_shared_file_handler

# torrent logger module for execution logging
from bittorrent.torrent_logger import *

# for database connection
import sqlite3

TORRENT_FILE_PATH = 'torrent_file_path'
DOWNLOAD_DIR_PATH = 'download_directory_path'
TORRENT_ID        = 'torrent_id'

"""
    Torrent client would help interacting with the tracker server and
    download the files from other peers which are participating in sharing
"""

class bittorrent_client():
    """
        initialize the BTP client with torrent file and user arguments 
        reads the torrent file and creates torrent class object
    """
    def __init__(self, user_arguments):
        # the torrent_id for the file to be downloaded
        self.torrent_id = user_arguments[TORRENT_ID]

        # extract the torrent file path 
        torrent_file_path = user_arguments[TORRENT_FILE_PATH]
        
        # bittorrent client logger
        self.bittorrent_logger = torrent_logger('bittorrent', BITTORRENT_LOG_FILE, DEBUG)
        
        self.bittorrent_logger.log('Reading ' + torrent_file_path + ' file ...')

        # read metadata from the torrent torrent file 
        self.torrent_info = torrent_file_reader(torrent_file_path)
        
        # decide whether the user want to download or seed the torrent
        self.client_request = {'seeding' : None,               'downloading': None,
                               'uploading rate' : sys.maxsize,  'downloading rate' : sys.maxsize,
                               'max peers' : 5, 'AWS' : False,
                               'torrent_id' : self.torrent_id}
       
        self.client_request['downloading'] = user_arguments[DOWNLOAD_DIR_PATH]

        # make torrent class instance from torrent data extracted from torrent file
        self.torrent = torrent(self.torrent_info.get_data(), self.client_request)
         
        self.bittorrent_logger.log(str(self.torrent))
        
        db_connection = sqlite3.connect('instance/bittorrent_data.sqlite')
        db = db_connection.cursor()
        
        torrent_file_data = self.torrent.data()
        
        db.execute("""
                        insert into torrent_file_data
                        (torrent_id, tracker_list, file_name, file_size, piece_length, info_hash, 
                        num_pieces, client_peer_id) values (?, ?, ?, ?, ?, ?, ?, ?)
                    """, (self.torrent_id, 
                    torrent_file_data['tracker_list'],
                    torrent_file_data['file_name'], 
                    torrent_file_data['file_size'],
                    torrent_file_data['piece_length'],
                    torrent_file_data['info_hash'],
                    torrent_file_data['num_pieces'],
                    torrent_file_data['client_peer_id']))
        db_connection.commit()
        db_connection.close() 

    """
        functions helps in contacting the trackers requesting for 
        swarm information in which multiple peers are sharing file
    """
    def contact_trackers(self):
        self.bittorrent_logger.log('Connecting to Trackers ...')

        # get list of torrent tracker object from torrent file
        self.trackers_list = torrent_tracker(self.torrent)
        
        # get active tracker object from the list the trackers
        self.active_tracker = self.trackers_list.request_connection()
         
        self.bittorrent_logger.log(str(self.active_tracker))

    """
        function initilizes swarm from the active tracker connection 
        response peer data participating in file sharing
    """
    def initialize_swarm(self):
        self.bittorrent_logger.log('Initializing the swarm of peers ...')
        
        # get the peer data from the recieved from the tracker
        peers_data = self.active_tracker.get_peers_data()
            
        # create swarm instance from the list of peers 
        self.swarm = swarm(peers_data, self.torrent)
    
        db_connection = sqlite3.connect('instance/bittorrent_data.sqlite')
        db = db_connection.cursor()
        
        for peer_ip, peer_port in peers_data['peers']:
            db.execute("""
                            insert into swarm 
                            (torrent_id, peer_ip, peer_port)
                            values (?, ?, ?)
                       """, (self.torrent_id, peer_ip, peer_port))
            db_connection.commit()

        db_connection.close()
        
    """
        function helps in uploading the torrent file that client has 
        downloaded completely, basically the client becomes the seeder
    """
    def seed(self):
        self.bittorrent_logger.log('Client started seeding ... ')
        
        # download file initialization 
        upload_file_path = self.client_request['seeding'] 
        
        # create file handler for downloading data from peers
        file_handler = torrent_shared_file_handler(upload_file_path, self.torrent)
        
        # add the file handler  
        self.swarm.add_shared_file_handler(file_handler)
        
        # start seeding the file 
        self.swarm.seed_file()

    """
        function helps in downloading the torrent file form swarm 
        in which peers are sharing file data
    """
    def download(self):
        # download file initialization 
        download_file_path = self.client_request['downloading'] + self.torrent.torrent_metadata.file_name

        self.bittorrent_logger.log('Initializing the file handler for peers in swarm ... ')

        # create file handler for downloading data from peers
        file_handler = torrent_shared_file_handler(download_file_path, self.torrent)

        # initialize file handler for downloading
        file_handler.initialize_for_download()
        
        # distribute file handler among all peers for reading/writing
        self.swarm.add_shared_file_handler(file_handler)
        
        self.bittorrent_logger.log('Client started downloading (check torrent statistics) ... ')
        
        # lastly download the whole file
        self.swarm.download_file() 

    """
        the event loop that either downloads / uploads a file
    """
    def event_loop(self):
        if self.client_request['downloading'] is not None:
            self.download()
        if self.client_request['seeding'] is not None:
            self.seed()
    
    """
        Web API function call for downloading
    """
    def start_downloading(self):
        # first thing is to contact the trackers        
        self.contact_trackers() 
        # initialize the swam data
        self.initialize_swarm()
        # start downloading
        self.download()


