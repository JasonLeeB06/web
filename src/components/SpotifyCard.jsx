import { createSignal, onCleanup, onMount } from 'solid-js';
import "../scss/SpotifyCard.scss";

const SpotifyCard = () => {
  const [song, setSong] = createSignal(null);
  const [progress, setProgress] = createSignal(0);
  let intervalRef = null;

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:4321/api/now-playing");
      const data = await res.json();
      setSong({
        ...data,
        release_date: new Date(data.release_date).toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      });
      setProgress((data.progress_ms / data.duration_ms) * 100);
    } catch (error) {
      console.error('Fehler beim Abrufen der Now-Playing-Daten:', error);
    }
  };

  const updateProgress = () => {
    if (song() && song().isPlaying) {
      const progressPercentage = (song().progress_ms / song().duration_ms) * 100;
      setProgress(progressPercentage);
    }
  };
  

  onMount(() => {
    fetchData();
    intervalRef = setInterval(() => {
      fetchData();
      updateProgress();
    }, 1000);

    onCleanup(() => clearInterval(intervalRef));
  });

  return (
    <div>
      {song() && song().isPlaying ? (
        <div class="spotify-card">
          <img src={song().albumImageUrl} alt="Album Cover" class="album-cover" />
          <div class="song-info">
            <a href={song().songUrl} target="_blank" class="song-title">Song: {song().title}</a>
            <p class="artist">Artist: {song().artist}</p>
            <p class="album">Album: {song().album}</p>
            <p class="release-date">{song().release_date}</p>
            <div class="progress-bar">
              <div class="progress" style={{ width: `${progress()}%` }}></div>
            </div>
          </div>
        </div>
      ) : (
        <p class="not-playing">Derzeit wird nichts abgespielt auf Spotify.</p>
      )}
    </div>
  );
};

export default SpotifyCard;
