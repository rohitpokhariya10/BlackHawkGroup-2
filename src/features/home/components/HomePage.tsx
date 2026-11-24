import { home, locationInspiration } from "@/content/home";
import { site } from "@/config/site";
import { Brand, Monogram } from "@/components/ui/Brand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { ContactButton } from "@/components/ui/ContactDialog";
import { Preferences } from "./Preferences";
import { Values } from "./Values";

export function HomePage() {
  return <main id="main-content">
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__visual"><Photo name="hero" priority /><div className="hero__shade" /></div>
      <div className="hero__content">
        <div className="hero__brand"><Brand /></div>
        <h1 id="hero-title" data-hero-reveal>Property Decisions,<br />Made Personal</h1>
        <p data-hero-reveal>{home.hero.description}</p>
        <div className="hero__actions" data-hero-reveal><a href="#properties" className="button button--accent">{home.hero.cta}</a><ContactButton className="button button--light">Get in Touch</ContactButton></div>
      </div>
      <Preferences />
    </section>

    <section className="about split-section" id="about" aria-labelledby="about-title">
      <div className="about__image image-window" data-reveal="left"><Photo name="living" sizes="(max-width: 991px) 100vw, 50vw" /></div>
      <div className="about__copy">
        <Monogram className="watermark" />
        <SectionHeading eyebrow="About Blackhawk Realty Group" title={home.about.title} id="about-title" />
        <div className="body-copy" data-reveal="up" data-delay="0.3">{home.about.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
        <a href="#owners" className="button" data-reveal="up" data-delay="0.3">Meet the Owners</a>
      </div>
    </section>

    <section className="values" id="values" aria-labelledby="values-title"><SectionHeading eyebrow="Our" title="Core Values" id="values-title" className="centered" /><Values /></section>

    <section className="features section-pad" id="options" aria-labelledby="options-title">
      <SectionHeading eyebrow="Your priorities. Your possibilities." title="Property Options" id="options-title" className="centered" />
      <div className="features__grid">{home.features.map(feature => <div key={feature.title} data-reveal="up" data-delay="0.3"><h3>{feature.title}</h3><p>{feature.description}</p></div>)}</div>
    </section>

    <section className="owners split-section" id="owners" aria-labelledby="owners-title">
      <div className="owners__portrait" data-reveal="left" role="img" aria-label="Temporary owner portrait placeholder for Basil and Betty Sullivan; approved photographs have not been supplied">
        <div className="portrait-frame"><span className="eyebrow">Meet the Owners</span><span className="portrait-monogram">B<span>&</span>B</span><span className="portrait-names">Basil & Betty<br />Sullivan</span><span className="portrait-caption">Portrait coming soon<br /><span>Awaiting approved photography</span></span></div>
      </div>
      <div className="owners__copy">
        <SectionHeading eyebrow="Meet the Owners" title={home.owners.title} id="owners-title" />
        <div className="body-copy" data-reveal="up" data-delay="0.3">{home.owners.paragraphs.map((p, i) => <p key={p} className={i === 0 ? "serif-intro" : undefined}>{p}</p>)}<p className="editorial-note">{home.owners.note}</p></div>
        <div data-reveal="up"><ContactButton className="button button--accent">Start a Conversation</ContactButton></div>
      </div>
    </section>

    <section className="properties section-pad" id="properties" aria-labelledby="properties-title">
      <Monogram className="watermark" />
      <div className="properties__header"><div data-reveal="left"><SectionHeading eyebrow="Featured Properties" title={home.properties.title} id="properties-title" motion={false} /><p>{home.properties.description}</p></div><div data-reveal="right"><ContactButton mode="listings">{home.properties.cta}</ContactButton></div></div>
      <div className="property-grid">{home.features.map((feature, i) => <article className="property-card" key={feature.title} data-reveal="up" data-delay={String(i * 0.1)}>
        <Photo name={(["residential", "commercial", "interior"] as const)[i]} sizes="(max-width: 600px) 100vw, (max-width: 991px) 50vw, 33vw" />
        <div className="property-card__shade" /><span className="image-label">Illustrative property</span>
        <div className="property-card__content"><h3>{feature.title}</h3><p>{feature.description}</p><div className="property-card__bottom"><span>Listings coming soon</span><ContactButton className="property-card__link" mode="listings" ariaLabel={`Explore ${feature.title.toLowerCase()} preview`}>Explore</ContactButton></div></div>
      </article>)}</div>
      <p className="section-note">Illustrative photography. Verified property listings and availability will be added after approval.</p>
    </section>

    <div className="architecture-interlude image-window" aria-label="Architectural inspiration"><Photo name="exterior" /><span className="image-label">Architectural inspiration</span></div>

    <section className="communities section-pad" id="communities" aria-labelledby="communities-title">
      <SectionHeading eyebrow="Communities" title={home.communities.title} id="communities-title" className="centered" />
      <p className="section-intro" data-reveal="up">{home.communities.description}</p>
      <div className="communities__grid">{locationInspiration.map((place, i) => <div className="location-card" key={place.title} data-reveal="scale" data-delay={String((i % 3) * 0.1)}>
        <Photo name={place.image} sizes="(max-width: 991px) 50vw, 33vw" /><div className="location-card__shade" />
        <ContactButton className="location-card__button" topic="Locations" message={`I’d like to discuss locations that offer ${place.title.toLowerCase()}.`} ariaLabel={`Discuss ${place.title.toLowerCase()}`}><span>{place.title}</span><i aria-hidden="true" /></ContactButton>
      </div>)}</div>
      <p className="section-note">Location inspiration, not a list of service areas. Ask our team about locations and current availability.</p>
    </section>

    <section className="office" id="office" aria-labelledby="office-title">
      <Photo name="office" decorative /><div className="office__shade" />
      <div className="office__content"><SectionHeading eyebrow="Our Office" title={home.office.title} id="office-title" className="centered" /><address className="office__panel" data-reveal="up" data-delay="0.3"><span className="office__city">Decatur, Georgia</span><span className="fine-rule" /><a href={site.telephone}>{site.phone}</a><a href={site.mailto}>{site.email}</a><a href={site.directions} target="_blank" rel="noreferrer">{site.address}<span className="office__directions">Get directions</span></a></address><span className="office__caption">Illustrative architectural backdrop</span></div>
    </section>

    <section className="team section-pad" id="team" aria-labelledby="team-title">
      <SectionHeading eyebrow="Our Team" title={home.team.title} id="team-title" className="centered" />
      <p className="section-intro" data-reveal="up">{home.team.description}</p>
      <div className="team__preview" data-reveal="up"><Brand compact /><span className="team__preview-title">Team introductions coming soon</span><p>Approved profiles and photography will be added here.</p><ContactButton mode="team">{home.team.cta}</ContactButton></div>
    </section>

    <section className="connections" id="connections" aria-labelledby="connections-title">
      <div className="connections__brand" aria-hidden="true" data-reveal="left"><Brand compact /></div>
      <div className="connections__copy"><SectionHeading eyebrow="Professional Connections" title={home.connections.title} id="connections-title" /><p data-reveal="up">{home.connections.description}</p><div data-reveal="up"><ContactButton topic="Professional connections">{home.connections.cta}</ContactButton></div></div>
    </section>

    <div className="buyers-sellers">
      {(["buyers", "sellers"] as const).map((kind) => <section className={`journey journey--${kind}`} id={kind} key={kind} aria-labelledby={`${kind}-title`} data-reveal={kind === "buyers" ? "left" : "right"}>
        <Photo name={kind} decorative /><div className="journey__shade" />
        <div className="journey__heading"><span className="eyebrow">For {kind}</span><h2 id={`${kind}-title`}>{home[kind].title}</h2></div>
        <div className="journey__copy"><p>{home[kind].description}</p><ContactButton className="button button--light" topic={kind === "buyers" ? "Buying" : "Selling"}>{home[kind].cta}</ContactButton></div>
      </section>)}
    </div>

    <section className="closing" id="contact" aria-labelledby="closing-title">
      <Photo name="residential" decorative /><div className="closing__shade" /><div className="closing__content"><SectionHeading eyebrow="Let’s Begin" title={home.closing.title} id="closing-title" className="centered" /><p data-reveal="up">{home.closing.description}</p><div data-reveal="up"><ContactButton className="button button--accent">{home.closing.cta}</ContactButton></div></div>
    </section>
  </main>;
}
