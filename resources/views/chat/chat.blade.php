<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="{{  asset('css/app.css') }}">
    <style>
        .list-group{
            height: 300px;
            background-color: #193754;
            overflow-y: scroll;
        }
    </style>
</head>
<body>
<div class="flex-center position-ref full-height">
    <div class="content" id="app">
        <div class="row">
            <div class="offset-4 col-md-4 offset-sm-3 col-sm-6">
                <ul class="list-group" v-chat-scroll>
                    <li class="list-group-item active">Chat Room <span class="badge badge-success badge-pill">@{{ countOfUsers }}</span> <span class="float-right"><button class="btn btn-danger btn-sm" @click.prevent="DeleteSessionMessage">Delete All</button></span></li>
                    <span  class="badge float-left badge-success">@{{ typing }}</span>
                   <message
                       v-for="(value,index) in chat.messages"
                       :color="chat.color[index]"
                       :float="chat.float[index]"
                       :user="chat.user[index]"
                       :time="chat.time[index]"
                   >@{{ value }}
                   </message>
                </ul>
                <input type="text" v-model="message" @keyup.enter="send" class="form-control" placeholder="Type your message here...">
            </div>

        </div>
    </div>
</div>
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
