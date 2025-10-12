<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{

  public function postComment(Request $request, $post_id)
  {

    $fields = Validator::make($request->all(), [

      'content' => 'required|string',

    ]);

    if ($fields->fails()) {
      return response()->json(['errors' => $fields->errors()], 403);
    }

    try {

      $comment = new Comment();
      $comment->post_id = $post_id;
      $comment->comment = $request->content;
      $comment->user_id = auth()->user()->id;
      $comment->save();

      // return the user that commented to frontend
      $comment->load('user:id,username');

      return response()->json([
        'message' => 'Comment created successfully',
        'comment' => $comment
      ], 201); // 201 created
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 403);
    }
  }
}
