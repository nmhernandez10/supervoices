import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { FormattedMessage } from 'react-intl';

import Home from './components/Home';
import Explorer from './components/Explorer';
import Playlists from './components/Playlists';
import Preferences from './components/Preferences';
import Rooms from './components/Rooms';

export default class Session extends Component{

  state = {
    user: {},
    logged : JSON.parse(localStorage.getItem('loggeduser')) == null ? false : true,
    page: 'home',
    ready: false
  }

  updateProfile = (newUser) => {
    this.setState({
      user: newUser
    });
  }

  logOut = () => {
    localStorage.setItem('loggeduser', JSON.stringify(null));
    this.setState({
      logged: false
    }, () => {
      M.toast({html:'Spacebeat will miss you', classes: 'rounded'});
    });
  }

  changePage = (new_page) => {
    if(this.state.ready){
      this.setState({
        page: new_page
      });
    }    
  }  

  componentDidMount(){
    var retrievedObject = JSON.parse(localStorage.getItem('loggeduser'));
    if(retrievedObject != null){
      let idUser = retrievedObject.id;
      fetch('/api/user/'+idUser).then(res => res.json()).then(data => {  
        console.log(data);    
        this.setState({
          user: data,
          ready: true
        });             
      }).catch(error => {this.setState({logged:false});});     
    } 
    document.dispatchEvent(new Event('component'));       
  }

  render(){

    if(!this.state.logged){
      return <Redirect to='/'/>;
    }

    return(

      <div className = "content">        
        
        <ul id="mobile-demo" className="sidenav sidenav-fixed">
          <li>
            {
              this.state.ready?
              <div className="user-view">
                <div className="background">
                  <img alt="image" className = "responsive-img" src={"./images/"+this.state.user.user_banner}/>
                </div>
                <img alt="image" className="circle" src={"./images/"+this.state.user.user_image}/>
                <a href="#!"><span className="white-text name">{this.state.user.user_names + " " + this.state.user.user_lastnames}</span></a>
                <a href="#!"><span className="white-text email">{this.state.user.user_email}</span></a>
              </div>
              :
              <div className="user-view">
                <div className="background">
                  <img alt="image" className = "responsive-img" src={"./images/defaultbanner.jpg"}/>
                </div>
                <img alt="image" className="circle" src={"./images/defaultprofile.jpg"}/>
                <a href="#!"><span className="white-text name">{"Loading..."}</span></a>
                <a href="#!"><span className="white-text email">{"Wait a second..."}</span></a>
              </div>
            }
          </li>
          {
            this.state.page == 'home'?
            <li className ="active"><a className="waves-effect" onClick = {() => this.changePage('home')} href="#"><i className="material-icons">home</i><FormattedMessage id="Home"/></a></li>
            :<li><a className="waves-effect" onClick = {() => this.changePage('home')} href="#"><i className="material-icons">home</i><FormattedMessage id="Home"/></a></li>
          }
          {
            this.state.page == 'playlists'?
            <li className ="active"><a className="waves-effect" onClick = {() => this.changePage('playlists')} href="#"><i className="material-icons">view_list</i><FormattedMessage id="Playlists"/></a></li>
            :<li><a className="waves-effect" onClick = {() => this.changePage('playlists')} href="#"><i className="material-icons">view_list</i><FormattedMessage id="Playlists"/></a></li>
          }
          {
            this.state.page == 'rooms'?
            <li className ="active"><a className="waves-effect" onClick = {() => this.changePage('rooms')} href="#"><i className="material-icons">people</i><FormattedMessage id="Rooms"/></a></li>
            :<li><a className="waves-effect" onClick = {() => this.changePage('rooms')} href="#"><i className="material-icons">people</i><FormattedMessage id="Rooms"/></a></li>
          }
          {
            this.state.page == 'explorer'?
            <li className ="active"><a className="waves-effect" onClick = {() => this.changePage('explorer')} href="#"><i className="material-icons">search</i><FormattedMessage id="Explorer"/></a></li>
            :<li><a className="waves-effect" onClick = {() => this.changePage('explorer')} href="#"><i className="material-icons">search</i><FormattedMessage id="Explorer"/></a></li>
          }
          <li><div className="divider"></div></li>
          <li><a className="subheader"><FormattedMessage id="YourAccount"/></a></li>
          {
            this.state.page == 'preferences'?
            <li className ="active"><a className="waves-effect" onClick = {() => this.changePage('preferences')}href="#"><FormattedMessage id="Settings"/></a></li>
            :<li><a className="waves-effect" onClick = {() => this.changePage('preferences')}href="#"><FormattedMessage id="Settings"/></a></li>
          }          
          <li><a className="waves-effect modal-trigger" href="#confirmModal"><FormattedMessage id="LogOut"/></a></li>
        </ul>

        <div className = "sessionmain">

          <nav>            
            <div className="nav-wrapper pink darken-4">
              <a href="#" className="brand-logo center">SPACEBEAT</a>
              <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">                           
              </ul>
            </div>
          </nav>         

          {
            this.state.ready?            
            <div>
              {this.state.page == 'home'?
                <Home updateProfile = {this.updateProfile} user = {this.state.user}/>
              :this.state.page == 'playlists'?
                <Playlists updateProfile = {this.updateProfile} user = {this.state.user}/>
              :this.state.page == 'rooms'?
                <Rooms updateProfile = {this.updateProfile} user = {this.state.user}/>
              :this.state.page == 'explorer'?
                <Explorer updateProfile = {this.updateProfile} user = {this.state.user}/>
              :this.state.page == 'preferences'?
                <Preferences updateProfile = {this.updateProfile} user = {this.state.user}/>
              :null
            }
            </div>
            :
            <div className = "container">
              <br></br>
              <div className="progress pink lighten-5">
                <div className="indeterminate pink darken-4"></div>
              </div>
            </div>
          }        

        </div>
        
        <footer className="page-footer pink darken-4">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h1 style={{"fontSize":"25px"}} className="white-text"><FormattedMessage id="FLM1"/></h1>
                <p className="grey-text text-lighten-4"><FormattedMessage id="FLM4"/></p>
              </div>
              <div className="col l4 offset-l2 s12">
                <p style={{"fontSize":"25px"}} className="white-text"><FormattedMessage id="FLM2"/></p>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="#!"><FormattedMessage id="FLM3"/></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2019 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#"><FormattedMessage id="Home"/></a>
            </div>
          </div>
        </footer>

        {/* Modals */}

        <div id="confirmModal" className="modal">
          <div className="modal-content">
            <h4><FormattedMessage id="LogOut"/></h4>
            <p><FormattedMessage id="LogOutM"/></p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat"><FormattedMessage id="Not"/></a>
            <a onClick = {this.logOut} className="modal-close waves-effect waves-green btn-flat"><FormattedMessage id="Yes"/></a>
          </div>
        </div>        

      </div>
    )     
  }  
}
