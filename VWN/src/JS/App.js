import React, { Component } from 'react'
import ActionFilterIcon from '../components/FilterIcon'
import '../CSS/App.css'
import Data from './Data.json'
import OrgContainer from './OrgContainer.js'
import TagsComponent from './TagsComponent.js'
import AddForm from './AddFormsteper.js'
import Observable from './Observable'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Admin from './Admin.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import ActionHome from 'material-ui/svg-icons/action/home';
import Loading from './Loading';
import ErrorPage from './ErrorPage';

const loginIcon = <FontIcon className="material-icons">Login</FontIcon>;
const addIcon = <FontIcon className="material-icons">Add</FontIcon>
const homeIcon = <ActionHome />;
const FilterIcon = <ActionFilterIcon />;



class App extends Component {
  constructor(props) {
    super(props);
    this.serverLink = 'http://localhost:8080/';
    // State
    this.state = {
      tags: {},
      orgs: Data.orgs,
      svgPs: Data.svgPs,
      selectedIndex: 0,
      showFilters: false,
      status: 0// for the status of the server request 
    };
    Observable.getCurrentHashFilters() // to get the filters if exist in the first URL 
    window.onhashchange = (e) => {// for every change in the Hash URL will reflect on the output
      Observable.getCurrentHashFilters()
      Observable.notify('tagSelection')
      Observable.notify('regionSelection')
    };

  }
  componentDidMount = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('Get', `${this.serverLink}search`, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState({
            tags: JSON.parse(xhr.response).tags,
            orgs: JSON.parse(xhr.response).orgs,
            svgPs: JSON.parse(xhr.response).regions
          })
          // this.tags = JSON.parse(xhr.response).tags;
          // this.orgs = JSON.parse(xhr.response).orgs;

        }
        this.setState({
          status: xhr.status
        });
      }
    };
    xhr.send();
  }

  render = () => {
    if (this.state.status === 0) {
      return <Loading />;
    }
    if (this.state.status === 401 || this.state.status === 404 || this.state.status === 500) {
      return <ErrorPage status={this.state.status} />;
    }
    else {
      return (

        <MuiThemeProvider >
          <Router><div className='route'>
            <Route path='/admin' render={(props) =>
              <div className="App">
                <Paper style={{ width: '100%', position: 'sticky', top: '0px', zIndex: '3' }}>
                  <BottomNavigationItem
                    label="Home"
                    icon={homeIcon}
                    onClick={() => {
                      const path = Observable.getlastHash()
                      props.history.push(`/${path}`)
                    }}
                  />
                </Paper>
                <Admin
                  serverLink={this.serverLink}
                  adminEmail={this.adminEmail}
                /></div>} />
            <Route className='route' exact path='/' render={(props) =>
              <div className="App">
                <Paper style={{ width: '100%', position: 'sticky', top: '0px', zIndex: '3' }}>
                  <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                      label="Organization"
                      icon={addIcon}
                      onClick={() => {
                        Observable.saveCurrentHash()
                        props.history.push('/add')
                      }
                      }
                    />
                    <BottomNavigationItem
                      label="As Admin"
                      icon={loginIcon}
                      onClick={() => {
                        Observable.saveCurrentHash()
                        props.history.push('/admin')
                      }}
                    />
                    <BottomNavigationItem
                      label={this.state.showFilters ? 'Hide Filters' : 'Show Filters'}
                      icon={FilterIcon}
                      onClick={() => {
                        this.setState({
                          showFilters: !this.state.showFilters
                        })
                      }}
                    />
                  </BottomNavigation>
                </Paper>
                <div style={{ display: `${this.state.showFilters ? 'block' : 'none'}` }}>
                  <TagsComponent tags={this.state.tags} svgPs={this.state.svgPs} />
                </div>
                <OrgContainer tags={this.state.tags} orgs={this.state.orgs} svg={this.state.svgPs} />
              </div>
            } />
            <Route className='route' path='/add' render={(props) =>
              <div className="App">
                <Paper style={{ width: '100%', position: 'sticky', top: '0px', zIndex: '3' }}>
                  <BottomNavigationItem
                    label="Home"
                    icon={homeIcon}
                    onClick={() => {
                      const path = Observable.getlastHash()
                      props.history.push(`/${path}`)
                    }}
                  />
                </Paper>
                <AddForm name="myAddForm" svgPs={this.state.svgPs} serverLink={this.serverLink} />
              </div>
            } />
            {/*<div className="App">
            <AddForm name="myAddForm" svgPs={this.state.svgPs} />
            <TagsComponent tags={this.state.tags} svgPs={this.state.svgPs} />
            <OrgContainer tags={this.state.tags} orgs={this.state.orgs} svg={this.state.svgPs} />
          </div>*/}

          </div></Router>
        </MuiThemeProvider>
      );
    }
  }
}

export default App;
