<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\App;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $senderId = $this->faker->randomElement([0, 1]);

        if ($senderId === 0) {
            $senderId = $this->faker->randomElement(\App\Models\User::where('id', '!=', 1)->pluck('id')->toArray());
            $receiverId = 1;
        } else {
            $receiverId = $this->faker->randomElement(\App\Models\User::pluck('id')->toArray());
        }

        $grupId = null;

        if ($this->faker->boolean(50)) {
            $grupId = $this->faker->randomElement(\App\Models\Group::pluck('id')->toArray());
            $group = \App\Models\Group::find($grupId);
            $senderId = $this->faker->randomElement($group->users->pluck('id')->toArray());
            $receiverId = null;
        }

        return [
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
            'group_id' => $grupId,
            'message' => $this->faker->text(300),
        ];
    }
}
