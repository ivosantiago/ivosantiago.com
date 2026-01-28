import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { Container } from '@/components/Container';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons';
import noahImage from '@/images/noah.jpg';

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  );
}

export const metadata = {
  title: 'About',
  description:
    "Hello 👋 I'm Ivo, I live in Brazil, where I code for fun and profit.",
};

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={noahImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Hi, I’m Ivo Santiago 👋
            <br />I live in Belo Horizonte, where I code and have fun with Noah.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Based on what I did as a kid, no one would ever expect a carrier
              in the software industry. I was raised in a small town where I
              spent most of the time on a farm and didn&apos;t have internet
              access at home until I was 17. Most of my time was around cows,
              horses, or practicing sports.
            </p>
            <p>
              When it was time to pick a college major, it came as a surprise to
              my family me deciding to do computer science. Ive played video
              games and I&apos;ve been fascinated by technology. How could I not
              be?
            </p>
            <p>
              Despite my major, another place I spent a lot of time was the
              sports center. I&apos;ve never been fit but the nerd side of
              physical training fascinated me. I like to try all kinds of sports
              and I&apos;m always looking for new challenges. My favorites are
              judo and swimming.
            </p>
            <p>
              After college, I lived in Dublin, Ireland, for a year. After that
              I moved to the US for six months and then back to Brazil.
              I&apos;ve been here ever since. Today, I&apos;m the father of
              Noah. He&apos;s the best thing that ever happened to me. We have a
              lot of fun together.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/ivosantiago" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink
              href="https://instagram.com/ivosantiago"
              icon={InstagramIcon}
              className="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://github.com/ivosantiago"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/ivosantiago"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:ivosantiago@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              ivosantiago@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  );
}
