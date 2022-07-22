import React, { useState ,useEffect,useRef,useCallback} from "react";
import { Alert,SafeAreaView, Modal, StyleSheet,StatusBar,Dimensions, TextInput ,Text, Pressable, View,Animated,TouchableHighlight } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SpinnerLoad from "../components/spinnerLoad";
import api from "../api";

const {width , height} = Dimensions.get("window")

function SignUp({navigation}) {

    const [username, Setusername] = useState("");
    const [password, Setpassword] = useState("");

    const SignUpSubmit=() =>{
        const user = {
            "username":username,
            "password":password,
        };
        api.post('/register', user).then(function (response) {
            navigation.navigate('Login');
        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <View>    
            <View style={styles.centeredView}>
                    <SafeAreaView >
                      <View >
                        <Text style={styles.InputLable}>Username</Text>
                        <TextInput style={styles.InputFeild} onChangeText={Setusername}    placeholder="username"  />
                      </View>
                      <View >
                        <Text style={styles.InputLable}>Last name</Text>
                        <TextInput style={styles.InputFeild} onChangeText={Setpassword}   placeholder="password" />
                      </View>
                    </SafeAreaView>
                    </View>
                    <TouchableHighlight underlayColor="transparent" onPress={() => SignUpSubmit()} style={styles.AddStudentBtn}>
                <View style={styles.AddStudentBtnContainer}>
                        <Text style={styles.AddStudentBtnText}>SignUp</Text>
                </View>
         </TouchableHighlight>
                   
         <Text style={styles.signUpText} onPress={() => navigation.navigate('Login')} >Go Back Login</Text>
               
               </View>
             )
           }
           
           const styles = StyleSheet.create({
               signUpText:{
                   fontFamily: 'Raleway-Bold',
                   fontWeight:"700",
                   fontSize:15,
                   textAlign: 'center',
                   paddingLeft:6,
                   color:"#3C26E3",
               },
        centeredView: {
            justifyContent: "center",
            flexDirection:'column',
            margin: 20,
            marginVertical:height/10,
            alignItems:'center',
           
          },
        InputFeild:{
            height: 45,
            width:width-60,
            marginHorizontal: 12,
            borderWidth: 1,
            borderRadius:8,
            borderColor:"#E8E8E8",
            padding: 10,
            backgroundColor:"#F6F6F6",
            marginVertical:5,
            textAlignVertical: 'top',
            color:"#3C3B3B",
            fontSize:16,
            fontFamily:"Raleway-Meadium",
          },
          InputLable:{
            marginLeft: 12,
            marginTop:0,
            color:"#555555",
            fontSize:17,
            fontFamily:"Raleway-Meadium",
          },
          AddStudentBtnContainer:{
            width:180,
            height:52,
            alignSelf:"center",
            borderRadius:10,
            margin:8,
            backgroundColor:"#FFFFFF",
            borderColor:'#FFFFFF', 
            borderWidth:1,
            overflow: 'hidden',
            shadowColor: "black",
            shadowRadius: 10,
            flexDirection:"row",
            justifyContent:"center",
            alignItems: 'center',
            shadowOffset: {width : 0.5,height:0.5},
            shadowOpacity:0.5,
            elevation: 5,
        },
        AddStudentBtnText:{
            color:"#F6F6F9",
            fontFamily: 'Raleway-Bold',
            fontWeight:"700",
            fontSize:15,
            textAlign: 'center',
            paddingLeft:6,
            color:"#343333",
            },
        StudentAddIcon:{
           fontSize:33,
           color:"#343333",
        },
     
    });

export default SignUp