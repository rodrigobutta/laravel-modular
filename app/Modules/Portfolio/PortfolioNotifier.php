<?php

namespace App\Modules\Portfolio;

use App\Modules\Portfolio\PortfolioMailer;
use App\Modules\Portfolio\PortfolioModel;

use App\Models\User;

class PortfolioNotifier extends \App\Notifier\Notifier
{
    public function __construct(PortfolioMailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function comment(PortfolioModel $client, User $from, $comment)
    {
        $this->sendNew($client->user_id, $from->id, 'comment', $client->id);

        $to = $client->user;
        $comment = $comment;
        $link = route('client', ['id' => $client->id, 'slug' => $client->slug]);

        $this->mailer->commentMail($to, $from, $comment, $link);
    }

    public function favorite(PortfolioModel $client, User $from)
    {
        if ($client->user_id !== $from->id) {
            $this->sendNew($client->user_id, $from->id, 'like', $client->id);
        }

        $this->mailer->favoriteMail($client->user, $from, $client);
    }
}
