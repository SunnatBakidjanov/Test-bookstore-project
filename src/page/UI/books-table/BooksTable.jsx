export const BooksTable = ({ books, reviews }) => {
	return (
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
										{bookReviews.length > 2 ? <p>...и еще {bookReviews.length - 2}</p> : ''}
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
	);
};
