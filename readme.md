TODO: [https://rnfirebase.io/messaging/usage/ios-setup](Ios setup)

## Android notifee

TODO: [https://notifee.app/react-native/docs/android/styles](Big badge)

TODO: [https://notifee.app/react-native/reference/androidbigpicturestyle](Android big picture style)
[https://notifee.app/react-native/docs/android/behaviour](Android custom sound)


## iOS notifee

[https://notifee.app/react-native/docs/ios/behaviour#sound](Critical notification and custom ringtone)
TODO: [https://notifee.app/react-native/docs/ios/interaction#press-action](Press action)

import {Linking} from 'react-native'
Linking.openURL(`tel:${phoneNumber}`)


CAVEAT: [https://rnfirebase.io/messaging/usage](FCM messages can be sent to real Android/iOS devices and Android emulators (iOS simulators however do not handle cloud messages) via a number of methods (see below))