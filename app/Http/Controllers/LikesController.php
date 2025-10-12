<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LikesController extends Controller
{
  public function likePost(Request $request, $id)
  {
    try {
      $user = auth()->user();

      $existingLike = Like::where('user_id', $user->id)
        ->where('post_id', $id)
        ->first();

      if ($existingLike) {
        $existingLike->delete();
        $likeCount = Like::where('post_id', $id)->count();

        return response()->json([
          'message' => 'Post unliked successfully',
          'liked' => false,
          'likes_count' => $likeCount,
        ]);
      } else {
        Like::create([
          'user_id' => $user->id,
          'post_id' => $id,
        ]);

        $likeCount = Like::where('post_id', $id)->count();

        return response()->json([
          'message' => 'Post liked successfully',
          'liked' => true,
          'likes_count' => $likeCount,
        ]);
      }
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
}
