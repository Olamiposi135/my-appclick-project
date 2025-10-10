<?php

namespace App\Http\Resources;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SinglePostResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'post_title' => $this->title,
      'post_content' => $this->content,

      'author_id' => $this->user_id,
      'published_at' => $this->created_at,
      'latest_update' => $this->updated_at,

      'author' => $this->user,

      'comment_count' => Comment::where('post_id', $this->id)->count(),

      'comments' => $this->comments->map(function ($comment) {
        return [
          'id' => $comment->id,
          'comment' => $comment->comment,
          'author' => $comment->user ? [
            'id' => $comment->user->id,
            'name' => $comment->user->name,
          ] : null,
          'published_at' => $comment->created_at,
        ];
      })->toArray(),




      'likes_count' => $this->likes_count ?? $this->likes->count(),
    ];
  }
}
