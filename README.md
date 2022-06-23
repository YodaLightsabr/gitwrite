# GitWrite
Write something on your contribution graph!

## What is GitWrite?
GitWrite is a little tool I developed that lets you add a short message to a year on your contribution graph. GitHub lets you spoof commit dates, and while there are already tools out there to fake your graph, none of them let you write text.

## How do I use GitWrite?
Install the global CLI!
```sh
npm install -g gitwrite-cli
```
From there, run the `gitwrite` command in a new repository. Once you have a new repository, run `gitwrite <year> "<message>" <username>`. The message must be in quotes. The username should be your GitHub profile's username, and if not provided, GitWrite will get a username from your Git global config. GitWrite will ask you for confirmation, and then make however many commits you need to add the text to your graph. If you ever want to remove it, just delete the GitHub repo.
