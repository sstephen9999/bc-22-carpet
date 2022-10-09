import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Title from '../components/Title'

const Home: NextPage = () => {
    return (
        <>
            <Title/>
            <section className="color-div w-full bg-pink section-info1">
                <div className="content font-dark">
                    <p><a className="content-link" href="https://www.adl.org/online-hate-2021">41% of Americans</a> have experienced some type of online harassment. With how much we live online, that number is far too high. Bleep keeps your online spaces free of hate speech.</p>
                </div>
                <div className="image-holder">
                    <Image className="image" src="/lost_online.svg" alt="" layout="fill"/>
                </div>
            </section>

            <section className="color-div w-full bg-red section-info2">

            </section>
        </>
    )
}

export default Home
