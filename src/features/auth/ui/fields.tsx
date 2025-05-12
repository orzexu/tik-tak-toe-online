import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useId } from 'react'

export function AuthFields({formData, errors}: {
  formData?: FormData,
  errors?: {
    login?: string,
    password?: string,
  }
}) {
	const loginId = useId()
	const passwordId = useId()
	return (
		<>
			<div className="space-y-2">
				<Label htmlFor={loginId}>Login</Label>
				<Input
					id={loginId}
					type="login"
          name='login'
					placeholder="enter your login"
          defaultValue={(formData?.get('login'))?.toString()}
					required
				/>
        {errors?.login && <div className='text-destructive'>{errors.login}</div>}
			</div>
			<div className="space-y-2">
				<Label htmlFor={passwordId}>Password</Label>
				<Input
					id={passwordId}
					type="password"
          name='password'
					placeholder="password"
          defaultValue={(formData?.get('password'))?.toString()}
					required
				/>
        {errors?.password && <div className='text-destructive'>{errors.password}</div>}
			</div>
		</>
	)
}
