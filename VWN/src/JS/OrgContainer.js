import React, { Component } from 'react';
import OrgDetails from './OrgDetails.js'
import '../CSS/OrgContainer.css';
// import { GridList, GridTile } from 'material-ui/GridList';
// import IconButton from 'material-ui/IconButton';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import Observable from './Observable';


export default class OrgContainer extends Component {
    // constructor(props) {
    //     super(props);

    //     // // State
    //     // this.state = {
    //     //     selectedTags: {},
    //     //     matchingOrgs: {},
    //     //     firstTime: true
    //     // };
    // }

    componentWillMount() {
        this.renderOrgs('tagSelection');
        Observable.subscribe(this.renderOrgs);
    }

    componentWillUnmount() {
        Observable.unsubscribe(this.renderOrgs);
    }
    renderOrgs = (action) => {
        if (action === 'tagSelection') {
            const matchingOrgs = {};
            const orgs = this.props.orgs;
            let selectedTags = Observable.getSelectedTags()
            let selectedRegions = Observable.getSelectedRegions()
            const tagsareSelected = Object.keys(selectedTags).length !== 0
            const regionsareSelected = Object.keys(selectedRegions).length !== 0
            if (!regionsareSelected && !tagsareSelected) {
                for (const orgId in orgs) {
                    matchingOrgs[orgId] = Object.assign({}, orgs[orgId]);
                    matchingOrgs[orgId].id = orgId;
                    matchingOrgs[orgId].matchingTags = {};
                }
            }
            else {
                for (const orgId in orgs) {
                    let matchingOrg = {};
                    const org = orgs[orgId];
                    org.tags.forEach(tagId => {
                        if (regionsareSelected) {// if there is regions selected 
                            if (selectedRegions[tagId]) { // if org has this region 
                                if (tagsareSelected) { // then  if tags also sellected 
                                    org.tags.forEach(tagId => { // here we need to get the org which has the region AND the Tag so we loop throw the tags again
                                        if (selectedTags[tagId]) { // if org has also the tag 
                                            if (matchingOrg.name === undefined) {
                                                matchingOrg = Object.assign({}, org);
                                                matchingOrg.id = orgId;
                                                matchingOrg.matchingTags = {};
                                            }
                                            matchingOrg.matchingTags[tagId] = true;
                                        }
                                    })
                                }
                                else {// if no tags sellected 
                                    if (matchingOrg.name === undefined) {
                                        matchingOrg = Object.assign({}, org);
                                        matchingOrg.id = orgId;
                                        matchingOrg.matchingTags = {};
                                    }
                                    matchingOrg.matchingTags[tagId] = true;
                                }
                            }
                        }
                        else { // if no regions selected 
                            if (selectedTags[tagId]) {
                                if (matchingOrg.name === undefined) {
                                    matchingOrg = Object.assign({}, org);
                                    matchingOrg.id = orgId;
                                    matchingOrg.matchingTags = {};
                                }
                                matchingOrg.matchingTags[tagId] = true;
                            }
                        }

                    });
                    if (matchingOrg.name !== undefined) {
                        matchingOrgs[orgId] = matchingOrg;
                    }
                }
            }
            this.setState({
                matchingOrgs: matchingOrgs
            });
        }

    }
    render = () => {
        // const styles = {
        //     root: {
        //         display: 'flex',
        //         flexflow: 'row wrap',
        //         justifyContent: 'space-around',
        //     },
        //     gridList: {
        //         width: '100%',
        //         height: 450,
        //         overflowY: 'auto',
        //     },
        // };
        const tags = this.props.tags;
        const matchingOrgs = this.state.matchingOrgs;
        const svg = this.props.svg;
        return <div className="orgContainer">
            {Object.keys(matchingOrgs).map((orgId, index) => {
                let x = []
                matchingOrgs[orgId].tags.forEach((tag)=>{
                    if (svg[tag]) {
                        x.push(svg[tag]);
                    }
                });
              
                return <OrgDetails
                    key={index}
                    org={matchingOrgs[orgId]}
                    tags={tags}
                    svg={x.length>0?x:svg}
                />
            }
            )}
            {/*<div style={styles.root}>
                <GridList
                    cols={3}
                    cellHeight={200}
                    padding={1}
                    style={styles.gridList}
                >
                    {Object.keys(matchingOrgs).map((orgId, index) =>
                        <GridTile
                            key={index}
                        >
                            <OrgDetails
                                org={matchingOrgs[orgId]}
                                tags={tags}
                            />
                        </GridTile>
                    )}
                </GridList>
            </div>*/}
        </div>
    }
}
