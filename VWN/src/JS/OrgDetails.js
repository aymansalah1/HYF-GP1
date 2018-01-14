import React, { Component } from 'react';
import '../CSS/OrgDetails.css';
import ContactsContainer from './ContactsContainer.js'
import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Observable from './Observable';

export default class OrgDetails extends Component {
    constructor(props) {
        super(props);
        this.myToken = this.props.myToken;
        // State
        this.state = {
            selectedTags: {},
            matchingOrgs: {},
            expanded: false,
            canClick: true
        };
    }
    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };
    sendRequest = (method, path) => {
        this.setState(Object.assign({}, this.state, { canClick: false }));
        const xhr = new XMLHttpRequest();
        xhr.open(method, `${this.props.serverLink}${path}`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${this.myToken}`);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    Observable.notify("deleteOrg", this.props.orgID)
                    if(path==='approve'){
                        Observable.notify('addNewOrg',{org:this.props.org,id:this.props.orgID})
                    }
                    // const newOrgs = {};
                    // Object.keys(this.orgs).forEach(orgId => {
                    //     if (orgId !== this.state.selectedOrgId) {
                    //         newOrgs[orgId] = this.orgs[orgId];
                    //     }
                    // });
                    // this.orgs = newOrgs;
                }
                this.setState(Object.assign({}, this.state, {
                    status: xhr.status,
                    canClick: true,
                    selectedOrgId: false,
                    deleteIsClicked: false
                }));
            }
        };
        xhr.send(JSON.stringify({ orgId: this.props.orgID }));
    }

    handelDelete = (OrgID) => {
        this.sendRequest('Delete', 'remove')

    }
    handelApprove = (orgID) => {
        this.sendRequest('Put', 'approve')
    }

    render = () => {
        const org = this.props.org;
        // const tags = this.props.tags;

        return <div className="orgDetails" style={{ width: this.state.expanded ? '100%' : '30%' }}>
            {/*<div className="orgInfo">
                <div className="orgName">
                    <h1>{org.name}</h1>
                </div>
                <div className="orgLogo">
                    <img
                        className='orgLogoIMG'
                        src={org.logo}
                        alt={`${org.name} Logo`}
                    />
                </div>
            </div>
            <div className="orgTags">
                {org.tags.map(tag => (tags[tag]) ? <span
                    key={tag}
                    className=
                    {org.matchingTags[tag] ? 'tag tagSelected' : 'tag'}
                >{tags[tag]}</span> : <span></span>)}
            </div>*/}

            <Card style={{ width: '100%', backgroundColor: '#EEEEEE' }} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardHeader
                    title={org.name}
                    subtitle={org.name}
                    avatar={org.logo}
                    actAsExpander={true}
                    showExpandableButton={true}
                    style={{ backgroundColor: '#FF7043' }}
                />
                <CardMedia
                    expandable={false}
                >
                    <img src={org.logo} alt="" />
                </CardMedia>
                {this.props.isAdmin ? <CardActions>
                    <div style={{ marginTop: 12 }}>
                        {this.props.isPending ?<RaisedButton
                            label={'Approve'}
                            primary={true}
                            onClick={this.handelApprove}
                            disabled={!this.state.canClick}
                        />:null}
                        <RaisedButton
                            label={'Delete'}
                            disabled={!this.state.canClick}
                            secondary={true}
                            onClick={this.handelDelete}
                        />
                    </div>
                </CardActions> : null}

                <CardTitle title={`About ${org.name}`} expandable={true} />
                <CardText expandable={true}>
                    {org.description_company}

                </CardText>
                <CardText expandable={true}>
                    <ContactsContainer contacts={org.contacts} svg={this.props.svg} isRemovable={false} />
                </CardText>
            </Card>
        </div>
    }
}
