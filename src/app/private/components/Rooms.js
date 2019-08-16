import React, {Component} from 'react';
import { FormattedMessage } from 'react-intl';

export default class Rooms extends Component{

  state = {
    user: this.props.user,
    rooms: this.props.user.Chatrooms,
    selected : 0,
    selectedSong: {},
    chatroom_name: '',
    adding : false
  }

  toAdd = () => {
      this.setState({
          adding: true
      });
  }

  deleteSelected = () => {

    fetch('/api/user/'+this.state.user.id+'/chatroom/'+this.state.rooms[this.state.selected].id,{
        method: 'DELETE'
        }).then(res => {              
          if(res.ok){
            return res.json();                
          } 
          else{
            throw new Error("Room could not be deleted");
        }}).then(data => {
            M.toast({html:'Your room has been deleted correctly', classes: 'rounded'});
            let rooms = [...this.state.rooms];
            rooms.splice(parseInt(this.state.selected),1);
            this.setState({
                rooms: rooms,
                selected: this.state.selected > 0? this.state.selected-1:0
            }, () => {
                let updatedUser = this.state.user;
                updatedUser.Chatrooms = rooms;
                this.props.updateProfile(updatedUser);
              });
        }).catch(error => M.toast({html:error.message, classes: 'rounded'}));
  }

