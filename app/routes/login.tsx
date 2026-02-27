import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod/v4'
import { Form, Link, redirect, useActionData } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { auth } from '~/lib/auth.server'
import { loginSchema } from '~/lib/schemas'
import type { Route } from './+types/login'

export function meta() {
  return [{ title: 'Login — Fullstack Template' }]
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema: loginSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const { email, password } = submission.value

  const result = await auth.api.signInEmail({
    body: { email, password },
    asResponse: true,
  })

  if (!result.ok) {
    return submission.reply({
      formErrors: ['Invalid email or password'],
    })
  }

  // Forward set-cookie headers from better-auth
  const headers = new Headers()
  const setCookie = result.headers.get('set-cookie')
  if (setCookie) {
    headers.set('set-cookie', setCookie)
  }

  return redirect('/', { headers })
}

export default function Login() {
  const lastResult = useActionData<typeof action>()
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <Form method="post" id={form.id} onSubmit={form.onSubmit} noValidate>
        {form.errors && (
          <div className="mb-4 rounded-lg bg-danger-light px-4 py-3 text-sm text-danger">
            {form.errors.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor={fields.email.id}>Email</Label>
            <Input
              id={fields.email.id}
              name={fields.email.name}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              error={!!fields.email.errors}
            />
            {fields.email.errors && (
              <p className="mt-1 text-xs text-danger">
                {fields.email.errors[0]}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor={fields.password.id}>Password</Label>
            <Input
              id={fields.password.id}
              name={fields.password.name}
              type="password"
              autoComplete="current-password"
              error={!!fields.password.errors}
            />
            {fields.password.errors && (
              <p className="mt-1 text-xs text-danger">
                {fields.password.errors[0]}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </Form>

      <p className="mt-4 text-center text-sm text-text-muted">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  )
}
