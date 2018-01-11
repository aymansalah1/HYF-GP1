class Observable {

    constructor() {
        this.subscribers = [];
        this.selectedOrgs = {};
        this.selectedRegions = {};
        this.selectedTags = {};
        this.contacts = [];
        this.CurrentHash=''
        this.contactRegion = null

        this.actions = [
            'markSelectedBarItem',
            'tagSelection',
            'orgSelection',
            'showFilter',
            'regionSelection',
            'clearNewOrgTags',
            'contactRegion',
            'reflectSelectedRegion',
            'reflectAddedContacts'
        ];
    }
    getContactRegion = () => {
        return this.contactRegion
    }
    setContactRegion = (value) => {
        this.contactRegion = value
        this.notify('contactRegion')
        this.notify('reflectSelectedRegion')
        
    }
    addContacts = (contact) => {
        this.contacts.push(contact)
        this.notify('reflectAddedContacts')
    }
    deleteContacts = (contactID) => {
        this.contacts = this.contacts.filter(contact => contact.id !== contactID)
        this.notify('reflectAddedContacts')
    }
    getContacts = () => {
        return this.contacts
    }
    setContacts = (value) => {
        this.contacts = value
    }
    setSelectedFilters = (filterId, type) => {

        //if the filter already selected then remove it ,else add it with value true
        this.selectedFilters[filterId] ? delete this.selectedFilters[filterId] : this.selectedFilters[filterId] = true;
        this.notify('tagSelection')
    }
    getSelectedTags() {
        return this.selectedTags
    }
    getSelectedOrgs() {
        return this.selectedOrgs
    }
    getSelectedRegions() {
        return this.selectedRegions
    }
    saveCurrentHash=()=>{
     this.CurrentHash=window.location.hash
    }
    getlastHash=()=>{
        return this.CurrentHash
    }
    setHash = (filterID, type) => {
        this.getCurrentHashFilters()
        switch (type) {
            case "O":
                {
                    this.addRemoveHashFilter(this.selectedOrgs, filterID)
                    break
                }
            case "R":
                {
                    this.addRemoveHashFilter(this.selectedRegions, filterID)
                    break
                }
            case "T":
                {
                    this.addRemoveHashFilter(this.selectedTags, filterID)
                    break
                }
            default:
                break
        }
        let hash = `${Object.keys(this.selectedOrgs).length > 0 ? '&O' + Object.keys(this.selectedOrgs).toString() : ''}${Object.keys(this.selectedRegions).length > 0 ? '&R' + Object.keys(this.selectedRegions).toString() : ''}${Object.keys(this.selectedTags).length > 0 ? '&T' + Object.keys(this.selectedTags).toString() : ''}`
        window.location.hash = hash
        this.notify('tagSelection')
    }
    getCurrentHashFilters = () => {
        this.selectedOrgs = {};
        this.selectedRegions = {};
        this.selectedTags = {};
        let tagsRegionsHashArray = window.location.hash
        if (tagsRegionsHashArray !== '') {
            tagsRegionsHashArray.slice(1).split('&').forEach((hashSec) => {
                switch (hashSec[0]) {
                    case "O":
                        {
                            hashSec.slice(1).split(',').forEach(orgID => {
                                this.addRemoveHashFilter(this.selectedOrgs, orgID)
                            })
                            break;
                        }
                    case "R":
                        {
                            hashSec.slice(1).split(',').forEach(orgID => {
                                this.addRemoveHashFilter(this.selectedRegions, orgID)
                            })
                            break;
                        }
                    case "T":
                        {

                            hashSec.slice(1).split(',').forEach(orgID =>this.addRemoveHashFilter(this.selectedTags, orgID))
                            break;
                        }
                    default:
                        break;
                }
            });
        }
    }
    addRemoveHashFilter = (list, id) => {
        list[id] ? delete list[id] : list[id] = true;
    }
    subscribe = (f) => {
        this.subscribers.push(f);
    }

    unsubscribe = (f) => {
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== f);
    }

    notify = (action, value) => {
        if (this.actions.indexOf(action) > -1) {
            if (value === undefined) {
                this.subscribers.forEach(subscriber => { subscriber(action); });
            }
            else {
                this.subscribers.forEach(subscriber => { subscriber(action, value); });
            }
        }
        else {
            throw (Error);
        }
    }


}

export default new Observable();