  addRoom = () => {
    if(this.state.chatroom_name != ''){

        const new_chatroom = {chatroom_name: this.state.chatroom_name}
  
        fetch('/api/user/'+this.state.user.id+'/chatroom',{
          method: 'POST',
          body: JSON.stringify(new_chatroom),
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(res => {              
            if(res.ok){
              return res.json();                
            } 
            else{
              throw new Error("Room could not be created");
          }}).then(data => {
            M.toast({html:'Your room has been created correctly', classes: 'rounded'});
            this.setState({
                rooms: [...this.state.rooms,data],
                adding: false
            }, () => {                
                let updatedUser = this.state.user;
                updatedUser.Chatrooms = this.state.rooms;
                this.props.updateProfile(updatedUser);
              });
          }).catch(error => M.toast({html:error.message, classes: 'rounded'}));      
      }
      else{
        M.toast({html: 'You must provide a valid name for a room', classes: 'rounded'});
      }           
  }

  selectRoom = (n) => {
    this.setState({
      selected: n,
      selectedSong: {}
    });
  }

  selectPlaylistSong = (song) =>{
    this.setState({
      selectedSong: song
    });
  }

  buildSpotifyPath=(playlistsong)=>{
    let chains = this.state.rooms[this.state.selected].chatroom_mediaidentifier.split(":");
    if (chains[0]=='album'){
      return 'album/'+chains[1]
    }
    else if(chains[0]=='song'){
      return 'track/'+chains[1]
    }
    else if(chains[0]=='artist'){
      return 'artist/'+chains[1]
    }
    else if(chains[0]=='playlist'){
      return 'track/'+ playlistsong.song_identifier
    }
  }

  handleInput = (e) => {
    const {value, id} = e.target;
    this.setState({
      [id]: value
    });
  }

  buildPlaylistRoom = (playlist_id) => {

    let playlist = this.state.user.Playlists.filter(playlist => playlist.id == playlist_id);   
    playlist = playlist[0]; 

    if(playlist.PlaylistSongs.length > 0){

      const songs = playlist.PlaylistSongs.map((playlistsong, i)=>{

        const song = playlistsong.Song;

        if(this.state.selectedSong.id == song.id){
            return(            
                <a key = {i} href="#!" className="collection-item active">{song.song_name}</a>
            )
        }
        else{
            return(            
                <a key = {i} className = "teal-text text-darken-4" onClick = {() => this.selectPlaylistSong(song)} href="#!" className="collection-item">{song.song_name}</a>
            )
        }        
      });

      return(
        <div className = "row">
          <div className = "col s4">
            <center>
              <p><b><FormattedMessage id="Playlist"/>: </b>{playlist.playlist_name}</p>
              <br></br>
              <div className = "collection">
                {songs}
              </div>
            </center>
          </div>
          <div className = "col s8">
            <center>
              {
                this.state.selectedSong.song_identifier?
                <iframe title="media" src={"https://open.spotify.com/embed/"+this.buildSpotifyPath(this.state.selectedSong)} width={window.innerWidth*0.20} height="300" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                :
                <div className = "container">
                    <br></br>
                    <h6><FormattedMessage id="RoomM2"/></h6>
                </div>
              }              
            </center>
          </div>
        </div>    
      )
    }
    else{
      return(<h6><FormattedMessage id="RoomM3"/></h6>)
    }
  }

  componentDidMount(){    
    document.dispatchEvent(new Event('component'));
  }

  render(){    

    const rooms = this.state.rooms.map((room, i)=>{
        if(this.state.selected == i){
            return(            
                <a key = {i} href="#!" className="collection-item active pink darken-2">{room.chatroom_name}</a>
            )
        }
        else{
            return(            
                <a key = {i} onClick = {() => this.selectRoom(i)} href="#!" className="pink-text text-darken-1 collection-item">{room.chatroom_name}</a>
            )
        }        
    });

    const selectedRoom = this.state.rooms[this.state.selected];

    return(

        <div className = "container">

            <br></br>
            <br></br>
            <h5 className = "center-align"><FormattedMessage id="MyRooms"/></h5>
            <br></br>

            <div className = "row">

                <div className = "col s4">

                    {
                        this.state.rooms.length > 0?
                        <div className = "collection">
                            {rooms}
                        </div>
                        :null
                    }

                    {                        
                        this.state.adding?                            
                        <div className = "row">
                            <center>
                                <div className = "container">
                                    <div className = "col s12 l9">                  
                                        <input id="chatroom_name" placeholder = "Name of room" type="text" className="validate" onChange = {this.handleInput}/>
                                    </div>
                                    <div className = "col s12 l3">
                                        <a onClick = {this.addRoom} className="btn-floating btn-medium waves-effect waves-light green darken-3"><i className="small material-icons right ">check</i></a>
                                    </div> 
                                </div>                               
                            </center>
                        </div>
                        :this.state.rooms.length < 10?
                        <center>
                            <a onClick = {this.toAdd} className="btn-floating btn-large waves-effect waves-light grey darken-2"><i className="material-icons">add</i></a>
                        </center> 
                        :null
                    }
                    
                </div>

                <div className = "col s8">
                {
                    this.state.rooms.length > 0?
                    <div className="card large">                                       
                        <div className="card-content">
                          <center>
                            <span className="card-title grey-text text-darken-4">{selectedRoom.chatroom_name}</span>                           
                          
                            {
                              selectedRoom.chatroom_mediaidentifier?
                              <div>
                                <div className="chip pink darken-1">
                                  <p className="grey-text text-lighten-5">{selectedRoom.chatroom_mediaidentifier.split(":")[0]}</p>
                                </div>
                                <br></br> 
                                <br></br>
                                {
                                  selectedRoom.chatroom_mediaidentifier.split(":")[0]=='playlist'?
                                  <div>
                                    {this.buildPlaylistRoom(Number(selectedRoom.chatroom_mediaidentifier.split(":")[1]))}
                                  </div>
                                  :<iframe title="media" src={"https://open.spotify.com/embed/"+this.buildSpotifyPath({})} width={window.innerWidth*0.25} height="300" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                                }                       
                                
                              </div>
                              :<p><i><FormattedMessage id="RoomM1"/></i></p>
                            }
                          </center>
                        </div>
                        <div className="card-action">
                          <a className="red-text text-darken-4" onClick = {this.deleteSelected} href="#"><i className="material-icons right">delete</i></a>
                        </div>
                    </div>
                :<center><h6><FormattedMessage id="RoomM4"/></h6></center>
                }               
                </div>

            </div>
                      

        </div>
    )     
  }  
}