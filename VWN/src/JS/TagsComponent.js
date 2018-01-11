import React, { Component } from 'react';
import '../CSS/TagComponent.css';
import Observable from './Observable';
import Map from './Map.js';
import Checkbox from 'material-ui/Checkbox';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

export default class TagsComponent extends Component {
    componentWillMount() {
        this.setState({
            selectedTags: this.tagSelectionHandler(),
            selectedRegions: this.regionSelectionHandler(),
            slideIndex: 0

        });
        Observable.subscribe(this.renderTags);
    }
    regionSelectionHandler = () => {
        let selectedRegions = {};
        selectedRegions = Observable.getSelectedRegions();
        return selectedRegions;
    }

    componentWillUnmount() {
        Observable.unsubscribe(this.renderTags);
    }
    handleTabChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };
    tagSelectionHandler = () => {
        let selectedTags = {};
        //if we need to use hash as state of selected filters
        // const hash = window.location.hash;
        // if (hash !== '') {
        //     hash.slice(1).split(',').slice(2).forEach(tagId => {
        //         selectedTags[tagId] = true;
        //     });
        // }
        selectedTags = Observable.getSelectedTags();
        return selectedTags;
    }

    renderTags = (action) => {
        if (action === 'tagSelection') {
            this.setState({
                selectedTags: this.tagSelectionHandler(),
            });
        }
        if (action === 'regionSelection') {
            this.setState({
                selectedRegions: this.regionSelectionHandler()
            });
        }
    }

    // setHash = (iAmCompany, selectedTags) => {
    //     let selectedOrgId = 'n';
    //     let tagsRegionsHashArray = window.location.hash.split('R')
    //     if (tagsRegionsHashArray[0] !== '') {
    //         selectedOrgId = tagsRegionsHashArray[0].slice(1).split(',')[0];
    //     }
    //     let hash = `${selectedOrgId},${iAmCompany}`;
    //     for (const id in selectedTags) {
    //         if (selectedTags[id]) {
    //             hash += `,${id}`;
    //         }
    //     }
    //     if (tagsRegionsHashArray.length > 1) {
    //         hash += tagsRegionsHashArray[1];
    //     }
    //     window.location.hash = hash;
    // }


    render=()=> {
        const styles = {
            block: {
                maxWidth: 250,
            },
            checkbox: {
                marginBottom: 16,
            },
        };
        const selectedCategoriesCount= Object.keys(this.state.selectedTags).length
        const selectedRegionsCount= Object.keys(this.state.selectedRegions).length

        return <div className="filtersContainer">
            <div className="filtersTabs">
                <Tabs
                    onChange={this.handleTabChange}
                    value={this.state.slideIndex}
                >
                    <Tab label={`Categories ${selectedCategoriesCount?`(${selectedCategoriesCount})`:``}`}  value={0} />
                    <Tab label={`Regions ${selectedRegionsCount?`(${selectedRegionsCount})`:``}`} value={1} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleTabChange}
                >
                    <div className="tagContainer">
                        {Object.keys(this.props.tags).map(tagId => {
                            return <div className="tagItem">
                                <Checkbox
                                    label={this.props.tags[tagId]}
                                    checked={this.state.selectedTags[tagId] ? true : false}
                                    onCheck={Observable.setHash.bind(this, tagId, 'T')}
                                    style={styles.checkbox}
                                />
                            </div>
                        })}
                    </div>
                    <div className="sVGFiltersMAp">
                        <Map svgPs={this.props.svgPs} isClickable={true} inAddMode={false} />
                    </div>
                </SwipeableViews>
            </div>
        </div>
    }
}
