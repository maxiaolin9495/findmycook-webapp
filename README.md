## Installation
Using Terminal

`git clone https://github.com/itsJS/findmycook-webapp.git`

## Run the Example

### Linux
If you are using linux system, we recommand you to use docker
Firstly you need to build the docker images in your local laptop

`docker-compose build`

Then you can start the whole project with:

`docker-compose up`


### Windows/MacOS
#### Create a new directory where your database will be stored (it's a good idea to separate data and business logic - the data directory should be on a different place than your app)
#### Start the database server
```
mongod --dbpath relative/path/to/database
OR if you have already set the path just run
mongod
```
#### Create all database schemes and import data to begin with
```
Open command shell in the root folder and run: 

Windows
mongorestore -d findmycook [your folder path]

MacOS
mongorestore -d findmycook [your folder path]
```

## Run Project

1) Start mongodb with
```
mongod
```

2) Go to backend folder in the project files and run
```
npm start
```

3) Go to frontend folder and run
```
npm start
```
## Demo
Search for "Munich" to see the different chefs.

Log in with: 
Email: test2@test.com
Password: 123 

Now, open the MyBookings tab from the Kebap menu and check it out
Or try submitting a review
Or try make a booking from the calendar

Now, register as a chef and log in. Open the Kebap menu and navigate to the MyCalendar tab.
Register the worktimes you desire to work in. Afterwards, search the city you registered with and select your profile. 
You will see, your worktime days turned green in the calendar.

### Code of Conduct

#### Git Workflow
Please use feature branches only to commit your code. 

After finishing your feature, create a pull request and add one reviewer.

The reviewer needs to make sure that the features committed are working without errors before approving.

The reviewer shall merge the feature branch into the develop branch once they approved the pull request.

The master branch is only used for production, i.e. a finished deliverable/ work product.

##### Here is our workflow:

![Image](git_workflow.png?raw=true)
Reference: Copyright 2019 Stephan Krusche, Bernd Bruegge - POM SS19 - 09 - Branch and Merge Management - Slide 7

#### Naming Branches
Name the branches according to the branch types:
- 👨‍🎨 **Feature**: `feature/xx-yy-zz` -- ease tracking of features. Example: `feature/add-free-slots`
- 🧙‍♀️**Bugfix**: `bugfix/xx-yy-zz` -- fixed bugs.
- 👶 **Minor**: `minor/xx-yy-zz` -- refactorings or something similar.

#### Commit messages
Write commit messages based on these [guidelines](https://chris.beams.io/posts/git-commit/) ❤
