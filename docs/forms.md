# Forms

We use [Conform](https://conform.guide/) with
[Zod](https://zod.dev/) for form handling. This gives us progressive
enhancement (forms work without JavaScript), server-side validation, and
type-safe form schemas.

## How It Works

The pattern has three parts:

1. **Schema** — A Zod schema defining the form fields and validation rules
2. **Action** — A server-side action that validates the submission
3. **Component** — A React component using Conform hooks for the form UI

## Defining Schemas

Schemas live in `app/lib/schemas.ts`:

```ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})
```

## Server Validation

In the route action, use `parseWithZod` to validate form data:

```ts
import { parseWithZod } from '@conform-to/zod/v4'
import { loginSchema } from '~/lib/schemas'

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema: loginSchema })

  if (submission.status !== 'success') {
    return { lastResult: submission.reply() }
  }

  const { email, password } = submission.value
  // Do something with the validated data...
}
```

**Important:** We import from `@conform-to/zod/v4`, not `@conform-to/zod`. The
`/v4` subpath is required for compatibility with Zod v4.

## Form Component

Use Conform's `useForm` hook to wire up the form:

```ts
import { useForm, getFormProps, getInputProps } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod/v4'
import { Form, useActionData } from 'react-router'
import { loginSchema } from '~/lib/schemas'

export default function LoginPage() {
  const actionData = useActionData<typeof action>()
  const [form, fields] = useForm({
    lastResult: actionData?.lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })

  return (
    <Form method="post" {...getFormProps(form)}>
      <input {...getInputProps(fields.email, { type: 'email' })} />
      {fields.email.errors && <p>{fields.email.errors}</p>}

      <input {...getInputProps(fields.password, { type: 'password' })} />
      {fields.password.errors && <p>{fields.password.errors}</p>}

      <button type="submit">Log in</button>
    </Form>
  )
}
```

## Progressive Enhancement

Because Conform works with standard `<form>` elements and the validation runs in
the server action, forms work even when JavaScript hasn't loaded. When JS is
available, `onValidate` adds instant client-side validation.

This is why we use React Router's `<Form>` component (which submits via fetch
when JS is loaded) and regular HTML form attributes like `method="post"`.

## Validation Timing

The `shouldValidate` and `shouldRevalidate` options control when validation
runs:

- `shouldValidate: 'onBlur'` — Validate when the user leaves a field
- `shouldRevalidate: 'onInput'` — Re-validate on every keystroke after the first
  error

This gives a good UX: errors don't appear while typing, but once shown, they
clear immediately when fixed.

## Custom Components

The template includes styled form components in `app/components/ui/`:

- `<Button>` — Styled button with variants
- `<Input>` — Styled input compatible with Conform's `getInputProps`
- `<Label>` — Styled label

These are thin wrappers around HTML elements. They accept all standard props
and forward refs.

## Why Conform?

See [Decision 005 — Forms](./decisions/005-forms.md) for why we chose Conform
over alternatives like react-hook-form.
