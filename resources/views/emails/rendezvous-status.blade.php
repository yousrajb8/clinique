<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto; }
        h1 { color: {{ $rendezvous->statut === 'confirme' ? '#2d6a4f' : '#d90429' }}; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        td:first-child { font-weight: bold; color: #555; width: 40%; }
        .footer { margin-top: 30px; color: #888; font-size: 12px; }
        .status { font-weight: bold; text-transform: uppercase; color: {{ $rendezvous->statut === 'confirme' ? '#2d6a4f' : '#d90429' }}; }
    </style>
</head>
<body>
    <div class="container">
        @if($rendezvous->statut === 'confirme')
            <h1>✅ Rendez-vous Confirmé</h1>
            <p>Bonjour <strong>{{ $rendezvous->user->name }}</strong>,</p>
            <p>Bonne nouvelle ! Votre rendez-vous a été confirmé par notre équipe.</p>
        @else
            <h1>❌ Rendez-vous Annulé</h1>
            <p>Bonjour <strong>{{ $rendezvous->user->name }}</strong>,</p>
            <p>Nous vous informons que votre rendez-vous a été annulé.</p>
        @endif

        <table>
            <tr><td>🐶 Animal</td><td>{{ $rendezvous->animal->nom }}</td></tr>
            <tr><td>💊 Service</td><td>{{ $rendezvous->service->nom }}</td></tr>
            <tr><td>👨‍⚕️ Vétérinaire</td><td>{{ $rendezvous->veterinaire->nom }}</td></tr>
            <tr><td>📅 Date</td><td>{{ $rendezvous->date }}</td></tr>
            <tr><td>🕐 Heure</td><td>{{ $rendezvous->heure }}</td></tr>
            <tr><td>📋 Statut</td><td class="status">{{ $rendezvous->statut === 'confirme' ? 'Confirmé' : 'Annulé' }}</td></tr>
        </table>

        @if($rendezvous->statut === 'confirme')
            <p>Nous avons hâte de vous voir !</p>
        @else
            <p>N'hésitez pas à reprendre un rendez-vous ultérieurement.</p>
        @endif

        <div class="footer">
            <p>Clinique Vétérinaire — cliniqueveto@gmail.com</p>
        </div>
    </div>
</body>
</html>
