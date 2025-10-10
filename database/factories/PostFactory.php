<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   * 
   */

  protected $model = Post::class;

  public function definition(): array
  {
    return [
      'title' => fake()->sentence(),
      'content' => fake()->paragraph(5),

      'user_id' => fake()->numberBetween(1, 10), // assuming you have users
    ];
  }
}
