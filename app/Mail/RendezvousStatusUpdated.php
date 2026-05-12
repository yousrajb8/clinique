<?php

namespace App\Mail;

use App\Models\Rendezvous;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RendezvousStatusUpdated extends Mailable
{
    use Queueable, SerializesModels;

    public Rendezvous $rendezvous;

    public function __construct(Rendezvous $rendezvous)
    {
        $this->rendezvous = $rendezvous;
    }

    public function envelope(): Envelope
    {
        $statusLabel = $this->rendezvous->statut === 'confirme' ? 'Confirmé' : 'Annulé';
        return new Envelope(
            subject: "Votre rendez-vous est $statusLabel",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.rendezvous-status',
        );
    }
}
