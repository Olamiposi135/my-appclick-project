<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{

  public function postComment(Request $request)
  {

    $fields = Validator::make($request->all(), [
      'post_id' => 'required|integer',
      'comment' => 'required|string',

    ]);

    if ($fields->fails()) {
      return response()->json(['errors' => $fields->errors()], 403);
    }

    try {

      $post = new Comment();
      $post->post_id = $request->post_id;
      $post->comment = $request->comment;
      $post->user_id = auth()->user()->id;
      $post->save();

      return response()->json([
        'message' => 'Comment created successfully',
        'comment' => $post->comment
      ], 201); // 201 created
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 403);
    }
  }
}
