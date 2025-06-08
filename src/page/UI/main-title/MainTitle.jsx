import classNames from 'classnames';
import styles from './main-title.module.scss';

export const MainTitle = ({ text, styleUsePlace }) => {
	return (
		<h1
			className={classNames({
				[styles.generateBook]: styleUsePlace === 'generateBooks',
			})}
		>
			{text}
		</h1>
	);
};
