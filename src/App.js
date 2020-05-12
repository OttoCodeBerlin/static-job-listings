import React from 'react'
import './App.css'
import data from './data/data.json'
import deleteImg from './images/icon-remove.svg'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { data, clicked: false, filterList: [] }
    this.addFilter = this.addFilter.bind(this)
    this.clearFilter = this.clearFilter.bind(this)
    this.removeFilter = this.removeFilter.bind(this)
  }

  addFilter = (e, el) => {
    e.preventDefault()
    this.setState((prevState) => ({ filterList: [...prevState.filterList, el], clicked: true }))

    console.log(this.state)
  }

  removeFilter = (e, el) => {
    e.preventDefault()
    this.state.filterList.length === 1
      ? this.setState((prevState) => ({
          filterList: prevState.filterList.filter((item) => item !== el),
          clicked: false,
        }))
      : this.setState((prevState) => ({ filterList: prevState.filterList.filter((item) => item !== el) }))
  }

  clearFilter = (e) => {
    e.preventDefault()
    this.setState({ clicked: false, filterList: [] })
  }

  render() {
    console.log(this.state)
    return (
      <div className="background-container background-mobile">
        <div className="visible-container">
          <div className={'container-box filter ' + (this.state.clicked ? 'display' : 'display-none')}>
            <div className="filter-col">
              <div className="listbox-filter">
                {this.state.filterList.map((el, index) => (
                  <div className="filter-list">
                    <div className="list-boxes-filter-left" key={index}>
                      {el}
                    </div>
                    <div className="list-boxes-filter-right" key={index}>
                      <img
                        className="delete-img"
                        src={deleteImg}
                        alt="delete"
                        onClick={(e) => this.removeFilter(e, el)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>{' '}
            <div className="clear-col">
              <p className="clear" onClick={(e) => this.clearFilter(e)}>
                Clear
              </p>
            </div>
          </div>

          {this.state.data.map((item, index) => (
            <div key={index}>
              <img className="logos" src={`${item.logo}`} alt="company logo" />{' '}
              <div className={item.featured ? 'container-box card-featured' : 'container-box card-standard'}>
                <div className="firstline">
                  <p className="company">{item.company}</p> {item.new && <p className="new-tag">NEW!</p>}{' '}
                  {item.featured && <p className="featured-tag">FEATURED</p>}
                </div>
                <p className="jobtitle">{item.position}</p>
                <div>
                  <p className="thirdline-text">
                    {item.postedAt} <span className="bolder">·</span> {item.contract} <span className="bolder">·</span>{' '}
                    {item.location}
                  </p>
                </div>
                <hr />
                <div className="listbox-container">
                  <div className="list-boxes" onClick={(e) => this.addFilter(e, item.role)}>
                    {item.role}
                  </div>
                  <div className="list-boxes" onClick={(e) => this.addFilter(e, item.level)}>
                    {item.level}
                  </div>
                  {item.languages &&
                    item.languages.map((el, index) => (
                      <div className="list-boxes" key={index} onClick={(e) => this.addFilter(e, el)}>
                        {el}
                      </div>
                    ))}
                  {item.tools &&
                    item.tools.map((el, index) => (
                      <div className="list-boxes" key={index} onClick={(e) => this.addFilter(e, el)}>
                        {el}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}

          <div className="attribution">
            Challenge by{' '}
            <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">
              Frontend Mentor
            </a>
            . Coded by <a href="https://github.com/OttoCodeBerlin">OttoCodeBerlin</a>.
          </div>
        </div>
      </div>
    )
  }
}

export default App
