import { useEffect, useReducer } from 'react';
import { generateBooks } from '../../utils/generateBooks';

const initialState = {
	books: [],
	reviews: [],
	locale: 'en-US',
	seed: 1,
	avgLikes: 3.5,
	avgReviews: 1.2,
	count: 20,
};

const ACTIONS = {
	GET_BOOKS: 'GET_BOOKS',
	GET_REVIEWS: 'GET_REVIEWS',
	SET_LOCALE: 'SET_LOCALE',
	SET_SEED: 'SET_SEED',
	SET_AVGLIKES: 'SET_AVGLIKES',
	SET_AVGREVIEWS: 'SET_AVGREVIEWS',
};

function reducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.GET_BOOKS: {
			return {
				...state,
				books: [...payload],
			};
		}

		case ACTIONS.GET_REVIEWS: {
			return {
				...state,
				reviews: [...payload],
			};
		}

		case ACTIONS.SET_LOCALE: {
			return {
				...state,
				locale: payload,
			};
		}

		case ACTIONS.SET_SEED: {
			return {
				...state,
				seed: payload,
			};
		}

		case ACTIONS.SET_AVGLIKES: {
			return {
				...state,
				avgLikes: payload,
			};
		}

		case ACTIONS.SET_AVGREVIEWS: {
			return {
				...state,
				avgReviews: payload,
			};
		}

		default: {
			return {
				...state,
			};
		}
	}
}

export const useBooks = () => {
	const [bookState, dispatch] = useReducer(reducer, initialState);

	function loadBooks() {
		const { locale, seed, avgLikes, avgReviews, count } = bookState;

		const { books: generatedBooks, reviews: generatedReviews } = generateBooks({
			locale,
			seed,
			avgLikes,
			avgReviews,
			count,
		});

		dispatch({ type: ACTIONS.GET_BOOKS, payload: generatedBooks });
		dispatch({ type: ACTIONS.GET_REVIEWS, payload: generatedReviews });
	}
	function setLocale(event) {
		const value = event.target.value;
		dispatch({ type: ACTIONS.SET_LOCALE, payload: value });
	}

	function setSeed(event) {
		const value = Number(event.target.value);
		dispatch({ type: ACTIONS.SET_SEED, payload: value });
	}

	function setAvgLikes(event) {
		const value = Number(event.target.value);
		if (isNaN(value) || value < 0 || value >= 10.1) return;

		dispatch({ type: ACTIONS.SET_AVGLIKES, payload: value });
	}

	function setAvgReviews(event) {
		const value = Number(event.target.value);
		if (isNaN(value) || value < 0 || value >= 5.1) return;

		dispatch({ type: ACTIONS.SET_AVGREVIEWS, payload: value });
	}

	function increaseAvgReviews() {
		const next = Math.min(bookState.avgReviews + 0.1, 5);
		dispatch({ type: ACTIONS.SET_AVGREVIEWS, payload: parseFloat(next.toFixed(1)) });
	}

	function decreaseAvgReviews() {
		const next = Math.max(bookState.avgReviews - 0.1, 0);
		dispatch({ type: ACTIONS.SET_AVGREVIEWS, payload: parseFloat(next.toFixed(1)) });
	}

	useEffect(() => {
		loadBooks();
	}, [bookState.locale, bookState.seed, bookState.avgLikes, bookState.avgReviews]);

	return { bookState, setLocale, setSeed, setAvgLikes, setAvgReviews, increaseAvgReviews, decreaseAvgReviews };
};
