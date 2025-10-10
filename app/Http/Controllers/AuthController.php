<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

  //register user 
  public function register(Request $request)
  {
    $fields = Validator::make($request->all(), [
      'first_name' => 'required|string',
      'last_name' => 'required|string',
      'email' => 'required|string|email|unique:users',
      'phone_number' => 'required|string',
      'username' => 'required|string|unique:users',
      'password' => 'required|string|confirmed|min:6',

    ]);

    if ($fields->fails()) {
      return response()->json(['errors' => $fields->errors()], 403);
    }

    try {

      $user = User::create([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'phone_number' => $request->phone_number,
        'username' => $request->username,
        'password' => Hash::make($request->password)
      ]);

      $token = $user->createToken('auth_token')->plainTextToken;

      return response()->json([
        'user' => $user,
        'access_token' => $token,
        'token_type' => 'Bearer'
      ], 201);
    } catch (\Exeception $e) {
      return response()->json(['message' => 'Registration failed', 'error' => $e->getMessage()], 403);
    }


    // Create user
  }

  // Login user 
  public function login(Request $request)
  {

    $incomingField = Validator::make($request->all(), [
      'login' => 'required|string',
      'password' => 'required|string',
    ]);

    if ($incomingField->fails()) {
      return response()->json(['errors' => $incomingField->errors()], 422);
    }

    $login = $request->input('login');
    $password = $request->input('password');

    // Find out if login is email or username
    $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

    try {
      //  Attempt and verify login details 
      if (!Auth::attempt([$fieldType => $login, 'password' => $password])) {
        return response()->json(['message' => 'Invalid credentials'], 401);
      }

      $user = User::where($fieldType, $login)->first();

      $token = $user->createToken('auth_token')->plainTextToken;

      return response()->json([
        'message' => 'Login successful',
        'access_token' => $token,
        'token_type' => 'Bearer',
        'user' => $user
      ], 200);
    } catch (\Exception $e) {
      return response()->json(['message' => 'Login failed', 'error' => $e->getMessage()], 500);
    }
  }


  // Logout User 

  public function logout(Request $request)
  {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out successfully']);
  }


  //Forgot and reset password functions

  public function forgotPassword(Request $request)
  {
    $request->validate(['email' => 'required|email']);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
      return response()->json(['message' => 'We cannot find a user with that email address.'], 404);
    }

    // Delete any existing tokens for this user
    DB::table('password_reset_tokens')->where('email', $request->email)->delete();

    // Create a new token
    $token = Str::random(60);
    DB::table('password_reset_tokens')->insert([
      'email' => $request->email,
      'token' => Hash::make($token), // Hash the token for storage
      'created_at' => now()
    ]);

    // Send email
    Mail::send('emails.password-reset', ['token' => $token, 'email' => $request->email], function (Message $message) use ($request) {
      $message->to($request->email);
      $message->subject('Reset Your Password');
    });

    return response()->json(['message' => 'Password reset link sent to your email.']);
  }

  public function resetPassword(Request $request)
  {
    $request->validate([
      'email' => 'required|email',
      'token' => 'required',
      'password' => 'required|string|confirmed|min:6',
    ]);

    $passwordReset = DB::table('password_reset_tokens')
      ->where('email', $request->email)
      ->first();

    if (!$passwordReset || !Hash::check($request->token, $passwordReset->token)) {
      return response()->json(['message' => 'This password reset token is invalid or has expired.'], 400);
    }

    $user = User::where('email', $request->email)->first();

    if (!$user) {
      return response()->json(['message' => 'We cannot find a user with that email address.'], 404);
    }

    $user->password = Hash::make($request->password);
    $user->save();

    DB::table('password_reset_tokens')->where('email', $request->email)->delete();

    return response()->json(['message' => 'Password has been reset successfully.']);
  }
}
