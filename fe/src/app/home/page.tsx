import { unstable_noStore as noStore } from 'next/cache'

export default function Home() {
    noStore()
    return <main>PORT={process.env.NEXT_PUBLIC_PORT} API_PORT={process.env.NEXT_PUBLIC_API_PORT}</main>;
}