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
  cohortDate?: string
  cohortTime?: string
  variant?: '4h' | '1h'
}

const DEFAULTS = {
  checkoutUrl: 'https://www.zeroappleaday.site/order',
  cohortDate: '10 August 2026',
  cohortTime: '3:00 PM PKT',
}

const Email = ({
  name = 'Parent',
  checkoutUrl = DEFAULTS.checkoutUrl,
  cohortDate = DEFAULTS.cohortDate,
  cohortTime = DEFAULTS.cohortTime,
  variant = '4h',
}: Props) => {
  const isFinal = variant === '1h'
  const headline = isFinal ? 'Starts in 1 Hour — Last Chance ⏰' : '4 Hours Left to Join Today ⏳'
  const preview = isFinal
    ? `Confident Parent Academy starts in 1 hour at ${cohortTime}`
    : `Confident Parent Academy starts today at ${cohortTime}`

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{headline}</Heading>
          <Text style={text}>Hi {name},</Text>

          {isFinal ? (
            <>
              <Text style={textBold}>
                Confident Parent Academy starts in just 1 hour at {cohortTime}.
              </Text>
              <Text style={text}>Registration is closing very soon.</Text>
              <Text style={text}>
                Your child does not need a perfect parent. They need a parent who is willing to
                learn, grow, and respond with more confidence.
              </Text>
            </>
          ) : (
            <>
              <Text style={textBold}>
                Confident Parent Academy starts today at {cohortTime}.
              </Text>
              <Text style={text}>You started your registration but did not complete it.</Text>
              <Text style={text}>
                This is your opportunity to get practical guidance that can help you handle your
                child’s behaviour, emotions, communication, routines, and discipline with more
                calm and confidence.
              </Text>
              <Text style={text}>You still have time to join.</Text>
            </>
          )}

          <Section style={card}>
            <Text style={detail}>📅 {cohortDate}</Text>
            <Text style={detail}>🕒 {cohortTime}</Text>
          </Section>

          <Section style={{ textAlign: 'center', margin: '24px 0' }}>
            <Button href={checkoutUrl} style={button}>
              {isFinal ? 'Secure My Access Now' : 'Complete My Registration'}
            </Button>
          </Section>

          <Text style={smallText}>
            Or copy this link into your browser:
            <br />
            <a href={checkoutUrl} style={linkText}>
              {checkoutUrl}
            </a>
          </Text>

          <Hr style={hr} />

          <Text style={signature}>
            Warm regards,
            <br />
            <strong>Team Confident Parent Academy</strong>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const previewData = {
  name: 'Ayesha',
  checkoutUrl: DEFAULTS.checkoutUrl,
  cohortDate: DEFAULTS.cohortDate,
  cohortTime: DEFAULTS.cohortTime,
}

export const template4h = {
  component: (props: Props) => <Email {...props} variant="4h" />,
  subject: '4 hours left to join Confident Parent Academy',
  displayName: 'Deadline Reminder — 4 hours before',
  previewData,
} satisfies TemplateEntry

export const template1h = {
  component: (props: Props) => <Email {...props} variant="1h" />,
  subject: 'Starts in 1 hour — last chance to join',
  displayName: 'Deadline Reminder — 1 hour before',
  previewData,
} satisfies TemplateEntry

export default Email

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '600px' }
const h1 = { fontSize: '26px', fontWeight: 'bold' as const, color: '#0f172a', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#334155', lineHeight: '1.6', margin: '0 0 16px' }
const textBold = {
  fontSize: '15px',
  color: '#0f172a',
  lineHeight: '1.6',
  margin: '0 0 16px',
  fontWeight: 'bold' as const,
}
const smallText = { fontSize: '13px', color: '#64748b', lineHeight: '1.5', margin: '12px 0' }
const linkText = { color: '#16a34a', wordBreak: 'break-all' as const }
const card = {
  backgroundColor: '#f8fafc',
  border: '2px solid #fbbf24',
  borderRadius: '10px',
  padding: '20px',
  margin: '20px 0',
}
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