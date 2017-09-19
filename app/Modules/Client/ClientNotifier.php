<?php

namespace App\Modules\Client;

use App\Modules\Client\ClientMailer;
use App\Modules\Client\ClientModel;

use App\Models\User;

class ClientNotifier extends \App\Notifier\Notifier
{
    public function __construct(ClientMailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function comment(ClientModel $client, User $from, $comment)
    {
        $this->sendNew($client->user_id, $from->id, 'comment', $client->id);

        $to = $client->user;
        $comment = $comment;
        $link = route('client', ['id' => $client->id, 'slug' => $client->slug]);

        $this->mailer->commentMail($to, $from, $comment, $link);
    }

    public function favorite(ClientModel $client, User $from)
    {
        if ($client->user_id !== $from->id) {
            $this->sendNew($client->user_id, $from->id, 'like', $client->id);
        }

        $this->mailer->favoriteMail($client->user, $from, $client);
    }
}
