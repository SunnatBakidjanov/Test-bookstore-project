import classNames from 'classnames';
import styles from './button.module.scss';

export const Button = ({ text, onClick, children, styleUsePlace }) => {
	return (
		<button
			className={classNames({
				[styles.mixSeed]: styleUsePlace === 'mixSeed',
				[styles.reviewsChange]: styleUsePlace === 'reviewsChange',
			})}
			onClick={onClick}
		>
			{text}
			{children}
		</button>
	);
};
