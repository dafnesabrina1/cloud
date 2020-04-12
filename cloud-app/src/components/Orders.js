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
import AddShoppingCartIcon from '@material-ui/icons/AddCircle'
import "./Orders.css";

function preventDefault(event) {
  event.preventDefault();
}

export default class Orders extends React.Component {
  state = {
    userskills: [], 
    open: false
  }
  componentDidMount(){
    let id = localStorage.getItem('id');
    fetch('http://cloud-dev2.us-east-2.elasticbeanstalk.com/get_user_skills/'+id)
        .then(res => res.json())
        .catch(error => alert("Invalid User"))
        .then(response => {
            this.setState({
              userskills: response
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
      open: false
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
            <h2 id="spring-modal-title">Spring modal</h2>
            <p id="spring-modal-description">react-spring animates me.</p>
          </div>
        </Modal>
        
      </React.Fragment>
    )
  }
}