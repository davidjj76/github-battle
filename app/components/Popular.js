import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SelectLanguage = ({
  selectedLanguage,
  onSelect 
}) => {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
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
  )    
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang) {
    this.setState(() => ({
      selectedLanguage: lang
    }));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
      </div>
    )
  }

}

export default Popular;
