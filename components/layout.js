
// import Footer from './footer'
import Header from './header'



export default function Layout({ children }) {

    return (
        
        <div className="flex flex-col">

            <Header />

            <main className="mt-24 self-stretch flex-grow flex justify-center">
                {children}
            </main>
        </div >
    )
}