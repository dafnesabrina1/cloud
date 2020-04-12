import React, { Component } from 'react';
import AvailableTimes from 'react-available-times';
import Button from '@material-ui/core/Button';

export default class Availability extends Component {
    state = {
        selections: [], 
        savedSelections: [{start: new Date("Fri, 17 Apr 2020 10:30:00"), end: new Date("Fri, 17 Apr 2020 11:30:00")}],
        render: false, 
        selectionCalled: []
    }
    componentWillMount() {
        let id = localStorage.getItem('id');
        fetch('http://cloud-dev2.us-east-2.elasticbeanstalk.com/get_user_availabilities/'+id)
            .then(res => res.json())
            .catch(error => {})
            .then(response => {
                console.log("Response",response);
                let savedSelections = []
                response.forEach((element) =>{
                    savedSelections.push({start: new Date(element.start.replace(" GMT", "")), end: new Date(element.end.replace(" GMT", ""))})
                })
                this.setState({
                savedSelections: savedSelections, 
                render: true
                }, ()=>{
                    console.log(this.state.savedSelections)
                })
            });
    }

    formatAMPM(date) { // This is to display 12 hour format like you asked
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    handleSave() {
        let selectionCalled = []
        let start = ""
        let end = ""
        this.state.selections.forEach((e)=>{
            start = e.start.getFullYear() + '-' + ("0" + (e.start.getMonth() + 1)).slice(-2)+ '-' +e.start.getDate()+ ' ' + e.start.getHours() + ':' + e.start.getMinutes() + ':' + e.start.getSeconds();
            end = e.end.getFullYear() + '-' + ("0" + (e.end.getMonth() + 1)).slice(-2)+ '-' +e.end.getDate()+ ' ' + e.end.getHours() + ':' + e.end.getMinutes() + ':' + e.end.getSeconds();
            console.log(start, end)
            selectionCalled.push({
                id_user: localStorage.getItem('id'), 
                start: start,
                end: end
            })
        })
        this.setState({
            selectionCalled: selectionCalled
        }, ()=>{
            let data={
                availability: this.state.selectionCalled,
                id_user: localStorage.getItem('id')
            }
            console.log(data)
            fetch('http://cloud-dev2.us-east-2.elasticbeanstalk.com/add_user_availability', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                window.location.reload()
            });
        })
    }


    render() {
        if (this.state.render) {
            return (
                <div>
                    <AvailableTimes
                        weekStartsOn="monday"
                        onChange={(selections) => {
                            this.setState({selections: selections}, ()=>{
                                console.log(this.state.selections);
                            })
                        }}
                        initialSelections={this.state.savedSelections}
                        recurring={true}
                        height={500}
                        recurring={false}
                        availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']}
                        availableHourRange={{ start: 7, end: 22 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                        onClick={this.handleSave.bind(this)}
                    >Save</Button>

                </div>
            )
        } else {
            return <div/>
        }
    }
}
