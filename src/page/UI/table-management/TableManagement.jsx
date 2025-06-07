import { Button } from '../button/Button';

export const TableManagement = ({ setLocale, setSeed, setAvgLikes, setAvgReviews, localeValue, seedValue, avgLikesValue, avgReviewsValue, decreaseAvgReviews, increaseAvgReviews }) => {
	return (
		<div>
			<label>
				Language:
				<select value={localeValue} onChange={setLocale}>
					<option value="en-US">Английский (США)</option>
					<option value="fr-FR">Французский (Франция)</option>
					<option value="de-DE">Немецкий (Германия)</option>
				</select>
			</label>

			<label>
				Начальное значение (seed):
				<input type="number" min={0} value={seedValue} onChange={setSeed} />
			</label>

			<label>
				Среднее количество лайков:
				<input type="range" min={0} max={10} step={0.1} value={avgLikesValue} onChange={setAvgLikes} />
				<span>{avgLikesValue}</span>
			</label>

			<label>
				Среднее количество отзывов:
				<Button text="-" onClick={decreaseAvgReviews} />
				<input type="text" readOnly value={avgReviewsValue.toFixed(1)} style={{ width: '60px', textAlign: 'center' }} />
				<Button text="+" onClick={increaseAvgReviews} />
			</label>
		</div>
	);
};
