import { Faker, en, ru, de } from '@faker-js/faker';

const localeMap = {
	'en-US': en,
	'ru-RU': ru,
	'de-DE': de,
};

export function createFaker(locale, seed) {
	const faker = new Faker({ locale: localeMap[locale] });
	faker.seed(seed);
	return faker;
}

function getRandomCount(avgLikes, faker) {
	const spread = 1.5;
	const min = Math.max(0, Math.floor(avgLikes - spread));
	const max = Math.ceil(avgLikes + spread);
	let rough = faker.number.int({ min, max });

	if (avgLikes === 0) rough = faker.number.int(0);

	return rough;
}

export const generateBooks = ({ locale, seed, avgLikes, avgReviews, count }) => {
	const faker = createFaker(locale, seed);
	const books = [];

	for (let i = 0; i < count; i++) {
		const titleAdjective = faker.word.adjective();

		books.push({
			index: i + 1,
			isbn: faker.string.alphanumeric(13),
			title: `${titleAdjective.charAt(0).toLocaleUpperCase() + titleAdjective.slice(1)} ${faker.word.noun()}`,
			author: faker.person.fullName(),
			publisher: faker.company.name(),
			likes: getRandomCount(avgLikes, faker),
			reviews: getRandomCount(avgReviews, faker),
		});
	}

	return books;
};
