import React, { Component } from 'react';
import '../CSS/OrgDetails.css';
import ContactsContainer from './ContactsContainer.js'
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';


export default class OrgDetails extends Component {
    constructor(props) {
        super(props);

        // State
        this.state = {
            selectedTags: {},
            matchingOrgs: {},
            expanded: false
        };
    }
    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };


    render = () => {
        const org = this.props.org;
        // const tags = this.props.tags;

        return <div className="orgDetails" style={{width:this.state.expanded ? '100%' : '30%'}}>
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

            <Card  style={{ width: '100%',backgroundColor: '#EEEEEE' }} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
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
