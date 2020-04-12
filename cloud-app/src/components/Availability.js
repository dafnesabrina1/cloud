import React, { Component } from 'react';
import AvailableTimes from 'react-available-times';

export default class Availability extends Component {
    state = {
        selections: []
    }
    render() {
        return (
            <div>
                <AvailableTimes
                    weekStartsOn="monday"
                    onChange={(selections) => {
                        console.log("Start")
                        selections.forEach(({ start, end }) => {
                        console.log('Start:', start, 'End:', end);
                        })
                    }}
                    recurring={true}
                    height={400}
                    recurring={false}
                    availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']}
                    availableHourRange={{ start: 7, end: 22 }}
                    />
            </div>
        )
    }
}
