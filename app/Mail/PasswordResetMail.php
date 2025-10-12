<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
  use Queueable, SerializesModels;

  public $token;
  public $email;
  /**
   * Create a new message instance.
   */
  public function __construct($token,  $email)
  {
    $this->token = $token;
    $this->email = $email;
  }




  /**
   * Get the message envelope.
   */
  public function envelope(): Envelope
  {
    return new Envelope(
      subject: 'Reset Your Password',
    );
  }

  /**
   * Get the message content definition.
   */
  public function content(): Content
  {
    $resetUrl = config('app.frontend_url') . "/reset-password?token={$this->token}&email={$this->email}";

    return new Content(
      markdown: 'emails.password-reset',
      with: [
        'resetUrl' => $resetUrl,
        'email' => $this->email,
      ],
    );
  }

  /**
   * Get the attachments for the message.
   *
   * @return array<int, \Illuminate\Mail\Mailables\Attachment>
   */
  public function attachments(): array
  {
    return [];
  }
}
