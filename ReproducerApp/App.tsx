/**
 * @format
 */

import { ImageBackground, StyleSheet, Text, View } from 'react-native';

const image = { uri: 'https://reactnative.dev/img/tiny_logo.png' };

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>aria-hidden on ImageBackground</Text>
      <Text>Text outside any hidden view</Text>
      <View aria-hidden style={styles.box}>
        <Text>Child of View with aria-hidden</Text>
      </View>
      <ImageBackground aria-hidden source={image} style={styles.box}>
        <Text>Child of ImageBackground with aria-hidden</Text>
      </ImageBackground>
      <ImageBackground
        importantForAccessibility="no-hide-descendants"
        source={image}
        style={styles.box}
      >
        <Text>Child of ImageBackground with no-hide-descendants</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: '#dddddd',
    height: 64,
    justifyContent: 'center',
    padding: 8,
  },
});

export default App;
