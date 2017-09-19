<?php

namespace App\Modules\Job;

use App\Modules\Job\JobMailer;
use App\Modules\Job\JobModel;

use App\Models\User;

class JobNotifier extends \App\Notifier\Notifier
{
    public function __construct(JobMailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function comment(JobModel $client, User $from, $comment)
    {
        $this->sendNew($client->user_id, $from->id, 'comment', $client->id);

        $to = $client->user;
        $comment = $comment;
        $link = route('client', ['id' => $client->id, 'slug' => $client->slug]);

        $this->mailer->commentMail($to, $from, $comment, $link);
    }

    public function favorite(JobModel $client, User $from)
    {
        if ($client->user_id !== $from->id) {
            $this->sendNew($client->user_id, $from->id, 'like', $client->id);
        }

        $this->mailer->favoriteMail($client->user, $from, $client);
    }
}
