import Navbar from '../components/Navbar'
import {Container} from '@material-ui/core'
import Player from '../components/Player'
import Head from "next/head";

interface MainLayoutProps {
  title?: string
}

const MainLayout: React.FC<MainLayoutProps> = ({children, title}) => {
  return (
    <>
      <Head>
        <title>{title || 'Музыкальная площадка'}</title>
      </Head>
      <Navbar/>
      <Container style={{margin: '90px 0'}}>
        {children}
      </Container>
      <Player/>
    </>
  )
}

export default MainLayout