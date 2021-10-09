const firstOpenState = {
    firstTimeOpen: true,
    userType: 'new',
    hasSelectedSchool: false,
    currentMode: 'new'
}

/**
 * Do not modify above (but you can add test states), these are custom states to describe cases of the user, such as first * time opening the app
 * Use these for testing purposes
 * 
 * Example:
 *  export const localState = {
 *      ...firstOpenState
 * }
 */

const intialMode = 'guide'; // visitor | guide | new | dev | prod

// userType: guide | visitor | new (default is new)
const testingState = {
    firstTimeOpen: true,
    userType: intialMode, 
    hasSelectedSchool: false,
    currentMode: intialMode //if guide you can be in visitor or guide mode
}


// NOTE: MODE should be equal to prod when published

//this stores all settings that would not be saved on the database such as dark mode, light mode
//  or at least is easy to save locally
//if you are familar with localstorage for web, this is the same concept
// eventually this would be moved to reactnative localstorage (look at readme.md)
export const localState = {
    ...testingState
}


