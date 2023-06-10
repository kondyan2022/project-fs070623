// Функція для збереження даних у локальному сховищі
export const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Функція для отримання даних з локального сховища
export const loadFromLocalStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : undefined;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return undefined;
  }
};

// Функція для видалення даних з локального сховища
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

/**
 * Додає або видаляє фільм з відповідного списку у локальному сховищі.
 *
 * @param {number} id - Ідентифікатор фільму.
 * @param {string} select - Назва списку.
 */
export function addListLibrary(id, select) {
  const sel = select + 'Data';
  const moviesData = loadFromLocalStorage('moviesData');
  const movieData = moviesData.find((movie) => movie.id === id);
  const libArr = loadFromLocalStorage(select) || [];
  const libData = loadFromLocalStorage(sel) || [];
  const index = libArr.indexOf(id);
  if (index < 0) {
    libArr.push(id);
    libData.push(movieData);
  } else {
    libArr.splice(index, 1);
    libData.splice(index, 1);
  }
  saveToLocalStorage(select, libArr);
  saveToLocalStorage(sel, libData);
}

/**
 * Оновлює дані фільмів у локальному сховищі.
 *
 * @param {Object} data - Об'єкт з даними фільмів.
 */
export function moviesDataUpdate(data) {
  saveToLocalStorage('moviesData', data.results);
}
