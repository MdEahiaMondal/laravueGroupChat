<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth');
    }


    public function index()
    {
        return view('chat.chat');
    }


    public function send(Request $request)
    {
        $user = Auth::user();
        $message = $request->message;
        $this->saveToSession($request);
        event(new ChatEvent($message, $user));
    }

    public function saveToSession(Request $request)
    {
        session()->put('chat', $request->chat);
    }

    public function getOldMessage()
    {
        return session('chat');
    }
    public function deleteSession()
    {
        session()->forget('chat');
    }

}
