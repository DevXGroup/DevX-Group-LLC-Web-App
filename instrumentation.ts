const redactEvent = (event: any) => {
  const stripHeaders = ['authorization', 'cookie', 'x-forwarded-for']

  if (event.request?.headers) {
    for (const header of stripHeaders) {
      if (event.request.headers[header]) {
        event.request.headers[header] = '[redacted]'
      }
    }
  }

  if (event.request?.data) {
    event.request.data = '[redacted]'
  }

  if (event.user) {
    if ('email' in event.user) {
      event.user.email = '[redacted]'
    }
    if ('ip_address' in event.user) {
      event.user.ip_address = '[redacted]'
    }
  }

  const sanitize = (value: unknown): unknown => {
    if (typeof value === 'string') {
      return value.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted]')
    }
    if (Array.isArray(value)) {
      return value.map(sanitize)
    }
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, val]) => [key, sanitize(val)])
      )
    }
    return value
  }

  if (event.extra) {
    event.extra = sanitize(event.extra)
  }

  if (event.contexts) {
    event.contexts = sanitize(event.contexts)
  }

  return event
}

export async function register() {
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

  // Only initialize Sentry if DSN is provided
  if (!dsn) return

  try {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      const Sentry = await import('@sentry/nextjs')

      Sentry.init({
        dsn,
        tracesSampleRate: 1.0,
        debug: process.env.NODE_ENV === 'development',

        ignoreErrors: ['ECONNREFUSED', 'ENOTFOUND', 'HMR'],

        beforeSend(event, _hint) {
          if (process.env.NODE_ENV === 'development' && !process.env.SENTRY_DEBUG) {
            return null
          }

          if (
            event.exception?.values?.some(
              (exception) =>
                exception.value?.includes('runtime.sendMessage') &&
                exception.value?.includes('Tab not found')
            )
          ) {
            return null
          }

          return redactEvent(event)
        },
      })
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
      const Sentry = await import('@sentry/nextjs')

      Sentry.init({
        dsn,
        tracesSampleRate: 1.0,
        debug: process.env.NODE_ENV === 'development',

        beforeSend(event) {
          return redactEvent(event)
        },
      })
    }
  } catch (e) {
    console.warn('[instrumentation] Sentry failed to initialize:', e)
  }
}

export async function onRequestError(
  err: Error,
  request: Request,
  context: {
    routerKind: 'Pages Router' | 'App Router'
    routePath: string
    routeType: 'render' | 'route' | 'action' | 'middleware'
  }
) {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN && !process.env.SENTRY_DSN) return

  try {
    const Sentry = await import('@sentry/nextjs')
    Sentry.captureRequestError(err, request as any, context)
  } catch {
    // Ignore — Sentry may not be compatible with the current Next.js runtime
  }
}
