import { BooksTable } from './UI/books-table/BooksTable';
import { MainTitle } from './UI/main-title/mainTitle';
import { TableManagement } from './UI/table-management/TableManagement';
import { useBooks } from './hooks/useBooks';

export const GenerateBooks = () => {
	const { bookState, setLocale, setSeed, setAvgLikes, setAvgReviews, decreaseAvgReviews, increaseAvgReviews } = useBooks();
	const { books, reviews, locale, seed, avgLikes, avgReviews } = bookState;

	return (
		<section>
			<div>
				<MainTitle text="Book generation" />

				<TableManagement
					setLocale={setLocale}
					setSeed={setSeed}
					setAvgLikes={setAvgLikes}
					setAvgReviews={setAvgReviews}
					localeValue={locale}
					seedValue={seed}
					avgLikesValue={avgLikes}
					avgReviewsValue={avgReviews}
					decreaseAvgReviews={decreaseAvgReviews}
					increaseAvgReviews={increaseAvgReviews}
				/>

				<BooksTable books={books} reviews={reviews} />
			</div>
		</section>
	);
};
