import getGenres from './get-genres';
import { getLibraryList } from './local-storage';

export default function getSelectByGenres() {
    const libraryList = Array.from(
        new Set(
            getLibraryList()
                .map(({ genre_ids }) => genre_ids)
                .flat()
        )
    );
    const arrayGenres = getGenres().filter(({ id }) => libraryList.includes(id));

    return arrayGenres
        .map(genre => {
            return `<option class="lib-option lib-spec" value="${genre.id}">${genre.name}</option>`;
        })
        .join('');
}

