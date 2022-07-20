
### RESOURCES

[Adding custom native code to expo](https://docs.expo.dev/workflow/customizing/)
[React native firebase](https://rnfirebase.io/)
REFERENCE: [Notifee iOS Press action](https://notifee.app/react-native/docs/ios/interaction#press-action)
REFERENCE: [Notifee iOS setup](https://notifee.app/react-native/docs/ios/interaction#press-action)




## Android notifee

REFERENCE: [Notifee android Big badge](https://notifee.app/react-native/docs/android/styles)

REFERENCE:
 [Android big picture style](https://notifee.app/react-native/reference/androidbigpicturestyle)
[Android custom sound](https://notifee.app/react-native/docs/android/behaviour)


## iOS notifee

[Critical notification and custom ringtone](https://notifee.app/react-native/docs/ios/behaviour#sound)
REFERENCE: [Press action](https://notifee.app/react-native/docs/ios/interaction#press-action)


import {Linking} from 'react-native'
Linking.openURL(`tel:${phoneNumber}`)

###  CAVEAT: 
[FCM messages can be sent to real Android/iOS devices and Android emulators (iOS simulators however do not handle cloud messages) via a number of methods (see below)](https://rnfirebase.io/messaging/usage)


### GET STARTED:

run `yarn install`
run `yarn run android` for android
run `yarn run ios` for ios


### FEATURES:
    - Retrieve users contacts with Expo Contacts
    - Quick Call Me from any contact amongst the user’s contacts using React Native Quick Action for the quick dial feature.
      - add quick action from any contact
      - sync info with local storage
      - clear all quick actions
    - Persists and track quick actions contacts with async storage.
    - Crashlytics to log errors
    - React errorboundary and Errorboundary component
    - Remote push notification feature
    - Remote push notification feature
    - Handled states
      - loading
      - success
      - error
      - push notification permission denied
    - miniature theme implementation
      -  light and dark mode (dark mode was not implemented)
      -  typography, colors, spacing, and layout 
    - local push notification feature with a push notification button using notifee
      - Android: 
        -  Notifee custom sound for push notification
        -  Notifee large image banner from <https://picsum.com>
        -  reject and accept notification buttons that work in background and foreground app mode.
      - ios:
        -  Notifee quick action - accept and reject buttons that work in background and foreground app mode
        -  ios wave notification sound
        -  ios critical notification mode.
     - accessibility label for quick actions contacts add button.
     - Open the app when app notification buttons are pressed via `Linking`
     - Configured test environment
     - Mock external and native modules.
     - Simple but limited testing...
     - Working branch and git history is on `develop` branch