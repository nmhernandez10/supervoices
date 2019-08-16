import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { FormattedMessage } from 'react-intl';

export default class LogIn extends Component{

  state = {
    user_email: '',
    user_password: '',
    redirect : false
  }

  toSignUp = () =>{
    this.props.toSignUp();
  }

  handleInput = (e) => {
    const {value, id} = e.target;
    this.setState({
      [id]: value
    });
  }

  handleSubmit = () => {
    var identified = false;
    var idIdentified = 0;
    fetch('/api/user').then(res => res.json()).then(data => {      
        data.forEach( (dat) => {
            if(dat.user_email == this.state.user_email && dat.user_password == this.state.user_password)
            {
                idIdentified = dat.id;
                identified = true;
            }
        });  
        
        if(identified == true){
            M.toast({html:'Welcome to Spacebeat', classes: 'rounded'});
            localStorage.setItem('loggeduser', JSON.stringify({id: idIdentified}));
            this.setState({              
              redirect: true
            });
        }             
        else if(this.state.user_password == '' || this.state.user_email == ''){
            M.toast({html:'Provide valid values of your account', classes: 'rounded'});
        }
        else{
            M.toast({html:'Information do not match with any account', classes: 'rounded'});
        }       
    });     
  }

  render(){

    if(this.state.redirect){
      return <Redirect to='/session'/>;
    }

    return(
      <div>
        <center>
            <h1><FormattedMessage id="LogIn"/></h1>
            <p><FormattedMessage id="Or"/> <a className="pink-text text-darken-4" onClick = {this.toSignUp} href="#action"><FormattedMessage id="SignUp"/></a></p>
            <br></br>
            <br></br>
        </center>
        <div className="row">
            <form className="col s12">
                <div className = "container">                
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
                        </div>
                    </div>
                </div>              
            </form>

            <br></br>
            <br></br>
            
            <center>
            <a onClick ={this.handleSubmit} className="waves-effect waves-light btn grey darken-4">{<FormattedMessage id="LogIn"/>}</a>
            <br></br>
            <br></br>
            {/**<a onClick = {this.toSignUp} href="#">Did you forget your password?</a>*/}
            </center>
        </div>
      </div>
    )     
  }  
}
