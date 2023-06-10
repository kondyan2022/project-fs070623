export default function getGenres() {
  const { genres } = JSON.parse(localStorage.getItem('genres')) ?? {
    genres: [],
  };
  return genres;
}
