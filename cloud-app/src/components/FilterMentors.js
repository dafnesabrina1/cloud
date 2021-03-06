import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class FilterMentors extends Component {
    state={
        start: "", 
        end: "", 
        skills: [], 
        language: "", 
        mentors: []
    }

    componentDidMount(){
        fetch('http://cloud-dev2.us-east-2.elasticbeanstalk.com/get_all_skills')
        .then(res => res.json())
        .catch(error=>{})
        .then(response => {
            this.setState({
            skills: response
            }, ()=>{
                console.log(this.state.skills)
            })
        });
    }
    handleStartChange(e){
        this.setState({
            start: e.target.value
        })
    }

    handleEndChange(e){
        this.setState({
            end: e.target.value
        })
    }
    handleSubmit(){
        let start = this.state.start.split("T").join(' ') + ":00";
        let end = this.state.end.split("T").join(' ') + ":00";
        let skill=undefined;
        if (this.state.language.id){
            skill= this.state.language.id;
        }
        let data = {
            start: start,
            end: end,
            id_skills: skill
        }
        console.log(data);
        if (data.id_skills && data.start && data.end){
            fetch('http://cloud-dev2.us-east-2.elasticbeanstalk.com/get_all_user_mentors', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .catch(error => alert("Could not do the Filter, please try again later"))
            .then(response => {
                if (response){
                    this.setState({
                        mentors: response
                    })
                }
            });
        }else {
            alert("Please Fill Everything out!");
        }
    }
    render() {
        return (
            <div>
                <Grid container justify="space-around">
                    <TextField
                        id="datetime-local"
                        label="Start"
                        type="datetime-local"
                        value={this.state.start}
                        onChange={this.handleStartChange.bind(this)}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        id="datetime-local"
                        label="End"
                        type="datetime-local"
                        value={this.state.end}
                        onChange={this.handleEndChange.bind(this)}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </Grid>
                <br/><br/>
                <Grid container justify="center">
                    <Autocomplete
                    id="combo-box-demo"
                    options={this.state.skills}
                    getOptionLabel={(option) => option.programming_language}
                    style={{ width: 300 }}
                    value={this.state.language}
                    onChange={(event, newValue) => {
                        this.setState({language: newValue});
                    }}
                    renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                    />  
                </Grid>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submit"
                    onClick={this.handleSubmit.bind(this)}
                >
                Search
                </Button>
                <Grid item xs={12}>
                    <Table size="small">
                    <TableHead>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.mentors.map((i) => (
                        <TableRow key={i.id}>
                            <TableCell>{i.name}</TableCell>
                            <TableCell>{i.email}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </Grid>
            </div>
        )
    }
}
