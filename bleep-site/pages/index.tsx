import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Title from '../components/Title'

const Home: NextPage = () => {
    return (
        <>
            <Title/>
            <section className="color-div w-full bg-pink section-info">
                <div id="about" className="anchor"></div>
                <div className="content info font-dark">
                    <p><a className="content-link" href="https://www.adl.org/online-hate-2021">41% of Americans</a> have experienced some type of online harassment. With how much we live online, that number is far too high. bleep.gg keeps your online spaces free of hate speech.</p>
                    <p>bleep.gg gives you autonomy over your online spaces. Regardless of the platform&apos;s policy on hate speech, you set your own boundaries on what you want to see.</p>
                </div>
                <div className="image-holder">
                    <Image className="image" src="/lost_online.svg" alt="" layout="fill"/>
                </div>
            </section>

            <section className="color-div w-full bg-red section-info">
                <div id="features" className="anchor"></div>
                <div className="image-holder">
                    <Image className="image" src="/ai_art.svg" alt="" layout="fill"/>
                </div>
                <div className="content info font-light">
                    <p>bleep.gg runs on a GPT-3 language processing model. (that&apos;s AI!) Even if the message doesn&apos;t contain a specific keyword, bleep.gg reads and understands the message as a whole.</p>
                    <p>When bleep.gg detects a message promoting hate speech, it will automatically delete it. Users are notified, and admins can review the message.</p>
                    <p>If you have a question, just ask bleep.gg!</p>
                </div>
            </section>

            <section className="color-div w-full bg-dark section-info download">
                <div id="getitnow" className="anchor"></div>
                <div className="content2 font-light">
                    <div className="image-holder2">
                        <a href="https://discord.gg/WHF8CNvR">
                            <Image className="image" src="/discordtry.png" alt="Add to Discord" layout={"fill"} objectFit={"contain"}/>
                        </a>
                    </div>
                    <p className="download-text">Want to see bleep.gg in action? Join our server and test bleep&apos;s limits, ask some questions, and try bleep.gg out!</p>
                </div>
                <div className="content2 font-light">
                    <div className="image-holder2">
                        <a href="https://discord.com/api/oauth2/authorize?client_id=1028349063986421771&amp;permissions=8&amp;scope=bot">
                            <Image className="image" src="/discord.png" alt="Add to Discord" layout={"fill"} objectFit={"contain"}/>
                        </a>
                    </div>
                    <p className="download-text">The bleep.gg Discord bot automatically deletes messages promoting hate speech. It also has a chatbot, answering any questions regarding hate speech.</p>
                </div>
            </section>

            <section className="color-div w-full bg-light">
                <div className="download-text footer content font-dark font-Rubik">
                    <p>Build with &lt;3 by Brandon, Stephen, and Philip</p>
                </div>
            </section>
        </>
    )
}

export default Home
