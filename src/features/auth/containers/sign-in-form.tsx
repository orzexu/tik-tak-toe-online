'use client'

import { AuthFormLayout } from '../ui/auth-form-layout'
import { AuthFields } from '../ui/fields'
import { SubmitButton } from '../ui/submit-button'
import { BottomLink } from '../ui/bottom-link'
import { ErrorMessage } from '../ui/auth-alert'
import { useActionState } from '@/shared/lib/react'
import { signInAction, SignInFormState } from '../actions/sign-in'
import { routes } from '@/kernel/routes'

export function SignInForm() {
	const [formState, action, isPending] = useActionState(
    signInAction,
    {} as SignInFormState
  )

	return (
		<AuthFormLayout
			title="Sing In"
			discription="Sign in to your account"
			action={action}
			fields={<AuthFields {...formState} />}
			actions={<SubmitButton isPending={isPending}>Sign In</SubmitButton>}
			error={<ErrorMessage error={formState.errors?._errors} />}
			link={
				<BottomLink
					text="Do not have an account?"
					linkText="Sign Up"
					url={routes.signUp()}
				/>
			}
		/>
	)
}
