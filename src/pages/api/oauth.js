export async function GET() {
    const client_id = 'aca98475f117460eb50dc8c7912f1d09';
    const redirect_uri = 'http://localhost:4321/api/now-playing';
    const scope = 'user-read-currently-playing';
  
    return Response.redirect(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`);
  }
  