export const mapGenreIdsToNames = (genreIds, genres) => {
    const genreMap = genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
  
    return genreIds.map(id => genreMap[id] || 'Unknown');
  };