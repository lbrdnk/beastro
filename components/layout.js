
// import Footer from './footer'
import Header from './header'



export default function Layout({ children }) {

    return (
        
        <div className="flex flex-col justify-center">

            <Header />

            {/* items-center moze ist prec, flex-grow naspat */}
            <main className="flex justify-center items-center flex-grow">
                <div className="container max-w-3xl">
                {children}
                </div>
            </main>
        </div >
    )
}