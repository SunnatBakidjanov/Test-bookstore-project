import { generateBooks } from './utils/generateBooks';
import { useState, useEffect } from 'react';

export const App = () => {
	const [locale, setLocale] = useState('en-US');
	const [seed, setSeed] = useState(1);
	const [avgLikes, setAvgLikes] = useState(3.5);
	const [avgReviews, setAvgReviews] = useState(1.2);
	const [books, setBooks] = useState([]);
	const [reviews, setReviews] = useState([]);

	const loadBooks = () => {
		const { books: generatedBooks, reviews: generatedReviews } = generateBooks({
			locale,
			seed,
			avgLikes,
			avgReviews,
			count: 20,
		});
		setBooks(generatedBooks);
		setReviews(generatedReviews);
	};

	useEffect(() => {
		loadBooks();
	}, [locale, seed, avgLikes, avgReviews]);

	return (
		<div>
			<h1>Генерация книг</h1>

			<div>
				<label>
					Язык и регион:
					<select value={locale} onChange={e => setLocale(e.target.value)}>
						<option value="en-US">Английский (США)</option>
						<option value="fr-FR">Французкий (Франция)</option>
						<option value="de-DE">Немецкий (Германия)</option>
					</select>
				</label>

				<label>
					Начальное значение (seed):
					<input type="number" min={0} value={seed} onChange={e => setSeed(+e.target.value)} />
				</label>

				<label>
					Среднее количество лайков:
					<input type="range" min={0} max={10} step={0.1} value={avgLikes} onChange={e => setAvgLikes(+e.target.value)} />
					<span>{avgLikes}</span>
				</label>

				<label>
					Среднее количество отзывов:
					<input type="number" min={0} max={5} step={0.1} value={avgReviews} onChange={e => setAvgReviews(+e.target.value)} />
				</label>
			</div>

			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>ISBN</th>
						<th>Название</th>
						<th>Автор</th>
						<th>Издатель</th>
						<th>Дата</th>
						<th>Лайки</th>
						<th>Отзывы</th>
					</tr>
				</thead>
				<tbody>
					{books.map(book => {
						const bookReviews = reviews.filter(review => review.bookIndex === book.index);

						return (
							<tr key={book.index}>
								<td>{book.index}</td>
								<td>{book.isbn}</td>
								<td>{book.title}</td>
								<td>{book.author}</td>
								<td>{book.publisher}</td>
								<td>{book.date}</td>
								<td>{book.likesCount}</td>
								<td>{book.reviewsCount}</td>
								<td>
									{bookReviews.length > 0 ? (
										<ul style={{ paddingLeft: '1em' }}>
											{bookReviews.slice(0, 2).map((r, i) => (
												<li key={i}>
													<b>{r.reviewer}</b>: {r.comment}
												</li>
											))}
											{bookReviews.length > 2 ? <p>и еще {bookReviews.length - 2}</p> : ''}
										</ul>
									) : (
										'Нет отзывов'
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
