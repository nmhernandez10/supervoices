import React, {Component} from 'react';
import { FormattedMessage } from 'react-intl';

export default class Playlists extends Component{

  state = {
    user: this.props.user,
    adding: false,
    playlist_name: '',
    playlistToAdd : {},
    roomToAdd: {}
  }

  toAdd = () =>{
    this.setState({
      adding: true
    });
  }

  cancelAdd = () =>{
    this.setState({
      playlistToAdd:{},
      roomToAdd: {}
    });
  }

  setPlaylistToAdd = (playlist) =>{
    this.setState({
      playlistToAdd: playlist
    });
  }

  setRoomToAdd = (room) =>{
    this.setState({
      roomToAdd: room
    });
  }

  addPlaylistToRoom = () =>{
    const new_room = {chatroom_name: this.state.roomToAdd.chatroom_name, chatroom_mediaidentifier: 'playlist:'+this.state.playlistToAdd.id};
      
    fetch('/api/user/'+this.state.user.id + '/chatroom/'+this.state.roomToAdd.id,{
      method: 'PUT',
      body: JSON.stringify(new_room),
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
          let idUser = this.state.user.id;
          fetch('/api/user/'+idUser).then(res => res.json()).then(updatedUser => {  
            this.setState({
              playlistToAdd:{},
              roomToAdd: {}
            }, () =>{
              this.props.updateProfile(updatedUser);  
              M.toast({html:'Playlist correctly added to room', classes: 'rounded'});
            });             
          });                   
      }).catch(error => M.toast({html:error.message, classes: 'rounded'}));
  }
  
  addPlaylist = () =>{
    if(this.state.playlist_name != ''){

      const new_playlist = {playlist_name: this.state.playlist_name}

      fetch('/api/user/'+this.state.user.id+'/playlist',{
        method: 'POST',
        body: JSON.stringify(new_playlist),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}).then(res => {              
          if(res.ok){
            return res.json();                
          } 
          else{
            throw new Error("Playlist could not be created");
        }}).then(data => {          
          this.setState({
            adding: false,
            playlist_name: ''
          }, () => {                       
            let idUser = this.state.user.id;
            fetch('/api/user/'+idUser).then(res => res.json()).then(updatedUser => {              
                this.props.updateProfile(updatedUser);  
                this.setState({
                  user:updatedUser
                },()=>{
                  if(this.state.user.Playlists.length == 1){
                    document.dispatchEvent(new Event('component'));
                  }
                  M.toast({html:'Your playlist has been created correctly', classes: 'rounded'});
                });                                               
            }); 
          });
        }).catch(error => M.toast({html:error.message, classes: 'rounded'}));      
    }
    else{
      M.toast({html: 'You must provide a valid name for a playlist', classes: 'rounded'});
    }  
  }

  deletePlaylist = (playlist) =>{

    fetch('/api/user/'+this.state.user.id+'/playlist/'+playlist.id,{
      method: 'DELETE'
      }).then(res => {              
        if(res.ok){
          return res.json();                
        } 
        else{
          throw new Error("Playlist could not be deleted");
      }}).then(data => {
        let idUser = this.state.user.id;
        fetch('/api/user/'+idUser).then(res => res.json()).then(updatedUser => {              
            this.props.updateProfile(updatedUser); 
            this.setState({
              user:updatedUser
            },()=>M.toast({html:'Your playlist has been deleted correctly', classes: 'rounded'}));                                 
        });     
      }).catch(error => M.toast({html:error.message, classes: 'rounded'}));    
  }

