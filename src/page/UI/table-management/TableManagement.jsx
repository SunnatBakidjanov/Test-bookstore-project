import { Button } from '../button/Button';
import styles from './table-management.module.scss';
import mixArrow from '/imgs/svg/mix.svg';

export const TableManagement = ({ setLocale, setSeed, setAvgLikes, localeValue, seedValue, avgLikesValue, avgReviewsValue, decreaseAvgReviews, increaseAvgReviews, getRandomSeed }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inputBlock}>
				<label className={styles.localeLabel}>
					<span>Change Language:</span>
					<select className={styles.localeSelect} value={localeValue} onChange={setLocale}>
						<option value="en-US">English (EU)</option>
						<option value="fr-FR">Français (FR)</option>
						<option value="de-DE">Deutsch (DE)</option>
					</select>
				</label>
			</div>

			<div className={styles.inputBlock}>
				<label className={styles.seedLabel}>
					<span>Change Seed:</span>
					<input className={styles.seedSelect} type="number" min={0} value={seedValue} onChange={setSeed} />
				</label>
				<Button onClick={getRandomSeed} styleUsePlace="mixSeed">
					<img className={styles.imgSeed} src={mixArrow} alt="" />
				</Button>
			</div>

			<div className={styles.inputBlock}>
				<label className={styles.likesLabel}>
					<span>Change Likes:</span>
					<div className={styles.likesInnerInput}>
						<input className={styles.likesInput} type="range" min={0} max={10} step={0.1} value={avgLikesValue} onChange={setAvgLikes} />
						<span className={styles.likesValue}>{avgLikesValue}</span>
					</div>
				</label>
			</div>

			<div className={styles.inputBlock}>
				<label className={styles.reviewsLabel}>
					<span>Number of reviews:</span>
					<div className={styles.reviewsInnerInput}>
						<Button styleUsePlace="reviewsChange" text="-" onClick={decreaseAvgReviews} />
						<input className={styles.reviewsInput} type="text" readOnly value={avgReviewsValue.toFixed(1)} />
						<Button styleUsePlace="reviewsChange" text="+" onClick={increaseAvgReviews} />
					</div>
				</label>
			</div>
		</div>
	);
};
