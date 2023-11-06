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
            Updated January 3rd, 2023, from my home in Belo Horizonte, Brazil.
          </p>
        </header>
        <div className="mt-16 sm:mt-20">
          <div className="space-y-20">
            <NowSection title="Books">
              <Activity
                href="https://www.amazon.com/Never-Finished-Unshackle-Your-Within/dp/B0BJ35MFZY/ref=tmm_aud_swatch_0?qid=&sr="
                eyebrow="David Goggins"
                title="Never Finished: Unshackle Your Mind and Win the War Within"
                description='"Can’t Hurt Me, David Goggins’ smash hit memoir, demonstrated how much untapped ability we all have but was merely an introduction to the power of the mind. In Never Finished, Goggins takes you inside his Mental Lab, where he developed the philosophy, psychology, and strategies that enabled him to learn that what he thought was his limit was only his beginning and that the quest for greatness is unending."'
                cta="Listen on Audible"
              />
              <Activity
                href="https://www.amazon.com/Steal-Like-Artist-Things-Creative-ebook/dp/B0B5L9GMSW/ref=tmm_kin_swatch_0?qid=&sr="
                eyebrow="Austin Kleon"
                title="Steal Like an Artist: 10 Things Nobody Told You About Being Creative"
                description='"An inspiring guide to creativity in the digital age, Steal Like an Artist presents ten transformative principles that will help readers discover their artistic side and build a more creative life."'
                cta="Read on Kindle"
              />
            </NowSection>
            <NowSection title="Building">
              <Activity
                href="https://www.ivosantiago.com"
                eyebrow="ivosantiago.com"
                title="My personal website"
                description="For years I'm planning to create a website for myself. Now it is time to take this project out of my head and put it into the world."
              />
            </NowSection>
            <NowSection title="Family">
              <Activity
                href="#"
                eyebrow="Noah"
                title="Spending time with my newborn son"
                description="Being a father is the most important thing in my life. I'm learning a lot about myself and the world. Noah teaches me to be a better person every day."
              />
            </NowSection>
          </div>
        </div>
      </Container>
    </>
  );
}
