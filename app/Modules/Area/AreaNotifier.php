<?php

namespace App\Modules\Area;

use App\Modules\Area\AreaMailer;
use App\Modules\Area\AreaModel;

use App\Models\User;

class AreaNotifier extends \App\Notifier\Notifier
{
    public function __construct(AreaMailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function comment(AreaModel $client, User $from, $comment)
    {
        $this->sendNew($client->user_id, $from->id, 'comment', $client->id);

        $to = $client->user;
        $comment = $comment;
        $link = route('client', ['id' => $client->id, 'slug' => $client->slug]);

        $this->mailer->commentMail($to, $from, $comment, $link);
    }

    public function favorite(AreaModel $client, User $from)
    {
        if ($client->user_id !== $from->id) {
            $this->sendNew($client->user_id, $from->id, 'like', $client->id);
        }

        $this->mailer->favoriteMail($client->user, $from, $client);
    }
}
