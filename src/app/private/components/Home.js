import React, {Component} from 'react';
import { FormattedMessage } from 'react-intl';

import PostLikes from './subcomponents/PostLikes'

export default class Home extends Component{  

  state = {
    user: this.props.user,
    fetching: true,
    posts: [],
    post_content: ''
  }

  sortPostsByDate = () => {
    let posts = []
    let partners = this.state.user.Partners

    for(let partner of partners){
      let postsPartner = partner.User.Posts;
      for(let post of postsPartner){
        post.User = partner.User;
        posts.push(post);
      }
    }

    for(let post of this.state.user.Posts){
      post.User= this.state.user;
      posts.push(post);
    }

    posts.sort((postA, postB)=>{
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(postB.createdAt)-new Date(postA.createdAt);
    });

    this.setState({
      posts: posts,
      fetching : false
    });   
  }
  
  deletePost = (post, i) => {
    fetch('/api/user/'+this.state.user.id + '/post/'+post.id,{
      method: 'DELETE',
      }).then(res => {              
        if(res.ok){
          return res.json();                
        } 
        else{
          throw new Error("Has ocurred any problem trying to delte this post");
      }}).then(data => {
          let updatedPosts = [...this.state.posts];
          updatedPosts.splice(i,1);
          this.setState({
            posts: updatedPosts
          }, () =>{
            M.toast({html:'Post correctly deleted', classes: 'rounded'});
          });          
      }).catch(error => M.toast({html:error.message, classes: 'rounded'}));
  }

  addPost = () =>{
    const new_post = {post_content: this.state.post_content};
      
    fetch('/api/user/'+this.state.user.id + '/post',{
      method: 'POST',
      body: JSON.stringify(new_post),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}).then(res => {              
        if(res.ok){
          return res.json();                
        } 
        else{
          throw new Error("Has ocurred any problem trying to add this playlist to that room");
      }}).then(data => {
          data.User = this.state.user;
          this.setState({
            posts: [data, ...this.state.posts]
          }, () =>{
            M.toast({html:'Post correctly added', classes: 'rounded'});
          });          
      }).catch(error => M.toast({html:error.message, classes: 'rounded'}));
  }

  buildPostsCards = () => {
    const cards = this.state.posts.map((post, i) =>{
      return(
        <div key = {post.id} className="col s6 l4 xl3">
          <div className="card horizontal hoverable">
            <div className="card-image">
              <img alt="image" className = "responsive-img" src={"./images/"+post.User.user_image}/>
            </div>
            <div className="card-stacked">
              <div className="card-content">                  
                <center>                
                  <p style={{"fontSize":"20px"}}>{post.post_content}</p>
                  <br></br>
                  <p><b>{post.User.user_names+' '+post.User.user_lastnames}</b></p>
                  <p>{post.createdAt.substring(0,10)+' '+post.createdAt.substring(11,16)}</p>
                </center>
              </div>
              {
                this.state.user.id != post.User.id?
                <div className="card-action"> 
                  <PostLikes post ={post} user={post.User}/>          
                </div>
                :
                <div className="card-action"> 
                  <div className= "valign-wrapper"><i className="material-icons">favorite</i>{" "}{post.post_likes}<a className="red-text text-darken-4 secondary-content" onClick={() => this.deletePost(post, i)} href="#!"><i className="material-icons right">delete</i></a></div>         
                </div>
              }              
            </div>
          </div>
        </div>
      )
    });

    return cards;
  }

  handleInput = (e) => {
    const {value, id} = e.target;
    this.setState({
      [id]: value
    });
  }  

  componentDidMount(){ 
    this.sortPostsByDate(); 
    document.dispatchEvent(new Event('component'));    
  }

  render(){

    return(

      <div>
        <br></br>
        <br></br>
        <h1 style={{"fontSize":"30px"}} className = "center-align"><FormattedMessage id="Home"/></h1>        
        <br></br>
        <div className = "container">
          <div className = "container">            
            <div className="col s12">
              <div className="card small horizontal">
                <div className="card-image">
                  <img alt="image" className="responsive-img" src={"./images/"+this.state.user.user_image}/>
                </div>
                <div className="card-stacked">
                  <div className="card-content">                  
                    <center>
                      <p style={{"fontSize":"20px"}}><FormattedMessage id="WriteANewPost"/></p>
                      <br></br>
                      <div className="input-field">
                        <i className="material-icons prefix">mode_edit</i>
                        <textarea id="post_content" className="materialize-textarea" onChange={this.handleInput}></textarea>
                        <label className="grey-text text-darken-1" htmlFor="post_content"><FormattedMessage id="Content"/></label>
                      </div>
                    </center>
                  </div>
                  <div className="card-action">
                    <center>
                      <a className ="deep-orange-text text-darken-4" onClick={this.addPost} href="#!"><FormattedMessage id="AddPost"/></a>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        {
          this.state.fetching?
          <center>
            <br></br>
            <div className="preloader-wrapper active">
              <div className="spinner-layer">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </center>
          :
          <div className = "row">  
            <center><p style={{"fontSize":"28px"}}><FormattedMessage id="Timeline"/></p></center>
            <br></br>        
            {
              this.state.posts.length >0?
              this.buildPostsCards()
              :
              <center><p style={{"fontSize":"25px"}}><FormattedMessage id="TimelineM"/></p></center>
              }
          </div>
        }
        

                      

      </div>
    )     
  }  
}
