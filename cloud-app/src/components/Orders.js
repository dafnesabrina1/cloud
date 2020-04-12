import React from 'react';
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import "./Orders.css";

const currencies = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
];

export default class Orders extends React.Component {
  state = {
    userskills: [], 
    open: false, 
    skills: [],
    level: 0, 
    language: ""
  }
  componentDidMount(){
    let id = localStorage.getItem('id');
    fetch('http://cloud-dev2.us-east-2.elasticbeanstalk.com/get_user_skills/'+id)
        .then(res => res.json())
        .catch(error=>{})
        .then(response => {
            this.setState({
              userskills: response
            })
        });

    fetch('http://cloud-dev2.us-east-2.elasticbeanstalk.com/get_all_skills')
    .then(res => res.json())
    .catch(error=>{})
    .then(response => {
        this.setState({
          skills: response
        })
    });
  }

  handleDelete(e){
    let id = e.target.id;
    if(!id){
      id = e.target.parentNode.id;
    }
    let data={
      id_user: localStorage.getItem('id'),
      id_skills: id
    }
    fetch('http://cloud-dev2.us-east-2.elasticbeanstalk.com/delete_user_skill', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(error => alert("Could not delete please try again later"))
    .then(response => {
        if (response){
          window.location.reload();
        }
    });
  }

  handleOpen(){
    this.setState({
      open: true
    })
  }

  handleClose(){
    this.setState({
      open: false,
      level: 0, 
      language: ""
    })
  }

  handleAddSkill(){
    let data={
      id_user: parseInt(localStorage.getItem('id')),
	    id_skills: parseInt(this.state.language.id),
	    level: parseInt(this.state.level)
    }
    if (data.id_skills && data.id_user && data.level){
      fetch('http://cloud-dev2.us-east-2.elasticbeanstalk.com/add_user_skill', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .catch(error => alert("Could not add skill, please try again later"))
      .then(response => {
          if (response){
            window.location.reload();
          }
      });

    } else {
      alert("Please Fill Everything out!");
    }
  }

  handleLevelChange(e){
    this.setState({
      level: e.target.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <Title>My Skills</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Skill</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Description</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.userskills.map((i) => (
              <TableRow key={i.id_skills}>
                <TableCell>{i.programming_language}</TableCell>
                <TableCell>{i.level}</TableCell>
                <TableCell>{i.description}</TableCell>
                <TableCell>
                  <IconButton 
                  aria-label="delete" 
                  color="primary"
                  id ={i.id_skills}
                  onClick={this.handleDelete.bind(this)}>
                    <DeleteIcon id ={i.id_skills}/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="seeMore">
        <IconButton color="primary" aria-label="add to shopping cart" onClick={this.handleOpen.bind(this)}>
          <AddShoppingCartIcon />
        </IconButton>
        </div>
        <Modal
        open={this.state.open}
        onClose={this.handleClose.bind(this)}
        className="modal"
        >
          <div className="paper">
            <h2 id="spring-modal-title">Add Skill</h2>
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
            <br/>
            <br/>
            <TextField
              id="standard-select-currency"
              select
              label="Level"
              helperText="Please select your skill level"
              value={this.state.level}
              onChange={this.handleLevelChange.bind(this)}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                onClick={this.handleAddSkill.bind(this)}
            >
              Add Skill
            </Button>
          </div>
        </Modal>
        
      </React.Fragment>
    )
  }
}