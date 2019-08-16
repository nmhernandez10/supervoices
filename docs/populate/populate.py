import json
import csv
import requests
import pandas as pd

class Populate:

    def __init__(self):
        print("Starting files writting")     

    def readfile(self):
        print('xd') 

    def writeFile(self, regular):
        token = "BQAIKRtWESfs36jQCV_mAgjyk75bx-TXCjnOM_5t8Q_2UoH6pwTry5t0t_Lyr0ANBdy-0MPGvxaveSxzk0sbeQTPNfl_ZQKKhx5CZd03VvLzS19oUwlurJME30ShXkDggO91XDsVf73ND6Y"
        print("Writting " + regular)
        endpoint = "https://api.spotify.com/v1/search?q=year:"+regular+"&type=artist&limit=50&access_token="+token

        r = requests.get(url = endpoint)
        data = r.json()['artists']['items']

        songfile = open('./songs.csv', 'a', newline='')
        artistfile = open('./artists.csv', 'a', newline='')
        albumfile = open('./albums.csv', 'a', newline='')
        songfilewriter = csv.writer(songfile) 
        artistfilewriter = csv.writer(artistfile)
        albumfilewriter = csv.writer(albumfile)

        for datartist in data:

            endpoint = 'https://api.spotify.com/v1/search?q=artist:"'+datartist['name']+'"&type=album&limit=10&access_token='+token
            r = requests.get(url = endpoint)
            dataalbums = r.json()['albums']['items']

            for edataalbum in dataalbums:

                epalbum = "https://api.spotify.com/v1/albums/"+edataalbum['id']+"?access_token="+token
                ralbum = requests.get(url = epalbum)
                datalbum = ralbum.json()
                datasongs = datalbum['tracks']['items']

                for dat in datasongs:

                    try:                    
                        artist = {"artist_name": datartist['name'], "artist_genre":datartist['genres'][0], "artist_likes": 0, "artist_image": datartist['images'][0]['url'], "artist_identifier": datartist['id']}
                        song = {"song_name":dat['name'], "song_duration":dat['duration_ms'], "song_likes": 0, "song_identifier":dat['id'], "AlbumId": edataalbum['id']}
                        album = {"album_name":edataalbum['name'], "album_likes": 0, "album_releasedate":edataalbum['release_date'], "album_image":edataalbum['images'][0]['url'], "album_identifier": edataalbum['id'], "ArtistId": datartist['id']}
                        albumfilewriter.writerow(album.values())
                        artistfilewriter.writerow(artist.values())
                        songfilewriter.writerow(song.values())
                        print('Data set added correctly in group '+regular)
                    except:
                        print('Data set couldnt be added in group '+regular)

        songfile.close()
        albumfile.close()
        artistfile.close()
    
    def loadToDB(self):

        ip = '172.24.41.67:8082'
        dfartists = pd.read_csv('./unique/artists.csv', encoding="cp1252", header=None)
        dfalbums = pd.read_csv('./unique/albums.csv', encoding="cp1252", header=None)
        dfsongs = pd.read_csv('./unique/songs.csv', encoding="cp1252", header=None)
        dfartists = dfartists.T
        dfalbums = dfalbums.T
        dfsongs = dfsongs.T

        for row in dfartists:

            artist={'artist_name' : dfartists[row][0],
            'artist_genre' : dfartists[row][1],
            'artist_likes' : dfartists[row][2],
            'artist_image' : dfartists[row][3],
            'artist_identifier' : dfartists[row][4]}

            r = requests.post(url= 'http://'+ip+'/api/artist', json=artist)

            if(r.status_code < 300):
                print("Artistas posteados: ", row+1)
            else:
                print("Artista "+str(row+1)+" tuvo un error")


        for row in dfalbums:            

            r = requests.get(url = 'http://'+ip+'/api/artistbyidentifier/'+dfalbums[row][5])   

            album={'album_name' : dfalbums[row][0],            
            'album_likes' : dfalbums[row][1],
            'album_releasedate' : dfalbums[row][2],
            'album_image' : dfalbums[row][3],
            'album_identifier' : dfalbums[row][4]}

            try:
                artist = r.json()

                r = requests.post(url= 'http://'+ip+'/api/artist/'+str(artist['id'])+'/album', json=album)

                if(r.status_code < 300):
                    print("Albums posteados: ", row+1)
                else:
                    print("Album "+str(row+1)+" tuvo un error")
            except:
                print("Album "+str(row+1)+" no tiene artista registrado")


        for row in dfsongs):            

            r = requests.get(url = 'http://'+ip+'/api/albumbyidentifier/'+dfsongs[row][4])        

            song={'song_name' : dfsongs[row][0],            
            'song_duration' : dfsongs[row][1],
            'song_likes' : dfsongs[row][2],
            'song_identifier' : dfsongs[row][3]}

            try:
                album = r.json()

                r = requests.post(url= 'http://'+ip+'/api/artist/'+str(album['ArtistId'])+'/album/'+str(album['id'])+'/song', json=song)

                if(r.status_code < 300):
                    print("Songs posteados: ", row+1)
                else:
                    print("Song "+str(row+1)+" tuvo un error")
            except:
                print("Song "+str(row+1)+" no tiene álbum registrado")

populate = Populate()
populate.loadToDB()

""" letters = ['2019']
for letter in letters:
    populate.writeFile(letter) """