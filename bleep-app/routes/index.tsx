import { Head } from "$fresh/runtime.ts";
import Title from "../islands/Title.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>bleep.gg</title>
        <meta name="description" content="bleep.gg" />
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        class="bg-red-50"
        style={{
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <nav class="max-w-screen-md mx-auto h-20 p-2 flex items-end gap-4">
          <div class="flex">
            <div class="px-1 bg-red-500 py-2 text-white">
              <h1 class="text-5xl ">bleep</h1>
            </div>
            <div class="px-1 py-2">
              <h1 class="text-5xl">.gg</h1>
            </div>
          </div>
          <a
            href="https://github.com/sstephen9999/bleep.gg"
            class="text-3xl font-bold"
          >
            GitHub
          </a>
          <a
            href="https://discord.com/api/oauth2/authorize?client_id=1028349063986421771&permissions=8&scope=bot"
            class="text-3xl font-bold"
          >
            Install
          </a>
        </nav>
        <main class="p-4 mx-auto max-w-screen-md">
          <section class="mt-16">
            <h1 class="text-5xl">
              Let's get rid of <Title />
              <br />
              on the internet.
            </h1>
          </section>
          <section class="mt-16" id="about">
            <h1 class="text-3xl">
              41% of Americans have experienced some type of online harassment.
              With how much we live online, that number is far too high.
              bleep.gg keeps your online spaces free of hate speech.
            </h1>
            <h1 class="text-3xl mt-8">
              bleep.gg runs on a GPT-3 language processing model. (that's AI!) Even
              if the message doesn't contain a specific keyword, bleep reads and
              understands the message as a whole.
            </h1>
          </section>
          <section class="mt-8" id="features">
            <h1 class="text-3xl">
              bleep.gg is a discord bot that analyzes messages in a discord
              server and automatically deletes messages promoting hate speech.
              It also has a chatbot feature designed to help people with
              questions regarding hate speech.
            </h1>
          </section>
          <section class="mt-16" id="install">
            <a
              class="text-3xl p-4 rounded-md bg-red-500 text-white shadow-md"
              href="https://discord.com/api/oauth2/authorize?client_id=1028349063986421771&permissions=8&scope=bot"
            >
              Add to your discord server.
            </a>
          </section>
        </main>
      </body>
    </>
  );
}
