import { generateBooks } from './utils/generateBooks';
import { useState, useEffect } from 'react';

export const App = () => {
	const [locale, setLocale] = useState('en-US');
	const [seed, setSeed] = useState(123);
	const [avgLikes, setAvgLikes] = useState(3.5);
	const [avgReviews, setAvgReviews] = useState(1.2);
	const [books, setBooks] = useState([]);

	const loadBooks = () => {
		const newBooks = generateBooks({
			locale,
			seed,
			avgLikes,
			avgReviews,
			count: 20,
		});
		setBooks(newBooks);
	};

	useEffect(() => {
		loadBooks();
	}, [locale, seed, avgLikes, avgReviews]);

	return (
		<div className="p-4">
			<h1 className="text-xl mb-4">Генерация книг</h1>

			<div className="flex flex-col gap-2 mb-4">
				<label>
					Язык и регион:
					<select value={locale} onChange={e => setLocale(e.target.value)}>
						<option value="en-US">Английский (США)</option>
						<option value="ru-RU">Русский (Россия)</option>
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
					<input type="number" min={0} step={0.1} value={avgReviews} onChange={e => setAvgReviews(+e.target.value)} />
				</label>
			</div>

			<table className="w-full table-auto border">
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
					{books.map(book => (
						<tr key={book.index}>
							<td>{book.index}</td>
							<td>{book.isbn}</td>
							<td>{book.title}</td>
							<td>{book.author}</td>
							<td>{book.publisher}</td>
							<td>{book.date}</td>
							<td>{book.likes}</td>
							<td>{book.reviews}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
