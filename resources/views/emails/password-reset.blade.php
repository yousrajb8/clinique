<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px; margin: 0; }
        .container { background-color: #ffffff; padding: 0; border-radius: 24px; max-width: 600px; margin: auto; overflow: hidden; shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
        .header { background-color: #2563eb; padding: 40px; text-align: center; color: #ffffff; }
        .content { padding: 40px; color: #334155; line-height: 1.6; }
        .footer { padding: 30px; text-align: center; color: #94a3b8; font-size: 13px; background-color: #f1f5f9; }
        .button { display: inline-block; padding: 16px 32px; background-color: #2563eb; color: #ffffff !important; text-decoration: none; border-radius: 16px; font-weight: bold; margin: 30px 0; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2); }
        .logo { font-size: 40px; margin-bottom: 10px; }
        h1 { margin: 0; font-size: 24px; font-weight: 800; }
        p { margin: 0 0 20px; }
        .warning { font-size: 12px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🐾</div>
            <h1>VetClinic</h1>
            <p style="margin: 10px 0 0; color: #bfdbfe; font-size: 16px;">Sécurisez votre compte</p>
        </div>
        
        <div class="content">
            <p>Bonjour,</p>
            <p>Vous recevez cet e-mail car nous avons reçu une demande de réinitialisation de mot de passe pour votre compte sur <strong>VetClinic</strong>.</p>
            
            <div style="text-align: center;">
                <a href="{{ $url }}" class="button">Réinitialiser mon mot de passe</a>
            </div>
            
            <p>Ce lien de réinitialisation de mot de passe expirera dans 60 minutes.</p>
            <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, aucune autre action n'est requise.</p>
            
            <div class="warning">
                Si vous rencontrez des problèmes avec le bouton ci-dessus, copiez et collez l'URL ci-dessous dans votre navigateur Web :<br>
                <span style="word-break: break-all; color: #2563eb;">{{ $url }}</span>
            </div>
        </div>
        
        <div class="footer">
            <p>© 2026 VetClinic. Tous droits réservés.</p>
            <p>cliniqueveto@gmail.com</p>
        </div>
    </div>
</body>
</html>
