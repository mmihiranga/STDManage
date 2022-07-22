import React from 'react';
import { View,Text } from 'react-native';
import { Button } from 'react-native-paper';
import StudentList  from '../screen/StudentList';
function Home({ navigation }) {
  return (
    <View> 
        {/* <Text>Open up App.js to start working on your app!</Text>
        <Button mode='contained' color='red' style={{width: 200, height: 50, }} onPress={() => console.log('Pressed')}>
    Press me
  </Button> */}
    <StudentList/>
    </View>
  )
}

export default Home