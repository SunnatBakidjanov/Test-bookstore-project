import { useState, useRef, useEffect, Fragment } from 'react';
import style from './books-table.module.scss';
import bookImg from '/imgs/png/book.png';
import likeImg from '/imgs/svg/like.svg';
import { fa } from '@faker-js/faker';

export const BooksTable = ({ books, reviews, onScrollEnd }) => {
	const [expandedRow, setExpandedRow] = useState(null);

	const toggleRow = index => {
		setExpandedRow(expandedRow === index ? null : index);
	};

	const isLoadingRef = useRef(false);
	const wrapperRef = useRef(null);

	useEffect(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;

		const handleScroll = () => {
			if (isLoadingRef.current) return;

			const scrollTop = wrapper.scrollTop;
			const scrollHeight = wrapper.scrollHeight;
			const clientHeight = wrapper.clientHeight;

			if (scrollTop + clientHeight >= scrollHeight - 10) {
				isLoadingRef.current = true;
				onScrollEnd?.().finally(() => {
					isLoadingRef.current = false;
				});
			}
		};

		wrapper.addEventListener('scroll', handleScroll);
		return () => wrapper.removeEventListener('scroll', handleScroll);
	}, [onScrollEnd]);

	return (
		<div className={style.wrapper} ref={wrapperRef}>
			<table className={style.table}>
				<thead>
					<tr>
						<th className={style.thIndex}>#</th>
						<th className={style.thIsbn}>ISBN</th>
						<th>Name</th>
						<th>Author</th>
						<th>Publisher</th>
					</tr>
				</thead>
				<tbody>
					{books.map(book => {
						const bookReviews = reviews.filter(review => review.bookIndex === book.index);
						const isExpanded = expandedRow === book.index;

						return (
							<Fragment key={`fragment-${book.index}`}>
								<tr className={style.tableRow} onClick={() => toggleRow(book.index)}>
									<td>{book.index}</td>
									<td>{book.isbn}</td>
									<td>{book.title}</td>
									<td>{book.author}</td>
									<td>
										{book.publisher}, {book.date}
									</td>
								</tr>
								{isExpanded && (
									<tr className={style.expandedRow}>
										<td colSpan={7}>
											<div className={style.expandedContent}>
												<div className={style.innerImg}>
													<img className={style.bookImg} src={bookImg} alt="" />
													<p className={style.bookAuthor}>{book.author}</p>
													<p className={style.bookTitle}>{book.title}</p>
													<div className={style.bookLikes}>
														<img className={style.bookLikeImg} src={likeImg} alt="" />
														<p>{book.likesCount}</p>
													</div>
												</div>
												<div className={style.innerInfo}>
													<h4 className={style.infoTitle}>{book.title}</h4>
													<p className={style.infoAuthor}>by {book.author}</p>
													<p className={style.infoPublisher}>{book.publisher}</p>
													<h4 className={style.infoReviewsTitle}>Reviews:</h4>
													{bookReviews.length > 0 ? (
														<ul className={style.infoReviews}>
															{bookReviews.map((r, i) => (
																<li className={style.infoItem} key={`review-${book.index}-${i}`}>
																	<p className={style.infoReviewer}>{r.reviewer}</p>
																	<p className={style.infoReview}>- {r.comment}</p>
																</li>
															))}
														</ul>
													) : (
														<p>No reviews</p>
													)}
												</div>
											</div>
										</td>
									</tr>
								)}
							</Fragment>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
