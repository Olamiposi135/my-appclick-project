<?php

namespace App\Http\Controllers;

use App\Mail\PasswordResetMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
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

    // Send email using the mailable class in Mail folder
    Mail::to($request->email)->send(new PasswordResetMail($token, $request->email));

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

  /**
   * Change the password for the authenticated user. when user is logged in
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function changePassword(Request $request)
  {
    $request->validate([
      'currentPassword' => ['required', 'string'],
      'newPassword' => [
        'required',
        'string',
        'min:8',
        'confirmed',
        'different:currentPassword'
      ],
    ], [
      // current password
      'currentPassword.required' => 'Enter your current password.',

      // new password rules
      'newPassword.required' => 'Enter a new password.',
      'newPassword.min' => 'Your new password must be at least 8 characters.',
      'newPassword.confirmed' => 'Your new passwords do not match.',
      'newPassword.different' => 'Your new password must be different from your current password.',
    ]);

    $user = Auth::user();

    if (!Hash::check($request->currentPassword, $user->password)) {
      return response()->json([
        'message' => 'Your current password is incorrect.',
      ], 422);
    }

    $user->password = Hash::make($request->newPassword);
    $user->save();

    return response()->json([
      'message' => 'Password changed successfully!',
    ]);
  }


  // Edit profile details by auth user 

  public function updateProfile(Request $request)
  {
    // ensure user is authenticated
    $user = Auth::user();
    if (! $user) {
      return response()->json([
        'message' => 'Unauthenticated.',
      ], 401);
    }

    // validation rules + custom messages
    $validator = Validator::make($request->all(), [
      'first_name'   => 'sometimes|string|max:50',
      'last_name'    => 'sometimes|string|max:50',
      'email'        => 'sometimes|email|max:100|unique:users,email,' . $user->id,
      'phone_number' => 'sometimes|string|max:20',
    ], [
      'first_name.string'   => 'First name must be text.',
      'first_name.max'      => 'First name may not be greater than 50 characters.',
      'last_name.string'    => 'Last name must be text.',
      'last_name.max'       => 'Last name may not be greater than 50 characters.',
      'email.email'         => 'Provide a valid email address.',
      'email.unique'        => 'This email is already in use.',
      'email.max'           => 'Email may not be greater than 100 characters.',
      'phone_number.string' => 'Phone number must be text.',
      'phone_number.max'    => 'Phone number may not be greater than 20 characters.',
    ]);

    // return validation errors (422 Unprocessable Entity)
    if ($validator->fails()) {
      return response()->json([
        'message' => 'Validation failed.',
        'errors'  => $validator->errors(), // object of field => [messages]
      ], 422);
    }

    $validated = $validator->validated();

    try {
      // make sure User model has the fillable properties defined
      $user->fill($validated);
      $user->save();

      return response()->json([
        'message' => 'Profile updated successfully.',
        'user'    => $user->fresh(), // Corrected: use fresh() to get updated model from DB
      ], 200);
    } catch (\Throwable $e) {
      // log internal error for debugging (do not expose stack trace to clients)
      Log::error('Profile update failed for user_id=' . $user->id . ' error=' . $e->getMessage());

      return response()->json([
        'message' => 'Failed to update profile. Please try again later.',
        'errors'  => ['server' => ['An internal error occurred.']],
      ], 500);
    }
  }
}
