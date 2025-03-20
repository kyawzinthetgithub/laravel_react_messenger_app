<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'message',
        'sender_id',
        'gorup_id',
        'receiver_id',
        'conversation_id',
    ];
}
