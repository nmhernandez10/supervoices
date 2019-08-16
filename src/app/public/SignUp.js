import React, {Component} from 'react';
import { FormattedMessage } from 'react-intl';

export default class SignUp extends Component{

  state = {
    user_names: '',
    user_lastnames: '',
    user_email: '',
    user_password: ''
  }

  toLogIn = () =>{
      this.props.toLogIn();
  }

  handleInput = (e) => {
    const {value, id} = e.target;
    this.setState({
      [id]: value
    });
    
  }

  handleSubmit = () =>{    
      
    console.log(this.state);
    if(this.state.user_password != this.state.user_password_confirm){
      M.toast({html:'Passwords are not equal', classes: 'rounded'});
    }
    else if(this.state.user_password.length < 8){
      M.toast({html:'Password must have minimum 8 tokens', classes: 'rounded'});
    }   
    else if(this.state.user_password == '' || this.state.user_names == '' || this.state.user_lastnames == '' || this.state.user_email == ''){
      M.toast({html:'Provide valid values for your account', classes: 'rounded'});
    }
    else{
      const nuevoUser = {user_names: this.state.user_names,user_lastnames:this.state.user_lastnames, user_email:this.state.user_email, user_password: this.state.user_password, user_image: 'defaultprofile.jpg', user_banner: 'defaultbanner.jpg'};
      
      fetch('/api/user',{
        method: 'POST',
        body: JSON.stringify(nuevoUser),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}).then(res => {              
          if(res.ok){
            return res.json();                
          } 
          else{
            throw new Error("Another account already exists related to this e-mail");
        }}).then(data => {
          M.toast({html:'Your account has been created correctly', classes: 'rounded'});
            const idIdentified = data.id;            
            localStorage.setItem('loggeduser', JSON.stringify({id: idIdentified}));
            this.props.toLogIn();
        }).catch(error => M.toast({html:error.message, classes: 'rounded'}));
    } 
  }

  render(){

    return(
      <div>
        <center>
        <h1><FormattedMessage id="SignUp"/></h1>
        <p><FormattedMessage id="Or"/> <a className="pink-text text-darken-4" onClick = {this.toLogIn} href="#action"><FormattedMessage id="LogIn"/></a></p>
        <br></br>
        </center>
        <div className="row">
            <form className="col s12">
                <div className = "container">
                    <br></br>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="user_names" type="text" className="validate" onChange = {this.handleInput}/>
                            <label className ="grey-text text-darken-1" htmlFor="user_names"><FormattedMessage id="Names"/></label>
                        </div>
                        <div className="input-field col s6">
                            <input id="user_lastnames" type="text" className="validate" onChange = {this.handleInput}/>
                            <label className ="grey-text text-darken-1" htmlFor="user_lastnames"><FormattedMessage id="LastNames"/></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="user_email" type="email" className="validate" onChange = {this.handleInput}/>
                            <label className ="grey-text text-darken-1" htmlFor="user_email"><FormattedMessage id="E-mail"/></label>
                            <span className="helper-text" data-error="" data-success=""><FormattedMessage id="E-mailSM"/></span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="user_password" type="password" className="validate" onChange = {this.handleInput}/>
                        <label className ="grey-text text-darken-1" htmlFor="user_password"><FormattedMessage id="Password"/></label>
                        <span className="helper-text"><FormattedMessage id="PasswordSM"/></span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="user_password_confirm" type="password" className="validate" onChange = {this.handleInput}/>
                        <label className ="grey-text text-darken-1" htmlFor="user_password_confirm"><FormattedMessage id="PasswordConfirmation"/></label>
                        <span className="helper-text"><FormattedMessage id="PasswordConfirmationSM"/></span>
                        </div>
                    </div>  
                </div>                  
            </form>

            <br></br>
            <br></br>
            
            <center><a onClick ={this.handleSubmit} className="waves-effect waves-light btn grey darken-4"><FormattedMessage id="SignUp"/></a></center>
        </div>
      </div>
    )     
  }  
}
