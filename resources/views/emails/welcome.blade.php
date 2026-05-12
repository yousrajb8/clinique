<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto; }
        h1 { color: #2d6a4f; }
        .footer { margin-top: 30px; color: #888; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🐾 Bienvenue chez MaClinique Veto !</h1>
        <p>Bonjour <strong>{{ $user->name }}</strong>,</p>
        <p>Nous sommes ravis de vous compter parmi nos clients. Votre compte a été créé avec succès.</p>
        <p>Vous pouvez dès à présent ajouter vos animaux et prendre rendez-vous avec nos vétérinaires.</p>
        <p>Merci de votre confiance !</p>
        <div class="footer">
            <p>Clinique Vétérinaire — cliniqueveto@gmail.com</p>
        </div>
    </div>
</body>
</html>
