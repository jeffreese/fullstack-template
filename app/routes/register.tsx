import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod/v4'
import { Form, Link, redirect, useActionData } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { auth } from '~/lib/auth.server'
import { registerSchema } from '~/lib/schemas'
import type { Route } from './+types/register'

export function meta() {
  return [{ title: 'Register — Fullstack Template' }]
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema: registerSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const { name, email, password } = submission.value

  const result = await auth.api.signUpEmail({
    body: { name, email, password },
    asResponse: true,
  })

  if (!result.ok) {
    const data = await result.json().catch(() => null)
    return submission.reply({
      formErrors: [
        data?.message || 'Registration failed. Email may already be in use.',
      ],
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

export default function Register() {
  const lastResult = useActionData<typeof action>()
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: registerSchema })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-2xl font-bold mb-6">Create an account</h1>

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
            <Label htmlFor={fields.name.id}>Name</Label>
            <Input
              id={fields.name.id}
              name={fields.name.name}
              type="text"
              placeholder="Your name"
              autoComplete="name"
              error={!!fields.name.errors}
            />
            {fields.name.errors && (
              <p className="mt-1 text-xs text-danger">
                {fields.name.errors[0]}
              </p>
            )}
          </div>

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
              autoComplete="new-password"
              error={!!fields.password.errors}
            />
            {fields.password.errors && (
              <p className="mt-1 text-xs text-danger">
                {fields.password.errors[0]}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor={fields.confirmPassword.id}>Confirm Password</Label>
            <Input
              id={fields.confirmPassword.id}
              name={fields.confirmPassword.name}
              type="password"
              autoComplete="new-password"
              error={!!fields.confirmPassword.errors}
            />
            {fields.confirmPassword.errors && (
              <p className="mt-1 text-xs text-danger">
                {fields.confirmPassword.errors[0]}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Create account
          </Button>
        </div>
      </Form>

      <p className="mt-4 text-center text-sm text-text-muted">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}