  deleteSongFromPlaylist = (playlist, song) => {
    fetch('/api/user/'+this.state.user.id+'/playlist/'+playlist.id+'/song/'+song.id,{
      method: 'DELETE'
      }).then(res => {              
        if(res.ok){
          return res.json();                
        } 
        else{
          throw new Error("Song could not be deleted");
      }}).then(data => {
        let idUser = this.state.user.id;
        fetch('/api/user/'+idUser).then(res => res.json()).then(updatedUser => {              
            this.props.updateProfile(updatedUser); 
            this.setState({
              user:updatedUser
            },()=>M.toast({html:'Song correctly deleted from playlist', classes: 'rounded'}));                                 
        });     
      }).catch(error => M.toast({html:error.message, classes: 'rounded'}));   
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

  buildSongs=(playlist)=>{
    const songs = playlist.PlaylistSongs.map((playlistsong, i)=>{
      return (
      <li key = {playlistsong.id} className="collection-item avatar">
        <img alt="image" src={playlistsong.Song.Album.album_image} alt="" className="circle"/>
        <span className="title">{playlistsong.Song.song_name}</span>
        <p>
          <b><FormattedMessage id="Album"/>: </b>{playlistsong.Song.Album.album_name} <br></br>
          <b><FormattedMessage id="Artist"/>: </b>{playlistsong.Song.Album.Artist.artist_name}
        </p>
        <a className="red-text text-darken-4 secondary-content" onClick = {()=>{this.deleteSongFromPlaylist(playlist, playlistsong.Song)}} href="#!"><i className="material-icons">delete</i></a>
      </li>)
    });

    return songs;
  }

  buildRoomsDrops = () =>{
    const drops = this.state.user.Chatrooms.map((room,i)=>{
      return(
        <li key = {room.id}><a onClick = {() => this.setRoomToAdd(room)} href="#!">{room.chatroom_name}</a></li>
      )
    });

    return drops;
  }

  render(){  
      
    const playlists = this.state.user.Playlists.map((playlist,i) =>{
        return(
          <li key = {i}>
            <div className="collapsible-header"><i className="material-icons">format_list_bulleted</i>{playlist.playlist_name}</div>
            <div className="collapsible-body">
              <center><h5>{playlist.playlist_name}</h5></center>
              <br></br>
              <ul className="collection">
                {this.buildSongs(playlist)}
              </ul>
              <br></br>
              <center>
                <a onClick = {() => this.setPlaylistToAdd(playlist)} className="waves-effect modal-trigger waves-light btn grey darken-2" href="#addPlaylistRoomModal"><FormattedMessage id="AddToRoom"/></a>
                {" "}
                <a onClick = {() => this.deletePlaylist(playlist)} className="waves-effect waves-light btn red darken-4"  href="#!"><FormattedMessage id="Delete"/></a>
              </center>
            </div>
          </li>
        )
    });

    return(

        <div className = "container">

            <br></br>
            <br></br>
            <h5 className = "center-align"><FormattedMessage id="MyPlaylists"/></h5>
            <br></br>
            {
              this.state.user.Playlists.length > 0?
              <ul className="collapsible popout">
                {playlists}
              </ul>
              :null
            }
            
            <br></br>
            {
                this.state.adding?                            
                <div className = "row">
                  <center>
                    <div className = "container">
                      <div className = "col s11">                  
                        <input id="playlist_name" placeholder = "Name of playlist" type="text" className="validate" onChange = {this.handleInput}/>
                      </div>
                      <div className = "col s1">  
                        <a onClick = {this.addPlaylist} className="btn-floating btn-medium waves-effect waves-light green darken-3"><i className="material-icons right ">check</i></a>
                      </div>
                    </div>
                  </center>
                </div>
                :<center>
                  <a onClick = {this.toAdd} className="btn-floating btn-large waves-effect waves-light grey darken-2"><i className="material-icons">add</i></a>
                </center> 
            }

            {/* Modals */}

            <div id="addPlaylistRoomModal" className="modal">
              <div className="modal-content">
                <h4><FormattedMessage id="AddPlaylistToRoom"/></h4>
                <p><b><FormattedMessage id="Playlist"/> <FormattedMessage id="Selected"/>: </b>{this.state.playlistToAdd.playlist_name}</p>
                {
                  this.state.user.Chatrooms.length>0?
                  <div>
                    <p><FormattedMessage id="AddToRoomM1"/> <FormattedMessage id="Playlist"/> <FormattedMessage id="AddToRoomM2"/></p>
                    <p><b>Room selected: </b></p><a className='dropdown-trigger btn' data-target='dropdownSongRoom'>{!this.state.roomToAdd.chatroom_name?'Select Room':this.state.roomToAdd.chatroom_name}</a>
                    <ul id='dropdownSongRoom' className='dropdown-content'>
                      {this.buildRoomsDrops()}
                    </ul>
                    <p><i><FormattedMessage id="AddToRoomM3"/></i></p>
                  </div>
                  :<p><FormattedMessage id="AddToRoomM4"/></p>
                }            
              </div>
              <div className="modal-footer">
                <a onClick = {this.cancelAdd} href="#!" className="modal-close waves-effect waves-green btn-flat"><FormattedMessage id="Cancel"/></a>
                {this.state.roomToAdd.chatroom_name?<a onClick = {this.addPlaylistToRoom}  href="#!" className="modal-close waves-effect waves-green btn-flat"><FormattedMessage id="Done"/></a>:null}
              </div>
            </div>
                 

        </div>
    )     
  }  
}