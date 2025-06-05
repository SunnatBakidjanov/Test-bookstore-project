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

const getRandomCount = (avgLikes, faker) => {
	const spread = 0.5;
	const min = Math.max(0, Math.floor(avgLikes - spread));
	const max = Math.ceil(avgLikes + spread);
	let rough = faker.number.int({ min, max });

	if (avgLikes === 0) rough = faker.number.int(0);

	return rough;
};

const getTitle = faker => {
	const randomAdjective = faker.number.int({ min: 0, max: 1 });
	const adjective = faker.word.adjective();
	const noun = faker.word.noun();

	return randomAdjective ? `${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${noun}` : `${noun.charAt(0).toUpperCase() + noun.slice(1)}`;
};

const getDate = (locale, faker) => {
	const date = faker.date.between({ from: '1990-01-01', to: new Date() });
	const formatted = date.toLocaleDateString(locale, { year: 'numeric', month: 'long' });

	return formatted;
};

export const generateBooks = ({ locale, seed, avgLikes, avgReviews, count }) => {
	const faker = createFaker(locale, seed);
	const books = [];

	for (let i = 0; i < count; i++) {
		books.push({
			index: i + 1,
			isbn: faker.string.alphanumeric(13),
			title: getTitle(faker),
			author: faker.person.fullName(),
			publisher: faker.company.name(),
			date: getDate(locale, faker),
			likes: getRandomCount(avgLikes, faker),
			reviews: getRandomCount(avgReviews, faker),
		});
	}

	return books;
};
