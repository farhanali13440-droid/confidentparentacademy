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
  trainingDate: '11th July 2026 (Saturday)',
  trainingTime: '3:00 PM – 4:30 PM (Pakistan Standard Time)',
}

type Copy = { headline: string; preview: string; intro: string; body: string; cta: string }

const COPY: Record<1 | 2 | 3 | 4, Copy> = {
  1: {
    headline: "You're Almost In 🎉",
    preview: "Complete your Confident Parent Academy webinar registration",
    intro:
      "You opted in for the Confident Parent Academy parenting webinar but your registration isn't complete yet.",
    body:
      "Your seat will only be confirmed once your payment is submitted. Tap the button below to complete the simple checkout — it only takes a minute.",
    cta: 'Complete My Registration',
  },
  2: {
    headline: 'Your Seat Is Still Waiting',
    preview: 'Your Confident Parent Academy webinar seat is still open',
    intro:
      'We noticed you started the registration but did not finish payment. Your seat is still reserved for now.',
    body:
      'Seats are limited and we want to make sure you get yours. Tap below to complete your registration before someone else takes it.',
    cta: 'Complete My Registration',
  },
  3: {
    headline: 'Parents Are Already Building Calmer, Happier Homes',
    preview: 'Parents are already enrolling — join them',
    intro:
      'Dozens of parents have already enrolled in the Confident Parent Academy webinar and are getting ready to transform how they connect with their children.',
    body:
      "Don't miss the chance to be in the room with them. Complete your registration now so you don't get left behind.",
    cta: 'Complete My Registration',
  },
  4: {
    headline: 'Final Reminder ⏰',
    preview: 'Final reminder — complete your registration before you miss out',
    intro:
      "This is the final reminder. Your registration for the Confident Parent Academy webinar is still incomplete.",
    body:
      "After this we won't follow up again — your reserved seat will be released. Tap below to lock in your spot right now.",
    cta: 'Complete My Registration Now',
  },
}

const Email = ({
  name = 'Parent',
  checkoutUrl = DEFAULTS.checkoutUrl,
  sequenceNumber = 1,
  trainingDate = DEFAULTS.trainingDate,
  trainingTime = DEFAULTS.trainingTime,
}: Props) => {
  const c = COPY[sequenceNumber] ?? COPY[1]
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{c.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{c.headline}</Heading>
          <Text style={text}>Assalam-o-Alaikum {name},</Text>
          <Text style={text}>{c.intro}</Text>

          <Section style={card}>
            <Text style={cardHeader}>Live Webinar Details:</Text>
            <Text style={detail}>📅 <strong>Date:</strong> {trainingDate}</Text>
            <Text style={detail}>⏰ <strong>Time:</strong> {trainingTime}</Text>
            <Text style={detail}>📍 <strong>Location:</strong> Live on Google Meet</Text>
          </Section>

          <Text style={text}>{c.body}</Text>

          <Section style={{ textAlign: 'center', margin: '24px 0' }}>
            <Button href={checkoutUrl} style={button}>{c.cta}</Button>
          </Section>

          <Text style={smallText}>
            Or copy this link into your browser:<br />
            <a href={checkoutUrl} style={linkText}>{checkoutUrl}</a>
          </Text>

          <Hr style={hr} />

          <Text style={signature}>
            Regards,<br />
            <strong>Confident Parent Academy</strong><br />
            Miss Samra Riaz
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const previewData = { name: 'Ayesha', checkoutUrl: DEFAULTS.checkoutUrl }

export const template1 = {
  component: (props: Props) => <Email {...props} sequenceNumber={1} />,
  subject: "You're Almost In — Complete Your Confident Parent Academy Registration",
  displayName: 'Abandoned Checkout #1 (5 min)',
  previewData,
} satisfies TemplateEntry

export const template2 = {
  component: (props: Props) => <Email {...props} sequenceNumber={2} />,
  subject: 'Your Confident Parent Academy Seat Is Still Waiting',
  displayName: 'Abandoned Checkout #2 (1 hour)',
  previewData,
} satisfies TemplateEntry

export const template3 = {
  component: (props: Props) => <Email {...props} sequenceNumber={3} />,
  subject: 'Parents Are Already Building Calmer, Happier Homes',
  displayName: 'Abandoned Checkout #3 (24 hours)',
  previewData,
} satisfies TemplateEntry

export const template4 = {
  component: (props: Props) => <Email {...props} sequenceNumber={4} />,
  subject: 'Final Reminder — Complete Your Registration Before You Miss Out',
  displayName: 'Abandoned Checkout #4 (48 hours)',
  previewData,
} satisfies TemplateEntry

export default Email

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '600px' }
const h1 = { fontSize: '26px', fontWeight: 'bold' as const, color: '#0f172a', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#334155', lineHeight: '1.6', margin: '0 0 16px' }
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
