import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  checkoutUrl?: string
  sequenceNumber?: 1 | 2 | 3 | 4
  trainingDate?: string
  trainingTime?: string
}

const DEFAULTS = {
  checkoutUrl: 'https://www.zeroappleaday.site/order',
  trainingDate: '13th July 2026 (Monday)',
  trainingTime: '3:00 PM – 4:30 PM (Pakistan Standard Time)',
}

type Para = { text: string; bold?: boolean }
type Copy = {
  headline: string
  preview: string
  paras: Para[]
  bulletsIntro?: string
  bullets?: string[]
  postParas?: Para[]
  cta: string
}

const COPY: Record<1 | 2 | 3 | 4, Copy> = {
  1: {
    headline: "You're One Step Away 🎉",
    preview: 'Your Confident Parent Academy registration is still open',
    paras: [
      { text: 'You were just one step away from joining Confident Parent Academy… but your registration was not completed.' },
      { text: 'Maybe you got busy. Maybe you had a question. Or maybe you are still thinking: “Will this really help me?”' },
      {
        text:
          "But as a parent, the real question is: Can you afford to keep feeling confused, overwhelmed, or unsure about how to handle your child's behaviour, emotions, and future?",
        bold: true,
      },
      {
        text:
          'Inside Confident Parent Academy, you will learn practical parenting strategies to communicate better, build a stronger relationship with your child, and handle difficult situations with more confidence.',
      },
      { text: 'Your registration is still open for now.' },
    ],
    cta: 'Complete My Registration',
  },
  2: {
    headline: 'A Respectful But Honest Question',
    preview: 'Are you delaying investing in becoming a more confident parent?',
    paras: [
      { text: 'A respectful but honest question:' },
      {
        text:
          'You want the best future for your child… but are you delaying investing in becoming a better, more confident parent?',
        bold: true,
      },
      { text: 'Parenting does not come with a manual.' },
      {
        text:
          'Most parents keep trying random advice from relatives, social media videos, or YouTube clips… but still feel confused when their child does not listen, gets angry, becomes emotional, or struggles with routines.',
      },
      { text: 'Confident Parent Academy is designed to give you a clearer system.' },
    ],
    bulletsIntro: 'Inside, you will learn how to:',
    bullets: [
      'Communicate with your child without constant shouting',
      'Handle challenging behaviour more calmly',
      "Build your child's confidence and emotional safety",
      'Create better routines, discipline, and connection at home',
    ],
    postParas: [
      { text: "One small change in your parenting approach can create a big difference in your child's life." },
    ],
    cta: 'Join Confident Parent Academy',
  },
  3: {
    headline: 'No Parent Is Perfect',
    preview: 'From confusion to clarity — your registration is still incomplete',
    paras: [
      { text: 'Your registration is still incomplete.' },
      { text: "Let's be honest…" },
      { text: 'No parent is perfect.' },
      {
        text:
          'But every child needs a parent who is willing to learn, improve, and show up with more patience, clarity, and confidence.',
      },
      {
        text:
          'Confident Parent Academy is not about becoming a “perfect parent.” It is about helping you understand your child better and respond in a healthier way.',
      },
      { text: 'You will learn a practical parenting framework to help you move from:' },
    ],
    bullets: [
      'Confusion → Clarity',
      'Shouting → Better Communication',
      'Constant Stress → More Calm at Home',
      "Fear about your child's future → Confidence in your parenting",
    ],
    cta: 'Complete My Registration',
  },
  4: {
    headline: 'Final Reminder ⏰',
    preview: 'Last reminder — we are closing registrations soon',
    paras: [
      { text: 'This is the last reminder regarding your incomplete registration for Confident Parent Academy.' },
      { text: 'We will be closing registrations soon so we can focus properly on the parents who have joined.' },
      { text: 'Inside the academy, you will get practical guidance to help you:' },
    ],
    bullets: [
      'Build a stronger connection with your child',
      'Improve communication at home',
      'Handle anger, stubbornness, screen time, and routines better',
      'Raise a more emotionally secure and confident child',
      'Become calmer and more confident in your parenting decisions',
    ],
    postParas: [
      { text: 'Your child does not need a perfect parent.' },
      { text: 'They need a parent who is willing to grow.' },
    ],
    cta: 'Complete My Registration Now',
  },
}

