import '../public/style.css'
import '../public/repo.css'
export default function MyApp({Component,pageProps}) {
    return (
        <>
            <Component {...pageProps} />
        </>
    )
}