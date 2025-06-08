import classNames from 'classnames';
import styles from './line.module.scss';

export const Line = ({ stylesUsePlace }) => {
	return (
		<div
			className={classNames({
				[styles.generateBooksUnderTitle]: stylesUsePlace === 'generateBooksUnderTitle',
				[styles.generateBooksUnderManagment]: stylesUsePlace === 'generateBooksUnderManagment',
			})}
		></div>
	);
};
