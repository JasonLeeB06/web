export async function GET() {
  const client_id = 'aca98475f117460eb50dc8c7912f1d09';
  const redirect_uri = encodeURIComponent('https://jasonb.de/api/now-playing');
  const scope = encodeURIComponent('user-read-currently-playing');

  return new Response(null, {
      status: 302,
      headers: {
          Location: `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`,
      },
  });
}
