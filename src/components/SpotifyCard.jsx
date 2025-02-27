import { createSignal, onCleanup, onMount } from 'solid-js';
import '../scss/SpotifyCard.scss';

const SpotifyCard = () => {
  const [song, setSong] = createSignal(null);
  const [progress, setProgress] = createSignal(0);
  const [currentTime, setCurrentTime] = createSignal('0:00');
  
  let intervalRef, progressIntervalRef;

  const fetchData = async () => {
    try {
      const res = await fetch("https://api.jasonb.de/api/now-playing");
      const data = await res.json();

      if (data?.isPlaying) {
        setSong({
          ...data,
          release_date: new Date(data.release_date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
        });
        setProgress((data.progress_ms / data.duration_ms) * 100);
        setCurrentTime(formatTime(data.progress_ms));
      } else {
        setSong(null);
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Now-Playing-Daten:', error);
    }
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  onMount(() => {
    fetchData();
    intervalRef = setInterval(fetchData, 1000);

    progressIntervalRef = setInterval(() => {
      if (song()) {
        setProgress((prev) => Math.min(prev + (1000 / song().duration_ms) * 100, 100));
        setCurrentTime((prev) => formatTime(song().progress_ms + 1000));
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
            <a href={song().songUrl} class="song-title">{song().title}</a>
            <p class="artist">Artist: {song().artist}</p>
            <p class="album">Album: {song().album}</p>
            <p class="release-date">{song().release_date}</p>
            <div class="progress-bar">
              <div class="progress" style={{ width: `${progress()}%` }}></div>
            </div>
            <div class="time-info">
              <span>{currentTime()}</span> / <span>{formatTime(song().duration_ms)}</span>
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