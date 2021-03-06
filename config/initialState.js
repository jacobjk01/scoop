
const firstTimeLoggingInState = {
    userType: 'new', 
    guideDone: false,
    visitorDone: false,
    visitorBone: false,
    currentMode: 'new'
}

const devState = {
    userType: 'dev', 
    guideDone: false,
    visitorDone: false,
    visitorBone: false,
    currentMode: 'dev'
}

/**
 * ^^^^ Don't modify above ^^^^ but you can create your own test states
 */
const intialMode = 'new'; // visitor | guide | new | dev | prod

// userType: guide | visitor | new (default is new)
const testingState = {
    userType: intialMode, 
    guideDone: false,
    visitorDone: false,
    visitorBone: false,
    currentMode: intialMode
}
//guideDone - the guide has finished onboarding
//visitorDone - the visitor has finished onboarding
//visitorBone- the visitor has completed at least the bare minimum to browse which is currently just selecting a school

// NOTE: MODE should be equal to prod when published

//this stores all settings that would not be saved on the database such as dark mode, light mode
//  or at least is easy to save locally
//if you are familar with localstorage for web, this is the same concept
// eventually this would be moved to reactnative localstorage (look at readme.md)
export const localState = {
    ...firstTimeLoggingInState
}


export const SCHOOL = "UCLA"

export const FAKE_REVIEWS = [
  {
    stars: 4.8,
    year: 'Incoming Freshman',
    comment:
      'Brittany was really helpful!! She showed me where the students get groceries from and hangout in Westwood. She also shared a lot of interesting stories as we visit each places, highly recommend incoming freshman who want to familiarize themselves with the area sign up!! ',
  },
  {
    stars: 4.3,
    year: 'Incoming Junior',
    comment:
      'Being a sophomore, I kinda know what Westwood is like already; however, Brittany was able to show me interesting places I’ve never discovered!',
  },
]