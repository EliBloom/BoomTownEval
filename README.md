# GIT API UI

This is an app that has a single text input for receiving a url to a github repo

## Available Scripts

### `npm install`

### `npm start`

### `npm test`

## Running App

Simply run `npm install` followed by `npm start`. This will
run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.
You may also see any lint errors in the console.

## TODOs/Problems

The individual fields on the Json objecty were not being rendered due to promise shenanigans. Was dynamically creating the
lists so I was having to do fetch calls in a loop. I ran out of time before I could figure it out so I decided to just document it. I
think that I could maybe have just manually extracted the data with separate fetchs for each primary level url's, or done something with
useEffect.

I was also running into authorization issues with the request cap of around 60 requests, so authorization would be a great benefit
