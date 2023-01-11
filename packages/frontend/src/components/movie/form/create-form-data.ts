export const createMovieFormData = (data: any) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    switch (key) {
      case 'averageRate':
      case 'countVotes':
        break;
      case 'releaseDate':
        data[key] && formData.append(key, new Date(data[key]).toISOString());
        break;
      case 'genres':
      case 'actors':
      case 'countries':
      case 'directors':
        data[key] &&
          data[key].forEach((el: string) => formData.append(key, el));
        break;
      default:
        data[key] && formData.append(key, data[key]); //: formData.append(key, "");
    }
  });

  return formData;
};
