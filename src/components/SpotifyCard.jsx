import { createSignal, onCleanup, onMount } from 'solid-js';
import '../scss/SpotifyCard.scss';

const SpotifyCard = () => {
  const [song, setSong] = createSignal(null);
  const [progress, setProgress] = createSignal(0);
  let intervalRef = null;
  let progressIntervalRef = null;

  // Funktion zum Abrufen der Daten
  const fetchData = async () => {
    try {
      const res = await fetch("https://api.jasonb.de/api/now-playing");
      const data = await res.json();
      
      if (data && data.isPlaying) {
        setSong({
          ...data,
          release_date: new Date(data.release_date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
        });
        setProgress((data.progress_ms / data.duration_ms) * 100);
      } else {
        setSong(null);
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Now-Playing-Daten:', error);
    }
  };

  onMount(() => {
    fetchData();
    intervalRef = setInterval(fetchData, 2000);

    progressIntervalRef = setInterval(() => {
      if (song()) {
        setProgress(prev => prev + (1000 / song().duration_ms) * 100);
      }
    }, 2000);

    onCleanup(() => {
      clearInterval(intervalRef);
      clearInterval(progressIntervalRef);
    });
  });

  return (
    <div>
      {song() ? (
        <div class="spotify-card">
          <img src={song().albumImageUrl} alt="Album Cover" class="album-cover" />
          <div class="song-info">
            <a href={song().songUrl} target="_blank" class="song-title">{song().title}</a>
            <p class="artist">Artist: {song().artist}</p>
            <p class="album">Album: {song().album}</p>
            <p class="release-date">{song().release_date}</p>
            <div class="progress-bar">
              <div class="progress" style={{ width: `${progress()}%` }}></div>
            </div>
            <div class="time-info">
              <span>{formatTime(song().progress_ms)}</span>
              <span>{formatTime(song().duration_ms - song().progress_ms)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div class="spotify-placeholder">
          <div class="placeholder-icon">🎵</div>
          <p class="placeholder-text">Es wird derzeit kein Lied abgespielt.</p>
        </div>
      )}
    </div>
  );
};

export default SpotifyCard;
