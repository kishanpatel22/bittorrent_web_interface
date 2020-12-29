DROP TABLE IF EXISTS torrent;
DROP TABLE IF EXISTS torrent_file_data;
DROP TABLE IF EXISTS tracker_list;
DROP TABLE IF EXISTS swarm;
DROP TABLE IF EXISTS torrent_activity;

CREATE TABLE torrent (
    torrent_id INTEGER PRIMARY KEY AUTOINCREMENT,
    torrent_file_name TEXT UNIQUE,
    download_percentage REAL default 0.0
);

CREATE TABLE torrent_file_data (
    torrent_id INTEGER PRIMARY KEY,
    tracker_list TEXT,
    file_name TEXT,
    file_size REAL,
    piece_length INTEGER,
    info_hash TEXT,
    files INTEGER default 0,
    num_pieces INTEGER,
    client_peer_id TEXT,
    FOREIGN KEY (torrent_id) REFERENCES torrent (torrent_id) ON DELETE CASCADE
);

CREATE TABLE tracker_list (
    torrent_id INTEGER,
    tracker_url TEXT,
    connection_status TEXT,
    FOREIGN KEY (torrent_id) REFERENCES torrent (torrent_id) ON DELETE CASCADE
);

CREATE TABLE swarm (
    torrent_id INTEGER,
    peer_ip TEXT,
    peer_port INTEGER,
    num_downloaded_pieces INTEGER default 0 check(num_downloaded_pieces >= 0),
    download_rate REAL default 0.0,
    PRIMARY KEY (torrent_id, peer_ip, peer_port),
    FOREIGN KEY (torrent_id) REFERENCES torrent (torrent_id) ON DELETE CASCADE
);


CREATE TABLE torrent_activity (
    torrent_id INTEGER,
    peer_ip TEXT,
    peer_port INTEGER,
    piece_downloaded INTEGER
    download_rate REAL,
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (torrent_id) REFERENCES torrent (torrent_id) ON DELETE CASCADE
);

