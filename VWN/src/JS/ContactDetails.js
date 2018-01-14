import React, { Component } from 'react';
import '../CSS/ContactDetails.css';
import Map from './Map.js';
import { List, ListItem } from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
// import Divider from 'material-ui/Divider';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import FlatButton from 'material-ui/FlatButton';
export default class ContactDetails extends Component {

    render = () => {
        const contact = this.props.contact;
       
        const svg = [this.props.svg[contact.region]];
        return <div className="contactDetails">
            {svg?
            <div className="contactSVGRegion">
                <Map svgPs={svg} isRemovable={false} isClickable={false} />
            </div>:null
            }
            
            
            <div className="contactInfoDIV">
                <List>
                    <ListItem primaryText={contact.phone} leftIcon={<CommunicationCall />} />
                    <ListItem primaryText={contact.email} leftIcon={<ContentDrafts />} />
                    <ListItem primaryText={contact.web} leftIcon={<ContentSend />} />
                    <ListItem primaryText={`${contact.house_number} ${contact.post_code}
                             ${contact.city}`} leftIcon={<IconLocationOn />} />
                </List>
            </div>
            {this.props.isRemovable ?
                <div className="contactRemoveBtn">
                    {/*<button className="remove-field" onClick={this.props.onRemove}>X</button>*/}
                    <FlatButton label="REMOVE CONTACT" fullWidth={true} secondary={true} onClick={this.props.onRemove} />
                </div>
                : null
            }
        </div>
    }
}
