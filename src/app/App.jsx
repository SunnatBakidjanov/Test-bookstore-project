import { Layout } from '../layout/Layout';
import { GenerateBooks } from '../page/GenerateBooks';
import './main.scss';
import './reset.scss';

export const App = () => {
	return (
		<Layout>
			<GenerateBooks />
		</Layout>
	);
};
