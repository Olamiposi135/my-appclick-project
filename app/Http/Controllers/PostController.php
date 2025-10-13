<?php

namespace App\Http\Controllers;

use App\Http\Resources\SinglePostResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
  // create new post 

  public function addNewPost(Request $request)
  {

    $fields = Validator::make($request->all(), [
      'title' => 'required|string|max:255',
      'content' => 'required|string',

    ]);

    if ($fields->fails()) {
      return response()->json(['errors' => $fields->errors()], 403);
    }

    try {

      $post = new Post();
      $post->title = $request->title;
      $post->content = $request->content;
      $post->user_id = auth()->user()->id;
      $post->save();

      $post = Post::with('user:id,username,first_name,last_name')->find($post->id);


      return response()->json([
        'message' => 'Post created successfully',
        'post' => $post
      ], 201); // 201 created
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 403);
    }
  }

  public function editPost($post_id)
  {
    $post = Post::find($post_id);

    if (!$post) {
      return response()->json([
        'error' => 'Post not found'
      ]);
    }

    if ($post->user_id !== auth()->id()) {
      return response()->json(['error' => 'Unauthorized'], 403);
    }
    return response()->json(['post' => $post], 200);
  }


  //update post

  public function updatePost(Request $request, $id)
  {


    try {
      $post = Post::find($id);

      if (!$post) {
        return response()->json(['error' => 'Post not found'], 404);
      }

      $fields = Validator::make($request->all(), [
        'title' => 'required|string|max:255',
        'content' => 'required|string',
      ]);

      if ($fields->fails()) {
        return response()->json(['errors' => $fields->errors()], 422);
      }

      // Ensure the post belongs to the authenticated user
      if ($post->user_id !== auth()->id()) {
        return response()->json(['error' => 'Unauthorized'], 403);
      }

      $post->update([
        'title' => $request->title,
        'content' => $request->content,
      ]);

      return response()->json([
        'message' => 'Post updated successfully',
        'post' => $post->fresh(),
      ], 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }



  // fetch one user posts 

  public function getUserPosts($id)
  {
    try {
      $user = User::find($id);

      if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
      }

      // load user posts
      $posts = Post::with([
        'user:id,username,first_name,last_name',
        'comments.user:id,username',
        'likes'
      ])
        ->where('user_id', $user->id)
        ->latest()
        ->paginate(20);

      return response()->json([
        'user' => $user->only(['id', 'username', 'email']),
        'posts' => $posts
      ], 200);
    } catch (\Exception $e) {
      return response()->json([
        'error' => $e->getMessage()
      ], 500);
    }
  }




  //Fetch all posts 
  public function getAllPosts()
  {
    try {
      $posts = Post::with([
        'user:id,username,first_name,last_name',
        'comments.user:id,username',
        'likes',
      ])->latest()->paginate(30);

      return response()->json([
        'posts' => $posts
      ], 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 403);
    }
  }


  // fetch single post with id 


  public function getPost($post_id)
  {
    try {
      $post = Post::with('user', 'comments.user', 'likes')->find($post_id);
      if (!$post) {
        return response()->json(['error' => 'Post not found'], 404);
      }
      // Return single post from resource
      return response()->json([
        'post' => new SinglePostResource($post)
      ], 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 403);
    }
  }


  // delete post 
  public function deletePost(Post $post)
  {
    try {



      // Ensure the post belongs to the authenticated user
      if ($post->user_id !== auth()->id()) {
        return response()->json(['error' => 'Unauthorized'], 403);
      }

      if (!$post) {
        return response()->json(['error' => 'Post not found'], 404);
      }


      $post->delete();
      return response()->json([
        'message' => 'Post deleted successfully'
      ], 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 403);
    }
  }
}
