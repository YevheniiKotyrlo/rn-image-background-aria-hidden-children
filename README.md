# `aria-hidden` on `ImageBackground` hides its image but not its children

`ReproducerApp/App.tsx` renders a child text in a `View` with `aria-hidden`, in an `ImageBackground` with
`aria-hidden`, and in an `ImageBackground` with `importantForAccessibility="no-hide-descendants"`, under a text outside
any hidden view.

React Native 0.89.0-nightly-20261102-47a9917ac, release build, Galaxy S23 (Android 14):

```sh
cd ReproducerApp
yarn install
cd android && ./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a && cd ..
adb install -r android/app/build/outputs/apk/release/app-release.apk
adb shell am start -W -n com.reproducerapp/.MainActivity
adb shell uiautomator dump --compressed /sdcard/tree.xml && adb pull /sdcard/tree.xml
```

`--compressed` keeps only the views that are important for accessibility. On iOS, the tree is the one XCUITest reads,
with this `App.tsx` as RNTester's root component, built in Release from React Native's `main` at `9c3e743a6f`, on an
iPad Pro (12.9-inch, 4th generation) on iPadOS 27.2.

| Text | Expected on both | Android, seen | iOS, seen |
| --- | --- | --- | --- |
| Text outside any hidden view | in the tree | in | in |
| Child of View with aria-hidden | out | out | out |
| Child of ImageBackground with aria-hidden | out | **in** | **in** |
| Child of ImageBackground with no-hide-descendants | out on Android, in on iOS (an Android-only prop) | out | in |
