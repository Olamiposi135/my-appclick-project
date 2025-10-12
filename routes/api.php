<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
  return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::get('/all/posts', [PostController::class, 'getAllPosts']);
Route::get('/single/post/{post_id}', [PostController::class, 'getPost']);


//middleware function

Route::middleware('auth:sanctum')->group(function () {
  Route::post('/logout', [AuthController::class, 'logout']);

  Route::post('/add/post', [PostController::class, 'addNewPost']);

  Route::put('/edit/post/{id}', [PostController::class, 'updatePost']);

  Route::get('/edit/post/{post_id}', [PostController::class, 'editPost']);


  Route::get('/user/{id}/posts', [PostController::class, 'getUserPosts']);

  Route::delete('/delete/post/{post}', [PostController::class, 'deletePost']);

  //comment route
  Route::post('/post/{post_id}/comment', [CommentController::class, 'postComment']);


  Route::post('post/{id}/like', [LikesController::class, 'likePost']);
});
