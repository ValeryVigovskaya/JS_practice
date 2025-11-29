function sortFilms(data) {
  const sortedArr = data.sort((a, b) => {
    if (a.rating != b.rating) {
      return b.rating - a.rating;
    } else if (b.year != a.year) {
      return b.year - a.year;
    } else {
      let wordsA = a.title.split(" ");
      let wordsB = b.title.split(" ");
      if (wordsA[0] != wordsB[0]) {
        return wordsB[0].localeCompare(wordsA[0]);
      } else {
        for (let i = 0; i < Math.max(wordsA.length, wordsB.length); i++) {
          const wordA = wordsA[i] || "";
          const wordB = wordsB[i] || "";

          if (wordA !== wordB) {
            return wordA.localeCompare(wordB);
          }
        }
      }
      return 0;
    }
  });
  return sortedArr
    .map((el) => `${el.title} (${el.rating}, ${el.year})`)
    .join(", ");
}

console.log(
  sortFilms([
    { title: "Игра престолов", rating: 9.3, year: 2011 },
    { title: "Во все тяжкие", rating: 9.3, year: 2008 },
    { title: "Бесстыжие", rating: 8.7, year: 2011 },
  ])
);

function sortCategory(data) {
  const sortedArrByCategory = data.toSorted((a, b) =>
    a.name.localeCompare(b.name)
  );
  return sortedArrByCategory.map((el) => {
    return {
      name: el.name,
      subcategories: el.subcategories.toSorted(
        (a, b) => b.popularity - a.popularity
      ),
    };
  });
}

console.log(sortCategory([]));
