import { BooksTable } from './UI/books-table/BooksTable';
import { MainTitle } from './UI/main-title/MainTitle';
import { TableManagement } from './UI/table-management/TableManagement';
import { useBooks } from './hooks/useBooks';
import styles from './generate-books.module.scss';
import { Line } from './UI/line/Line';

export const GenerateBooks = () => {
	const { bookState, setLocale, setSeed, setAvgLikes, setAvgReviews, decreaseAvgReviews, increaseAvgReviews, getRandomSeed, increaseCount } = useBooks();
	const { books, reviews, locale, seed, avgLikes, avgReviews } = bookState;

	return (
		<section className={styles.section}>
			<div className="container">
				<div className={styles.wrapper}>
					<MainTitle text="Book generation" styleUsePlace="generateBooks" />

					<Line stylesUsePlace="generateBooksUnderTitle" />

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
						getRandomSeed={getRandomSeed}
					/>

					<Line stylesUsePlace="generateBooksUnderManagment" />

					<BooksTable books={books} reviews={reviews} onScrollEnd={() => increaseCount(20)} />
				</div>
			</div>
		</section>
	);
};
