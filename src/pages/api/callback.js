import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: 'aca98475f117460eb50dc8c7912f1d09',
  clientSecret: 'e894bc79c3ce45c0b91db8f01be5d04e',
  redirectUri: 'https://jasonb.de/api/callback'
});

export async function GET({ request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Authorization code not provided', { status: 400 });
  }

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const access_token = data.body['access_token'];
    const refresh_token = data.body['refresh_token'];

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    return new Response(JSON.stringify({ refresh_token }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Fehler beim Abrufen des Tokens:', error);
    return new Response(JSON.stringify({ error: 'Fehler beim Abrufen des Tokens' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
