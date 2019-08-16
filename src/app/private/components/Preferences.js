import React, {Component} from 'react';
import { FormattedMessage } from 'react-intl';

export default class Preferences extends Component{

  state = {
    user_id : this.props.user.id,
    user_names: this.props.user.user_names, 
    user_lastnames: this.props.user.user_lastnames, 
    user_email: this.props.user.user_email, 
    user_password: this.props.user.user_password, 
    user_image: this.props.user.user_image, 
    user_banner: this.props.user.user_banner, 
    edit: false,
    doing: false
  }

  handleSubmit= () => {         

    if(this.state.user_names == '' || this.state.user_lastnames == '' || this.state.user_email == '' || this.state.user_password == ''){
        M.toast({html:'Provide valid values for your account and images', classes: 'rounded'}); 
    }
    else{

        let profileImage = null;
        let bannerImage = null;

        try{
            profileImage = this.uploadProfile.files[0];            
        }
        catch(e){console.log('No se ingresó profile');}
        
        try{
            bannerImage = this.uploadBanner.files[0];
        }
        catch(e){console.log('No se ingresó banner');}

        const profileImageData = new FormData();
        const bannerImageData = new FormData();

        let newProfile = this.state.user_image;
        let newBanner = this.state.user_banner;

        if(profileImage != null){
            profileImageData.append('file', profileImage);
            profileImageData.append('filename', profileImage.name);
            newProfile = profileImage.name;
        }

        if(bannerImage != null){                
            bannerImageData.append('file', bannerImage);
            bannerImageData.append('filename', bannerImage.name);
            newBanner = bannerImage.name;
        }

        this.setState({
            user_banner : newBanner,
            user_image : newProfile,
            doing: true
        },()=>{

            var image = new Promise(
                function(resolve, reject) {
                    if(profileImage != null){
                        fetch('/images', {
                            method: 'POST',
                            body: profileImageData
                            }).then(res=> resolve(true)).catch(error => {
                                M.toast({html: error.message, classes: 'rounded'});
                                resolve(true);
                            });  
                        }else{resolve(false);}                    
                  }
            );

            var banner = new Promise(
                function(resolve, reject) {
                    if(bannerImage != null){                    
                        fetch('/images', {
                            method: 'POST',
                            body: bannerImageData
                            }).then(res=> resolve(true)).catch(error => {
                                M.toast({html: error.message, classes: 'rounded'});
                                resolve(true);
                            });
                        }else{resolve(false);}                   
                  }
            );
            
            image.then(res=>{
                banner.then(res=>{
                    const changes = {user_names:this.state.user_names, user_lastnames:this.state.user_lastnames, user_email:this.state.user_email, user_password: this.state.user_password, user_image: this.state.user_image, user_banner: this.state.user_banner};
                    console.log('hola');
                    fetch('/api/user/'+ this.state.user_id,{
                    method: 'PUT',
                    body: JSON.stringify(changes),
                    headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    }}).then(res => {              
                        if(res.ok){
                            return res.json();                   
                        }
                        else{
                            throw new Error("There is already some account with that email");
                    }}).then(data => {
                        this.setState({
                            edit: false,
                            doing: false
                        },()=> {
                                let idUser = data.id;
                                fetch('/api/user/'+idUser).then(res => res.json()).then(updatedUser => {              
                                    this.props.updateProfile(updatedUser);  
                                    M.toast({html:'Profile updated correctly', classes: 'rounded'});;                                
                                });   
                            }
                        );                                 
                    }).catch(error => {
                        M.toast({html:error.message, classes: 'rounded'})
                        this.setState({ doing: false });
                    }); 
                });
            });            
        });                 
    }
}    
  

  toEdit = () => {
    this.setState({
        edit:true
    });
  }

  toNormal = () => {
    this.setState({
        edit:false
    });
  }

  handleInput = (e) => {
    const {value, id} = e.target;
    this.setState({
      [id]: value
    });
  }

  componentDidMount(){
        document.dispatchEvent(new Event('component'));
  }

  render(){    

    return(

        <div className = "container">
            <br></br>
            <br></br>
            <h5 className = "center-align"><FormattedMessage id="MyAccount"/></h5>
            <br></br>

            <table>
                <tbody>
                    <tr>
                        <td><FormattedMessage id="Names"/></td>
                        {
                            this.state.edit?
                            <td>
                                <input id="user_names" type="text" className="validate" value = {this.state.user_names} onChange = {this.handleInput}/>
                            </td>
                            :<td>{this.state.user_names}</td>
                        }
                        
                    </tr>
                    <tr>
                        <td><FormattedMessage id="LastNames"/></td>
                        {
                            this.state.edit?
                            <td>
                                <input id="user_lastnames" type="text" className="validate" value = {this.state.user_lastnames} onChange = {this.handleInput}/>
                            </td>
                            :<td>{this.state.user_lastnames}</td>
                        }
                    </tr>
                    <tr>
                        <td><FormattedMessage id="E-mail"/></td>
                        {
                            this.state.edit?
                            <td>
                                <input id="user_email" type="text" className="validate" value = {this.state.user_email} onChange = {this.handleInput}/>
                            </td>
                            :<td>{this.state.user_email}</td>
                        }
                    </tr>
                    <tr>
                        <td><FormattedMessage id="Password"/></td>
                        {
                            this.state.edit?
                            <td>
                                <input id="user_password" type="text" className="validate" value = {this.state.user_password} onChange = {this.handleInput}/>
                            </td>
                            :<td>********</td>
                        }
                    </tr>                    
                </tbody>
            </table>

            <br></br>
            
            {
                this.state.edit?
                <div className = "row">
                    <div className= "col s6">
                        <div className="file-field input-field">
                            <div className="btn teal darken-3">
                                <span><FormattedMessage id="ProfileImage"/></span>
                                <input type="file" ref={(ref) => { this.uploadProfile = ref; }}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" value = {this.state.user_image} readOnly/>
                            </div>
                        </div>
                    </div>
                    <div className= "col s6">
                        <div className="file-field input-field">
                            <div className="btn teal darken-3">
                                <span><FormattedMessage id="BannerImage"/></span>
                                <input type="file" ref={(ref) => { this.uploadBanner = ref; }}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" value = {this.state.user_banner} readOnly/>
                            </div>
                        </div>
                    </div>              
                </div>
                :<div className = "row">
                    <div className= "col s6">
                        <div className="file-field input-field">                            
                            <div className="file-path-wrapper">
                                <input disabled className="file-path validate" type="text" value = {'Profile image: ' + this.state.user_image} readOnly/>
                            </div>
                        </div>
                    </div>
                    <div className= "col s6">
                        <div className="file-field input-field">                            
                            <div className="file-path-wrapper">
                                <input disabled className="file-path validate" type="text" value = {'Banner image: ' + this.state.user_banner} readOnly/>
                            </div>
                        </div>
                    </div>              
                </div>
            }
            
            <br></br>

            {
                this.state.doing?
                <div>
                  <div className="progress pink lighten-5">
                      <div className="indeterminate pink darken-4"></div>
                  </div>
                  <br></br>
                </div>
                :null
            }

            <center>
            {
                this.state.edit?
                <div>
                    <a onClick ={this.toNormal} className="waves-effect waves-light btn red darken-4"><FormattedMessage id="Cancel"/></a>
                    {" "}                 
                    <a onClick ={this.handleSubmit} className="waves-effect waves-light btn grey darken-4"><FormattedMessage id="Done"/></a>
                </div>
                :<a onClick ={this.toEdit} className="waves-effect waves-light btn grey darken-4"><FormattedMessage id="ChangePAS"/></a>
            }                
            </center>

            <br></br>

        </div>
    )     
  }  
}