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
          <Tool title="14” MacBook Pro M1, 16GB RAM (2021)">
            This is my work machine. I have a personal Windows machine but
            honestly, I don&apos;t use it that much. Before that, I used an
            Apple MacBook Pro 13.3&quot; (2012), 16 GB RAM, for years. I
            don&apos;t feel like updating computers very often.
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
          <Tool title="DXRacer K-Series KS11/N">
            This is a gaming chair. I don&apos;t play games anymore but I was
            looking for something comfortable to sit on for long hours and not
            so expensive. I like it.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Visual Studio Code">
            I used to be an Atom user but I switched to VS Code because of the
            extensions. I don&apos;t mind being out of the Vim world. I know the
            basics of it.
          </Tool>
          <Tool title="TablePlus">
            Great software for working with databases. It has saved me from
            building about a thousand admin interfaces for my various projects
            over the years.
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
          <Tool title="Monosnap">
            This is a handy tool for taking screenshots and picking colors from
            images and pages.
          </Tool>
          <Tool title="Krisp">
            Sometimes the sound around is noisy it can be a problem, especially
            at meetings. Now I can go anywhere and do calls not worrying if the
            background noise is bad.
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
