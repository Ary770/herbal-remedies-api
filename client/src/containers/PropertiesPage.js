import React from 'react';
import { connect } from 'react-redux';
import PropertiesList from './PropertiesList';
import HerbShow from './HerbShow';
// import Alert from '../components/Alert'
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/properties';
import ReactLoading from 'react-loading';

class PropertiesPage extends React.Component {

  componentDidMount() {
    this.props.actions.fetchProperties();
  }

  handleSearch = (event) => {
    const propInput = event.target.value
    this.props.actions.searchProperty(propInput)
  }

  fetchHerbsHandler = (event, propId) => {
    event.preventDefault();
    this.props.history.replace('/properties')
    this.props.actions.fetchPropertyHerbs(propId)
  }

  render() {
    const target = this.props.target;

    return (
      <div className="row">
        <div className="col-lg-6">
          <h3>Properties</h3>
          <input
            type="text"
            className="form-control"
            onChange={(event) => this.handleSearch(event)}
            placeholder="Search for..."
            />
          <br></br>
          { target.length !== 0 ?
            <PropertiesList
              fetchHerbsHandler={this.fetchHerbsHandler}
              url={this.props.match.url}
              properties={target}/>
            :
            <div>
              <ReactLoading type='bubbles' color='#047800'/>
              <p className='text-muted flicker-animation'>Preparing Herbal Remedies...</p>
            </div>
          }
          <Route path={`${this.props.match.url}/herbs/:herbId`} component={HerbShow}></Route>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    target: state.properties.target,
    error: state.herbs.error
  })
}

const mapDispatchToProps = (dispatch) => {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesPage)
