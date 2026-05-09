<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            padding: 30px;
            color: #333;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 10px;
            max-width: 600px;
            margin: auto;
            border: 1px solid #e0e0e0;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #3b82f6;
            font-size: 24px;
            margin: 0;
        }
        .header p {
            color: #888;
            margin: 5px 0 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        td {
            padding: 12px 15px;
            border-bottom: 1px solid #f0f0f0;
        }
        td:first-child {
            font-weight: bold;
            color: #555;
            width: 40%;
            background-color: #f8f9fa;
        }
        .statut {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: bold;
            background-color: #fef3c7;
            color: #d97706;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            color: #aaa;
            font-size: 12px;
            border-top: 1px solid #e0e0e0;
            padding-top: 20px;
        }
        .emoji-icon {
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="container">

        <div class="header">
            <h1>Clinique Vétérinaire</h1>
            <p>Confirmation de Rendez-vous</p>
        </div>

        <p>Bonjour <strong>{{ $rendezvous->user->name }}</strong>,</p>
        <p>Voici les détails de votre rendez-vous :</p>

        <table>
            <tr>
                <td>Animal</td>
                <td>{{ $rendezvous->animal->nom }}</td>
            </tr>
            <tr>
                <td>Service</td>
                <td>{{ $rendezvous->service->nom }}</td>
            </tr>
            <tr>
                <td>Vétérinaire</td>
                <td>{{ $rendezvous->veterinaire->nom }} ({{ $rendezvous->veterinaire->specialite }})</td>
            </tr>
            <tr>
                <td>Date</td>
                <td>{{ \Carbon\Carbon::parse($rendezvous->date)->format('d/m/Y') }}</td>
            </tr>
            <tr>
                <td>Heure</td>
                <td>{{ \Carbon\Carbon::parse($rendezvous->heure)->format('H:i') }}</td>
            </tr>
            <tr>
                <td>Statut</td>
                <td>
                    @if($rendezvous->statut == 'en_attente')
                        <span class="statut">En attente</span>
                    @elseif($rendezvous->statut == 'confirme')
                        <span class="statut" style="background-color: #d1fae5; color: #065f46;">Confirmé</span>
                    @else
                        <span class="statut" style="background-color: #fee2e2; color: #991b1b;">Annulé</span>
                    @endif
                </td>
            </tr>
        </table>

        <div class="footer">
            <p>Clinique Vétérinaire — contact@vetclinic.com</p>
            <p>Merci de votre confiance !</p>
        </div>

    </div>
</body>
</html>