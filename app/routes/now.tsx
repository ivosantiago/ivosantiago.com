import type { MetaFunction } from "@remix-run/react";
import { Card } from "~/components/Card";
import { Container } from "~/components/Container";
import { Section } from "~/components/Section";

function NowSection({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Section>>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  );
}

type ActivityProps = {
  title: string;
  description: string;
  eyebrow: string;
  cta?: string;
  href?: string;
};

function Activity({ title, description, eyebrow, cta, href }: ActivityProps) {
  return (
    <Card as="article">
      <Card.Title as="h3" to={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{eyebrow}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      {cta ? <Card.Cta>{cta}</Card.Cta> : null}
    </Card>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "About - Ivo Santiago" },
    {
      name: "description",
      content: "This is what I'm up to now.",
    },
  ];
};

export default function Now() {
  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            It is important to constantly be doing something. This is what I'm
            doing now
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            This is a{" "}
            <a
              className="text-teal-500 dark:text-teal-400"
              href="https://nownownow.com/about"
            >
              now page
            </a>
            , and if you have your own site,{" "}
            <a
              className="text-teal-500 dark:text-teal-400"
              href="https://nownownow.com/about"
            >
              you should make one
            </a>
            , too.
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Updated January 3rd, 2024, from Vi&ccedil;osa, Brazil. 🌎
          </p>
        </header>
        <div className="mt-16 sm:mt-20">
          <div className="space-y-20">
            <NowSection title="Books">
              <Activity
                href="https://sive.rs/n"
                eyebrow="Derick Sivers"
                title="Hell Yeah or No"
                description='"Overwhelmed? If you feel anything less than “hell yeah!” about something, say no. We say yes too often. By saying no to almost everything, you leave space and time in your life to throw yourself completely into the few things that matter most."'
                cta="Get it at Sivers' website"
              />
            </NowSection>
            <NowSection title="Building">
              <Activity
                href="https://www.landsbattle.me/#"
                eyebrow="Lands Battle"
                title="A card game for Upland players"
                description="A dear friend of mine asked if I could help him to fix his game. I'm working on it and it's been a lot of fun. I hope to have it ready by the end of the month."
                cta="Check it out"
              />
            </NowSection>
            <NowSection title="Tech">
              <Activity
                href="https://www.akitaonrails.com/2023/03/02/akitando-139-entendendo-como-containers-funcionam"
                eyebrow="Docker & containers"
                title="Obsessed with containers"
                description="Many times in my dev life I see myself on the same situation: I’ve learned a lot about the theory of something but little about practicing it. Docker and containers are one of those things. I came across 2 videos from Akita about containers https://www.akitaonrails.com/2023/03/02/akitando-139-entendendo-como-containers-funcionam and https://www.akitaonrails.com/2023/12/16/akitando-149-configurando-docker-compose-postgres-com-testes-de-carga-parte-final-da-rinha-de-backend - highly recommend. Both in Portuguese - explaining how it works under the hood and in practice. I still have some questions on when to reach for it: Should it be used on development or just prod? Should I have separated files for prod and dev environments? What is the the point in a project when it should be considered? Because I want to try it myself I’m setting up a side project using it just to see the results. Any tips? Please send me a message."
                cta="Akita's website"
              />
              <Activity
                href="https://mdxjs.com/"
                eyebrow="Design touches"
                title='MDX "this site does not track you" footer'
                description="I was looking for something to create a blog section for the website and found MDX. Loved their website footer where it says “this site does not track you”. I’m sick of accepting cookies. They are delicious but not good for my diet. 🍪"
                cta="MDX's website"
              />
            </NowSection>
            <NowSection title="Random thoughts">
              <Activity
                href="#"
                eyebrow="Books notes page"
                title="Should I add a books page to the site?"
                description="Following Derick Sivers track I’m considering starting a [books notes page](https://sive.rs/book). It would force myself to write some thoughts about each book and help to retain more knowledge."
              />
              <Activity
                href="#"
                eyebrow="Plans for 2024"
                title="Reflection on 2023 and plans for 2024"
                description='I don’t do resolutions for new year but I do like to reflect on what I did and think about what I want to do. Last year was all about Noah. Learning to be a father is a never ending task for sure but I feel like I know a couple things now. Both about me and him. This year I want to go back to myself a little more. Not in a selfish way but focusing on the things I want to learn and do. Kinda like the flight attendants say on every flight “put your mask first".'
              />
            </NowSection>
          </div>
        </div>
      </Container>
    </>
  );
}
