import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    if (event.user) {
      delete event.user.ip_address;
      delete event.user.email;
    }
    return event;
  },
}) 