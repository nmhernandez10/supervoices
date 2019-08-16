import React, {Component} from 'react';

export default class PostLikes extends Component{  

  state = {
    post: this.props.post,
    user: this.props.user
  }

  likePost = () => {
    const new_post = {post_likes: this.state.post.post_likes+1};
      
    fetch('/api/user/'+this.state.user.id + '/post/'+this.state.post.id,{
      method: 'PUT',
      body: JSON.stringify(new_post),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}).then(res => {              
        if(res.ok){
          return res.json();                
        } 
        else{
          throw new Error("Has ocurred any problem trying to like this post");
      }}).then(data => {
          this.setState({
              post: data
          });     
      }).catch(error => M.toast({html:error.message, classes: 'rounded'}));
  }

  componentDidMount(){ 
    document.dispatchEvent(new Event('component'));    
  }

  render(){

   return(
    <div className= "valign-wrapper"><i className="material-icons">favorite</i>{" "}{this.state.post.post_likes}<a className ="deep-orange-text text-darken-1" onClick={this.likePost} href="#!"><i className="material-icons right">thumb_up</i></a></div>
   )    
  }  
}
