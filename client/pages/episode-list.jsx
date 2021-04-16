import React from 'react';
import EpisodeDetails from './episode-details';
import LogModal from './log-modal';

class EpisodeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { episode: null, logModalOpen: false, episodeToLog: null };
    this.episodeInfo = this.episodeInfo.bind(this);
    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.openLogModal = this.openLogModal.bind(this);
    this.toggleLogModal = this.toggleLogModal.bind(this);
    this.episodeToLog = this.episodeToLog.bind(this);
  }


  render() {
    const filteredEpisodes = this.props.show.filter(episode => episode.image !== null);
    const listResults = filteredEpisodes.map(episode =>
      <div className="episodes-list" key={episode.id} id={episode.id}>
        <img className="episodes-list-image" src={episode.image.medium} alt={episode.image.name} />
        <ul className="episode-title" value={episode.name} onClick={this.episodeInfo}>S{episode.season}E{episode.number} {episode.name}</ul>
        <ul className="episode-date" value={episode.airdate}> {episode.airdate} </ul>
        <div className="list-button-container">
          <button onClick={this.openLogModal} show={this.props.showName} name={episode.name} season={episode.season} number={episode.number}
            image={episode.image.original}>Log</button>
          <button show={this.props.show.name} name={episode.name} season={episode.season} number={episode.number} image={episode.image.medium} onClick={this.addToWatchlist}>Need to Watch</button>
        </div>
      </div>
    );
    if (this.state.logModalOpen === true) {
      return <div>
        <LogModal toggleModal={this.toggleLogModal} showName={this.state.episodeToLog.showName} season={this.state.episodeToLog.season}
          number={this.state.episodeToLog.number} name={this.state.episodeToLog.name} saveToLog={this.props.saveToLog} image={this.state.episodeToLog.image} />

        <h1 className="episodes-list-header header-text">Episode List</h1>
        <ul className="list-results"> {listResults} </ul>
      </div>;

    } else if (this.state.episode !== null) {
      return < EpisodeDetails episode={this.state.episode} watchlist={this.props.watchlist} addToWatchlist={this.props.addToWatchlist}
        menu={this.props.menu} menuOpen={this.props.menuOpen} openWatchlist={this.props.openWatchlist} isWatchlistOpen={this.props.isWatchlistOpen}
        goHome={this.props.goHome} saveToLog={this.props.saveToLog} />;
    } else {
      return <div>
        <h1 className="episodes-list-header header-text">Episode List</h1>
        <ul className="list-results"> {listResults} </ul>
      </div>;
    }
  }

  episodeInfo(event) {
    const episodeId = event.target.parentElement.getAttribute('id');
    fetch('https://api.tvmaze.com/episodes/' + episodeId + '?embed=show')
      .then(response => response.json())
      .then(result => {
        this.setState({ episode: result });
      });
  }

  addToWatchlist(event) {
    event.preventDefault();
    const show = this.props.showName;
    const episodeName = event.target.getAttribute('name');
    const season = event.target.getAttribute('season');
    const number = event.target.getAttribute('number');
    const image = event.target.getAttribute('image');
    const episode = {
      show: show,
      episodeName: episodeName,
      season: season,
      number: number,
      image: image
    };
    this.props.addToWatchlist(episode);
  }

  openLogModal(event) {
    this.setState({ logModalOpen: true });
    const showName = event.target.getAttribute('show');
    const episodeName = event.target.getAttribute('name');
    const season = event.target.getAttribute('season');
    const number = event.target.getAttribute('number');
    const image = event.target.getAttribute('image');
    const episode = {
      showName: showName,
      season: season,
      number: number,
      name: episodeName,
      image: image
    };
    this.setState({ episodeToLog: episode });
  }

  toggleLogModal() {
    if (this.state.logModalOpen === true) {
      this.setState({ logModalOpen: false });
    } else {
      this.setState({ logModalOpen: true });
    }
  }

  episodeToLog() {
    const episodeId = event.target.parentElement.getAttribute('id');
    fetch('https://api.tvmaze.com/episodes/' + episodeId + '?embed=show')
      .then(response => response.json())
      .then(result => {
        this.setState({ episode: result });
      });
  }
}

export default EpisodeList;
