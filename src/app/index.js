import { BrowserRouter } from 'react-router-dom'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { Content } from '../widgets/Contents'
import { TreeMenu } from '../widgets/TreeMenu'

const App = () => {
	return (
		<Main>
			<Container>
				<BrowserRouter>
					<TreeMenu/>
					<Content/>
				</BrowserRouter>
			</Container>
		</Main>
	)
}

export { App }
