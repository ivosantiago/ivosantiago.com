import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  );
}

function Tool({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  );
}

export const metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
};

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="These are things I like to use. I don’t get paid to endorse any of them, I just like them."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="Mac mini M4, 24GB RAM (2024)">
            This is my work machine now. It&apos;s tiny, silent, and way faster
            than I need. Before this I worked on a 14&quot; MacBook Pro M1
            (2021), but I barely moved it around, so a little desktop made more
            sense. I have a personal Windows machine too but honestly, I
            don&apos;t use it that much. As you can tell, I don&apos;t feel like
            updating computers very often.
          </Tool>
          <Tool title="LG HDR 34,5” Ultra Wide display">
            This is *not* a great monitor. I bought it because I want to try a
            big monitor and it was cheap. I don&apos;t think I would rebuy it.
            I&apos;m looking for a new monitor.
          </Tool>
          <Tool title="AirPods Pro 2">
            I was very skeptical about this earbuds but it was a great surprise
            so far. I use it all day long, the noise canceling is perfect.
          </Tool>
          <Tool title="Keychron K2">
            I like a lot the brown switches. The tactile feedback of this
            keyboard is lovely, and I can sync it wirelessly for up to three
            devices.
          </Tool>
          <Tool title="Logitec M720 Triathlon mouse">
            Following the same idea of the keyboard, I was looking for a
            comfortable mouse that I could use with my laptop and other devices.
            It also syncs wirelessly with three devices as well.
          </Tool>
          <Tool title="GenioDesk Plus">
            This is a height-adjustable desk. I like it because it&apos;s easy
            to use, but, trust me, 90% of the time, I leave it at sitting
            height.
          </Tool>
          <Tool title="Flexform Tecton (Night Blue Unique)">
            This one looks way cooler — it&apos;s all mesh, adjusts in every
            direction, and reclines based on your weight. Honestly though, my old
            gaming chair was more comfortable, and I liked it better. I only
            replaced it because it was tearing apart. So it looks great, but I
            still miss the comfort of the old one.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="T3 Code">
            This is where I spend most of my day now. It&apos;s an open-source
            app that gives AI coding agents like Claude Code a proper interface —
            git worktrees, diffs, and pull requests, all in one place. I can run
            a few agents in parallel across projects, which still feels a little
            like cheating.
          </Tool>
          <Tool title="Claude Code">
            Anthropic&apos;s coding agent that lives in the terminal. It reads
            the codebase, runs commands, and handles the boring parts of git for
            me. Most of the time I let it drive and I just review. This very page
            was updated with it, by the way.
          </Tool>
          <Tool title="Cursor">
            A VS Code fork built around AI. Since it&apos;s basically VS Code,
            all my old extensions and shortcuts just work, so it&apos;s my go-to
            when I want a familiar editor with autocomplete that reads my mind
            (most of the time).
          </Tool>
        </ToolsSection>
        <ToolsSection title="Design">
          <Tool title="Figma">
            I&apos;m not a designer but I like good design tools. Figma is easy
            to use and everywhere I work, they use it.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Raycast">
            I used to use Alfred but I switched to Raycast. The plan was to
            create scripts to automate my daily tasks but I didn&apos;t get to
            it yet. I still use it to open apps and do some basic stuff and I
            don&apos;t miss anything from Alfred.
          </Tool>
          <Tool title="Maccy">
            A lightweight, open-source clipboard manager. It keeps my copy
            history and lets me paste anything back with a keyboard shortcut. It
            does one thing and does it well, which is exactly what I want from a
            tool like this.
          </Tool>
          <Tool title="Wispr Flow">
            Voice-to-text that actually works. I press a shortcut, talk, and it
            drops clean, punctuated text into whatever I&apos;m using — even my
            editor. As a non-native speaker, talking is often faster than typing,
            and it cleans up my rambling for me.
          </Tool>
          <Tool title="Grammarly">
            I&apos;m not a native English speaker. Grammarly is helping me a lot
            in fixing language issues and making my writing clear.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  );
}
