@component('mail::message')
  # Reset Your Password

  Hi there,

  We received a request to reset your password.
  Click the button below to choose a new password:

  @component('mail::button', ['url' => $resetUrl])
    Reset Password
  @endcomponent

  If you did not request a password reset, no action is required.

  Thanks,
  {{ config('app.name') }}
@endcomponent
