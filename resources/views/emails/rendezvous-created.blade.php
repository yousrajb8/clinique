<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto; }
        h1 { color: #2d6a4f; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        td:first-child { font-weight: bold; color: #555; width: 40%; }
        .footer { margin-top: 30px; color: #888; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🐾 Rendez-vous Enregistré</h1>
        <p>Bonjour <strong>{{ $rendezvous->user->name }}</strong>,</p>
        <p>Votre rendez-vous a été enregistré avec succès et est en attente de confirmation par notre équipe.</p>
        <table>
            <tr><td>🐶 Animal</td><td>{{ $rendezvous->animal->nom }}</td></tr>
            <tr><td>💊 Service</td><td>{{ $rendezvous->service->nom }}</td></tr>
            <tr><td>👨‍⚕️ Vétérinaire</td><td>{{ $rendezvous->veterinaire->nom }}</td></tr>
            <tr><td>📅 Date</td><td>{{ $rendezvous->date }}</td></tr>
            <tr><td>🕐 Heure</td><td>{{ $rendezvous->heure }}</td></tr>
            <tr><td>📋 Statut</td><td>En attente</td></tr>
        </table>
        <p>Merci de votre confiance !</p>
        <div class="footer">
            <p>Clinique Vétérinaire — cliniqueveto@gmail.com</p>
        </div>
    </div>
</body>
</html>
