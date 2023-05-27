import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from './header/page'
import Footer from './footer/page'
import { GlobalContextProvider } from './context/store'
import styles from './layout.module.css'

const montserratFont = Montserrat({
  weight: ['100', '300', '500'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-monsterrat',
  display: 'swap'
})

export const metadata = {
  title: 'Trabaja con nosotros - On steroids',
  description: 'Proyecto para la hackaton de InfoJobs con Midudev 2023'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={montserratFont.className}>
        <GlobalContextProvider>
          <Header />
          <div className={styles.container}>
            {children}
          </div>
          <Footer />
        </GlobalContextProvider>
      </body>
    </html>
  )
}
