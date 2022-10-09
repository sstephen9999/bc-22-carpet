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
                <div className="image-holder">
                    <Image className="image" src="/ai_robot.svg" alt="" layout="fill"/>
                </div>
                <div className="content font-light">
                    <p>Bleep runs on a GPT-3 language processing model. (that&apos;s AI!) Even if the message doesn&apos;t contain a specific keyword, Bleep reads and understands the message as a whole.</p>
                </div>
            </section>

            <section className="color-div w-full bg-dark section-info3">
                <h1 className="title font-rubik font-light">Available on:</h1>
                <div className="image-holder">
                    <Image className="image" src="/discord.svg" alt="" layout="fill"/>
                </div>
            </section>
        </>
    )
}

export default Home
