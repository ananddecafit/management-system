import { unstable_noStore as noStore } from 'next/cache'

export default function Home() {
    noStore()
    return <main>PORT={process.env.PORT} API_PORT={process.env.API_PORT}</main>;
}