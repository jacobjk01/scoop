# off-campus-touring
A touring app.

## Technologies
This app is built with:
 - React Native
 - Firebase

## Folder structure
 - Screens/Pages/Shells should go in the in the `screens` folder
 - JSX that is smaller than `screens` should go in the `components` folder
 - `data.js` is for the dumb data. This will make is easier to transfer to a backend.


## Getting the App Running
Before doing these steps, make sure your environment is setup. Please follow the `react-native-cli` version of this tutorial: [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

### Installing application (one time unless you need switch branches)
 1. Clone the project.
 2. `cd off-campus-touring`
 3. `npm install`
 4. Assuming you want to run the iOS simulator, `cd ios && pod install && cd ../`

### Building and running the app (requires 2 terminals)
 6. `npx react-native start`
 7. In another terminal, `npx react-native run-ios`. 

## firebase keys
Please download and place the following keys from firebase:
 - /android/app/google-services.json
 - /ios/GoogleService-Info.plist

.gitignore will ignore these files when adding to a commit. (Will have to clean if these get pushed)


## Branch General Info
### Main Branches
```
Master - Staging - All feature branches
```
Master - stable version

Staging - could be called the develop branch, this is where you want do most of your branching to build new features. Once you finish the feature, you can merge it back into the develop branch (using the pull request on github) and then you should delete your feature branch (on github). [Why?](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/deleting-and-restoring-branches-in-a-pull-request)

## Firebase connection:
In order for easy integration with react-native, we are using [rnfirebase library](https://rnfirebase.io/firestore/usage). 

## Learn about Async Storage (will implement this in future)
[https://react-native-async-storage.github.io/async-storage/docs/install/](https://react-native-async-storage.github.io/async-storage/docs/install/)

#Demo

https://user-images.githubusercontent.com/87722413/171745786-eabe3890-dcbc-4094-8831-1fee2537fe09.mp4
