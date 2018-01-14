import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import OrgContainer from './OrgContainer.js'
import '../CSS/AdminPanel.css';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

export default class AdminPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      tags: this.props.tags,
      ActiveOrgs: this.props.response.activeOrgs,
      PendingOrgs: this.props.response.pendingOrgs,
      svgPs: this.props.response.regions,
      serverLink: this.props.serverLink,
      myToken:this.props.response.myToken
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render = () => {
    return (
      <div className="adminTabs">
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Active Organizations" value={0} />
          <Tab label="Pending Organizations" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <OrgContainer myToken={this.state.myToken} tags={this.state.tags} orgs={this.state.ActiveOrgs} svg={this.state.svgPs} isAdmin={true} serverLink={this.state.serverLink} />
          </div>
          <div style={styles.slide}>
            <OrgContainer myToken={this.state.myToken} tags={this.state.tags} orgs={this.state.PendingOrgs} svg={this.state.svgPs} isAdmin={true} serverLink={this.state.serverLink} isPending={true}/>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}