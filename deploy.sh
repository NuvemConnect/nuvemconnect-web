#!/usr/bin/expect

spawn yarn build
expect eof

cd dist/nuvemconnect-web/browser

spawn vercel
expect "Set up and deploy"
send "y\r"
expect "Which scope do you want to deploy to?"
send "\r"
expect "Link to existing project?"
send "y\r"
expect "What's your project's name?"
send "nuvemconnect\r"
expect eof