const Email = ({
  name = 'Parent',
  checkoutUrl = DEFAULTS.checkoutUrl,
  sequenceNumber = 1,
}: Props) => {
  const c = COPY[sequenceNumber] ?? COPY[1]
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{c.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{c.headline}</Heading>
          <Text style={text}>Hi {name},</Text>

          {c.paras.map((p, i) => (
            <Text key={`p-${i}`} style={p.bold ? textBold : text}>
              {p.text}
            </Text>
          ))}

          {c.bulletsIntro && <Text style={text}>{c.bulletsIntro}</Text>}

          {c.bullets && (
            <Section style={card}>
              {c.bullets.map((b, i) => (
                <Text key={`b-${i}`} style={detail}>• {b}</Text>
              ))}
            </Section>
          )}

          {c.postParas?.map((p, i) => (
            <Text key={`pp-${i}`} style={p.bold ? textBold : text}>
              {p.text}
            </Text>
          ))}

          <Section style={{ textAlign: 'center', margin: '24px 0' }}>
            <Button href={checkoutUrl} style={button}>{c.cta}</Button>
          </Section>

          <Text style={smallText}>
            Or copy this link into your browser:<br />
            <a href={checkoutUrl} style={linkText}>{checkoutUrl}</a>
          </Text>

          <Hr style={hr} />

          <Text style={signature}>
            Warm regards,<br />
            <strong>Team Confident Parent Academy</strong>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const previewData = { name: 'Ayesha', checkoutUrl: DEFAULTS.checkoutUrl }

export const template1 = {
  component: (props: Props) => <Email {...props} sequenceNumber={1} />,
  subject: 'You Were One Step Away From Confident Parent Academy',
  displayName: 'Abandoned Checkout #1 (5 min)',
  previewData,
} satisfies TemplateEntry

export const template2 = {
  component: (props: Props) => <Email {...props} sequenceNumber={2} />,
  subject: 'A Respectful But Honest Question About Your Parenting',
  displayName: 'Abandoned Checkout #2 (1 hour)',
  previewData,
} satisfies TemplateEntry

export const template3 = {
  component: (props: Props) => <Email {...props} sequenceNumber={3} />,
  subject: 'No Parent Is Perfect — But Every Child Needs This',
  displayName: 'Abandoned Checkout #3 (24 hours)',
  previewData,
} satisfies TemplateEntry

export const template4 = {
  component: (props: Props) => <Email {...props} sequenceNumber={4} />,
  subject: 'Final Reminder — Registrations Are Closing Soon',
  displayName: 'Abandoned Checkout #4 (48 hours)',
  previewData,
} satisfies TemplateEntry

export default Email

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '600px' }
const h1 = { fontSize: '26px', fontWeight: 'bold' as const, color: '#0f172a', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#334155', lineHeight: '1.6', margin: '0 0 16px' }
const textBold = { fontSize: '15px', color: '#0f172a', lineHeight: '1.6', margin: '0 0 16px', fontWeight: 'bold' as const }
const smallText = { fontSize: '13px', color: '#64748b', lineHeight: '1.5', margin: '12px 0' }
const linkText = { color: '#16a34a', wordBreak: 'break-all' as const }
const card = {
  backgroundColor: '#f8fafc',
  border: '2px solid #fbbf24',
  borderRadius: '10px',
  padding: '20px',
  margin: '20px 0',
}
const cardHeader = { fontSize: '15px', color: '#0f172a', margin: '0 0 12px', fontWeight: 'bold' as const }
const detail = { fontSize: '15px', color: '#0f172a', lineHeight: '1.6', margin: '0 0 8px' }
const button = {
  backgroundColor: '#16a34a',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold' as const,
  borderRadius: '8px',
  padding: '14px 28px',
  textDecoration: 'none',
  display: 'inline-block',
}
const hr = { borderColor: '#e2e8f0', margin: '24px 0' }
const signature = { fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: '0' }
