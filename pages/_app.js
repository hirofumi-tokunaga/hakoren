import '../styles/globals.scss'
import Layout from 'components/layout'
import { useAuthState } from 'hooks/useAuthState'

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			< Component {...pageProps } />
		</Layout>
	)
}

export default MyApp
