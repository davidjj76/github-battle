import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

const SelectLanguage = ({
  languages,
  selectedLanguage,
  onSelect 
}) => (
  <ul className="languages">
    {languages.map(lang => (
      <li
        style={lang === selectedLanguage 
          ? { color: '#d0021b'} 
          : null}
        onClick={onSelect.bind(null, lang)}
        key={lang}>
        {lang}
      </li>
    ))}
  </ul>
);

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

const RepoGrid = ({
  repos
}) => (
  <ul className="popular-list">
    {repos.map((repo, index) => (
      <li
        className="popular-item"
        key={repo.name}>
        <div className="popular-rank">#{index + 1}</div>
        <ul className="space-list-items">
          <li>
            <img 
              className="avatar"
              src={repo.owner.avatar_url}
              alt={`Avatar for ${repo.owner.login}`} />
          </li>
          <li>
            <a href={repo.html_url}>
              {repo.name}
            </a>
          </li>
          <li>@{repo.owner.login}</li>
          <li>{repo.stargazers_count} stars</li>
        </ul>
      </li>
    ))}
  </ul>
);

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'],
      selectedLanguage: 'All',
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null
    }));

    api.fetchPopularRepos(lang)
      .then(repos => this.setState(() => ({ repos })));
  }

  render() {
    const { repos, ...rest } = this.state;
    return (
      <div>
        <SelectLanguage 
          {...rest}
          onSelect={this.updateLanguage}
        />
        {repos
          ? <RepoGrid repos={repos} />
          : <p>Loading...</p>
        }
      </div>
    )
  }

}

export default Popular;
