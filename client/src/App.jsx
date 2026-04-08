import { useState } from 'react'

import Button from './components/library/Button'
import Card from './components/Card'
import Alert from './components/Alert'
import Accordion from './components/Accordion'
import IconPreview from './components/IconPreview'

export default function App() {
  const [flippedCard, setFlippedCard] = useState(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [bio, setBio] = useState('')

  const [iconStyle, setIconStyle] = useState({ background: '#ffffff', foreground: '#2b1f0f' })

  const cardData = [
    {
      id: 'galaxy',
      imgUri: "/images/galaxy.webp",
      altText: "galaxy",
      caption: "A galaxy is a collection of stars, gas, and dust held together by gravity.",
      citation: "Microsoft Copilot",
    },
    {
      id: 'asteroid',
      imgUri: '/images/asteroid.webp',
      altText: 'asteroid',
      caption: 'An asteroid is a small rocky body that orbits the sun.',
    },
    {
      id: 'black-hole',
      imgUri: '/images/black-hole.webp',
      altText: 'black hole',
      caption: 'A black hole, a region of space where gravity is so strong that nothing can escape it.',
    },
    {
      id: 'cloud-nebulae',
      imgUri: '/images/cloud-nebulae.webp',
      altText: 'cloud nebulae',
      caption: 'A cloud of gas and dust in space.',
      bgColor: '#d8e0ff',
    },
    {
      id: 'distant-space',
      imgUri: '/images/distant-space.webp',
      altText: 'distant space',
      citation: 'Microsoft Copilot',
      bgColor: '#c9f4e2',
    },
    {
      id: 'galaxy-collision',
      imgUri: '/images/galaxy-collision.webp',
      altText: 'galaxy collision',
      caption: 'A galaxy collision is a cosmic event that occurs when two or more galaxies come close enough to interact gravitationally.',
    },
    {
      id: 'moon',
      imgUri: '/images/moon.webp',
      altText: 'moon',
      citation: 'Microsoft Copilot',
    },
    {
      id: 'pulsar',
      imgUri: '/images/pulsar.webp',
      caption: 'A pulsar is a rapidly rotating neutron star that emits beams of electromagnetic radiation.',
      altText: 'pulsar',
      bgColor: '#e3cef2',
    },
    {
      id: 'star-death',
      imgUri: '/images/star-death.webp',
      altText: 'star death',
      caption: 'The death of a star is a natural part of its life cycle.',
    },
    {
      id: 'sun',
      imgUri: '/images/sun.webp',
      altText: 'sun',
      caption: 'The sun is a star at the center of our solar system.',
    }
  ]

  const accordionData = [
    {
      title: 'What is a galaxy?',
      content: <p>A galaxy is a huge collection of stars, gas, and dust held together by gravity. Our solar system is part of the <strong>Milky Way</strong> galaxy.</p>,
    },
    {
      title: 'How do black holes work?',
      content: <p>A black hole is a region of space where gravity is so strong that nothing, not even light, can escape <em>once it crosses the event horizon</em>.</p>,
    },
    {
      title: 'What is a pulsar?',
      content: <p>A pulsar is a rapidly rotating neutron star that emits beams of radiation. As it spins, those beams sweep across space like a lighthouse signal.</p>,
    }
  ]

  return (
    <main>
      <Alert message="Welcome to the space gallery!" />

      <h2>Component Library</h2>
      <div className="space-x-4">
        <Button>Default</Button>
        <Button color="primary">Primary</Button>
      </div>

      <h2><abbr title="Frequently Asked Questions">FAQ</abbr></h2>
      <Accordion items={accordionData} />

      <h2>Gallery</h2>
      <div className="gallery">
        {cardData.map((card, index) => (
          <Card
            key={card.id}
            imgUri={card.imgUri}
            altText={card.altText}
            caption={card.caption}
            citation={card.citation}
            bgColor={card.bgColor}
            isFlipped={flippedCard === card.id}
            onFlip={(showBack) => setFlippedCard(showBack ? card.id : null)}
          />
        ))}
      </div>

      <h2>Icon Editor</h2>
      <section className="icon-editor" aria-label="Icon editor">
        <div className="icon-editor-controls">
          <label htmlFor="icon-background">Background</label>
          <input
            id="icon-background"
            type="color"
            value={iconStyle.background}
            onChange={(event) => setIconStyle((style) => ({ ...style, background: event.target.value }))}
          />

          <label htmlFor="icon-foreground">Foreground</label>
          <input
            id="icon-foreground"
            type="color"
            value={iconStyle.foreground}
            onChange={(event) => setIconStyle((style) => ({ ...style, foreground: event.target.value }))}
          />
        </div>

        <IconPreview
          backgroundColor={iconStyle.background}
          foregroundColor={iconStyle.foreground}
        />
      </section>

      <h2>Controlled Inputs</h2>

      <label>
        <input type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        Accept terms and conditions
      </label>

      <label htmlFor="bio">Bio</label>
      <textarea
        id="bio"
        placeholder="Tell us about yourself..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <h2>Debug Info</h2>
      <p>{new Date().toLocaleString()}</p>
    </main>
  )
}
