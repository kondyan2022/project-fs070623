export default function getFiveStar(count) {
  const numStar = Math.round(count);
  return Array(5)
    .fill(0)
    .map((a, b) => {
      return numStar - 2 * (b + 1) >= 0
        ? '<div class="star"></div>'
        : numStar - 2 * (b + 1) + 1 == 0
        ? '<div class="star-half"></div>'
        : '<div class="star-outline"></div>';
    })
    .join('');
}
