'use client'

import { AuthFormLayout } from '../ui/auth-form-layout'
import { AuthFields } from '../ui/fields'
import { SubmitButton } from '../ui/submit-button'
import { BottomLink } from '../ui/bottom-link'
import { ErrorMessage } from '../ui/auth-alert'
import { useActionState } from '@/shared/lib/react'
import { signUpAction, SignUpFormState } from '../actions/sign-up'
import { routes } from '@/kernel/routes'

export function SignUpForm() {
	const [formState, action, isPending] = useActionState(
		signUpAction,
    {} as SignUpFormState
	)

	return (
		<AuthFormLayout
			title="Sing Up"
			discription="Enter your login below to create your account"
			action={action}
			fields={<AuthFields {...formState} />}
			actions={<SubmitButton isPending={isPending}>Sign Up</SubmitButton>}
			error={<ErrorMessage error={formState.errors?._errors}/>}
			link={
				<BottomLink
					text="Already have an account?"
					linkText="Sign In"
					url={routes.signIn()}
				/>
			}
		/>
	)
}
