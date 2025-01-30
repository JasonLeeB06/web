import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: 'aca98475f117460eb50dc8c7912f1d09',
  clientSecret: 'e894bc79c3ce45c0b91db8f01be5d04e',
  redirectUri: 'https://jasonb.de/api/callback'
});

spotifyApi.setRefreshToken('AQBpyMqqPqDO_13yjZV4QUQQGreZP9yW-1w0d88YFcDagEvMoD3UH_RvlK9SqURrnrTNld7Kh-Mejn3cDjhBDj65SVJDRPkte7vZQ1AXZHWxTK78yqfarTJd2M2UC2LGFaI');

async function refreshAccessTokenAndFetchNowPlaying() {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const access_token = data.body['access_token'];
    spotifyApi.setAccessToken(access_token);

    const nowPlaying = await spotifyApi.getMyCurrentPlayingTrack();

    if (nowPlaying.body && nowPlaying.body.is_playing) {
      const song = nowPlaying.body.item;
      const isPlaying = nowPlaying.body.is_playing;
      const title = song.name;
      const artist = song.artists.map((artist) => artist.name).join(', ');
      const album = song.album.name;
      const albumImageUrl = song.album.images[0].url;
      const songUrl = song.external_urls.spotify;
      const progress_ms = nowPlaying.body.progress_ms;
      const duration_ms = song.duration_ms;
      const release_date = song.album.release_date;

      return {
        album,
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
        progress_ms,
        duration_ms,
        release_date
      };
    } else {
      return { isPlaying: false };
    }
  } catch (error) {
    console.error('Fehler beim Abrufen des aktuellen Songs:', error);
    throw new Error('Fehler beim Abrufen des aktuellen Songs');
  }
}

export async function GET() {
  try {
    const nowPlayingData = await refreshAccessTokenAndFetchNowPlaying();
    return new Response(JSON.stringify(nowPlayingData), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Fehler beim Abrufen des aktuellen Songs' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
