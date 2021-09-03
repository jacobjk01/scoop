# off-campus-touring
A touring app.

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

Note: If you are on the `staging` branch or have any backend code (firebase packages), please ask Jonathan for the firebase keys.
