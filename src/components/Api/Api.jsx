async function fetchPhoto(query, page) {
  return await fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=30100750-b02cb32f61256b4afede3508c&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`Изображение с именем ${query} не найдено`)
    );
  });
}

const api = { fetchPhoto };

export default api;
