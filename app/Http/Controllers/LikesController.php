<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LikesController extends Controller
{
  public function likePost(Request $request)
  {

    $fields = Validator::make($request->all(), [
      'post_id' => 'required|integer',
    ]);

    if ($fields->fails()) {
      return response()->json(['errors' => $fields->errors()], 403);
    }

    try {

      //check if user already liked the post
      $likeCheck = Like::where('user_id', auth()->user()->id)
        ->where('post_id', $request->post_id)
        ->first();

      if ($likeCheck) {
        return response()->json(['message' => 'You have already liked this post'], 403);
      } else {

        $post = new Like();
        $post->post_id = $request->post_id;

        $post->user_id = auth()->user()->id;
        $post->save();

        return response()->json([
          'message' => 'Post liked successfully',

        ], 201);
      }
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 403);
    }
  }
}
