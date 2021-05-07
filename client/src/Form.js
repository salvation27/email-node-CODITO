import React, { Component } from 'react'
import axios from 'axios'


export default class Form extends Component {

  state={
  name:'',
  lastname:'',
  email:'',
  mes:'',
  sent:false
  }
 

  // Handel input

  handleName = (e) => {
    this.setState({
      name:e.target.value 
    })
  }

  handleLastName = (e) => {
    this.setState({
      lastname:e.target.value 
    })
  }

  handleEmail = (e) => {
    this.setState({
      email:e.target.value 
    })
  }

  handleMes= (e) => {
    this.setState({
      mes:e.target.value
    })
  }



  formSubmit = (e)=> {
    e.preventDefault()
    let data = {
      name:this.state.name,
      lastname:this.state.lastname,
      email:this.state.email,
      mes:this.state.mes
    }
    axios.post('/api/forma',data)
      .then(res=>{
        this.setState({
          sent:true
        },this.resetForm())
      })
      .catch(()=>{
        console.log('Сообщение не отправлено');
      })
  }


  resetForm=()=>{
    this.setState({
      name:'',
      lastname:'',
      email:'',
      mes:''
    })
    setTimeout(()=>{
      this.setState({
        sent:false
      })
    },3000)
  }
  render() {
    return (
      <div className='container'>
        <form
        onSubmit={this.formSubmit}
        >
          <div className="singel_item">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" className="name" 
            onChange={this.handleName}
            value={this.state.name}
            />
          </div>
          <div className="singel_item">
            <label htmlFor="lastname">Lastname</label>
            <input 
            onChange={this.handleLastName}
            value={this.state.lastname}
            type="text" name="lastname" className="lastname"/>
          </div>
          <div className="singel_item">
            <label htmlFor="email">Email</label>
            <input
            onChange={this.handleEmail}
            value={this.state.email}
            type="text" name="email" className="email"/>
          </div>
          <div className="singel_item">
            <textarea
            onChange={this.handleMes}
            value={this.state.mes}
            name="mes" id="" cols="30" rows="10" placeholder="Ваше сообщение"></textarea>
          </div>
           <div className="btn">
             <button type="submit">Send</button>
           </div>
           <div className={this.state.sent ? 'msg visi' : 'msg'}>Сообщение отправлено</div>
        </form>
      </div>
    )
  }
}
