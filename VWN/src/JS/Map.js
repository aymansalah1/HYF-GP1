import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import Observable from './Observable';


export default class Map extends Component {
    componentWillMount() {
        this.setState({
            selectedRegions: this.rgionSelectionHandler(),
            contactRegion: this.contactRegionHandler()
        });
        Observable.subscribe(this.renderRegions);
    }

    componentWillUnmount() {
        Observable.unsubscribe(this.renderRegions);
    }

    rgionSelectionHandler = () => {
        let selectedRegions = {};
        selectedRegions = Observable.getSelectedRegions();
        return selectedRegions;
    }
    contactRegionHandler = () => {
        let selectedRegion;
        selectedRegion = Observable.getContactRegion();
        return selectedRegion
    }

    renderRegions = (action) => {
        if (action === 'regionSelection') {
            this.setState({
                selectedRegions: this.rgionSelectionHandler()
            });
        }
        if (action === 'contactRegion') {
            this.setState({
                contactRegion: this.contactRegionHandler()
            });
        }
    }






    render() {
        let svgPs = this.props.svgPs;
        console.log(svgPs)
        const isClickable = this.props.isClickable;
        const inAddMode = this.props.inAddMode;
        return <svg version="1.1" id="map" x="0px" y="0px" width="100%" height="200px" viewBox="0 0 429.358 500" enableBackground="new 0 0 429.358 500" >
            {
                Object.keys(svgPs).map(pathId => <path fillRule="evenodd"
                    stroke="#AEADA9"
                    strokeWidth="1px"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    id={pathId}
                    key={pathId}
                    fill={isClickable ?//if clickable so we are in add mode or filtering 
                        inAddMode ?//if add mode so only on region will be selected 
                            this.state.contactRegion === pathId ? "#ed2f25" : svgPs[pathId].fill
                            : this.state.selectedRegions[pathId] ? "#ed2f25" : svgPs[pathId].fill
                        : svgPs[pathId].fill}
                    className={svgPs[pathId].name}
                    datalink={svgPs[pathId].name}
                    d={svgPs[pathId].d}
                    onClick={isClickable ? inAddMode ? Observable.setContactRegion.bind(this, pathId) : Observable.setHash.bind(this, pathId, 'R') : null} ></path>)
            }
        </svg>;
    }
}