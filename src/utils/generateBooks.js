import { Faker, en, de, fr, fa } from '@faker-js/faker';

const localeMap = {
	'en-US': en,
	'fr-FR': fr,
	'de-DE': de,
};

const createFaker = (locale, seed) => {
	const faker = new Faker({ locale: localeMap[locale] });
	faker.seed(seed);
	return faker;
};

const getRandomCount = (avgLikes, faker) => {
	const spread = 0.5;
	const min = Math.max(0, Math.floor(avgLikes - spread));
	const max = Math.ceil(avgLikes + spread);
	let rough = faker.number.int({ min, max });

	if (avgLikes === 0) rough = faker.number.int(0);

	return rough;
};

const getDate = (locale, faker) => {
	const date = faker.date.between({ from: '1990-01-01', to: new Date() });
	const formatted = date.toLocaleDateString(locale, { year: 'numeric' });

	return formatted;
};

const getTitle = faker => {
	const randomAdjective = faker.number.int({ min: 0, max: 1 });
	const adjective = faker.word.adjective();
	const noun = faker.word.noun();

	return randomAdjective ? `${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${noun}` : `${noun.charAt(0).toUpperCase() + noun.slice(1)}`;
};

const getSecondAuthor = faker => {
	const randomSecondAuthor = faker.number.int({ min: 1, max: 30 });

	return randomSecondAuthor < 2 ? ` & ${faker.person.fullName()}` : '';
};

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

function generateReview(faker, bookIndex) {
	const adjective = faker.word.adjective();
	const noun = faker.word.noun();
	const verb = faker.word.verb();
	const adverb = faker.word.adverb();

	const templates = [`${adjective} ${noun}, ${verb} ${adverb}.`, `${verb} ${noun} — ${adjective}, ${adverb}.`, `${adjective} ${noun}, ${adjective}`, `${noun} ${verb} ${adverb}`, `${adverb} ${verb} ${noun}.`];

	const reviewer = faker.person.fullName();
	const template = faker.helpers.arrayElement(templates);

	return {
		bookIndex,
		reviewer,
		comment: capitalize(template),
	};
}

const getIsbn = faker => {
	faker.commerce.price();

	return faker.commerce.isbn();
};

const getLocaleSeed = (seed, locale) => seed + Array.from(locale).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

export const generateBooks = ({ locale, seed, avgLikes, avgReviews, count }) => {
	const faker = createFaker(locale, seed);
	const isbnFaker = createFaker(locale, getLocaleSeed(seed, locale));
	const books = [];
	const reviews = [];

	for (let i = 0; i < count; i++) {
		const index = i + 1;
		const reviewsCount = getRandomCount(avgReviews, faker);

		const book = {
			index,
			isbn: getIsbn(isbnFaker, locale),
			title: getTitle(faker),
			author: `${faker.person.fullName()}${getSecondAuthor(faker)}`,
			publisher: faker.company.name(),
			date: getDate(locale, faker),
			likesCount: getRandomCount(avgLikes, faker),
			reviewsCount,
		};

		books.push(book);

		for (let j = 0; j < reviewsCount; j++) {
			reviews.push(generateReview(faker, index));
		}
	}

	return { books, reviews };
};
