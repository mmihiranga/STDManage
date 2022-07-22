import React, { useState ,useEffect,useRef,useCallback} from "react";
import { Alert,SafeAreaView, Modal, StyleSheet,StatusBar,Dimensions, TextInput ,Text, Pressable, View,Animated,TouchableHighlight } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SpinnerLoad from "../components/spinnerLoad";
import api from "../api";



const {width , height} = Dimensions.get("window")


const AddStudent = ({toggle,SetToggle}) => {
  const inputRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);


  const [firstName, SetfirstName] = React.useState("");
  const [lastName, SetlastName] = React.useState("");
  const [contactNumber, SetcontactNumber] = React.useState("");
  const [email, Setemail] = React.useState("");
  const [parentName, SetparentName] = React.useState("");
  const [parentContact, SetparentContact] = React.useState("");
  const [parentEmail, SetparentEmail] = React.useState("");


  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [SpinnerLoading,setSpinnerLoading] = useState(true);


  const onSubmit = () => {
    inputRef.current.value = "";
  };

  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmZiIsImV4cCI6MTY1ODQ4MDY3NiwiaWF0IjoxNjU4NDYyNjc2fQ.nGMaePI9LlkHhv024ehjo4ggsuw69FQRfJmdSQWxvh8rTbFgII8hJitedYFwfRWOD0I3FXd0pXuiRfZZ-ava_w'
  function StudentSubmit() {
     setSpinnerLoading(false);
    const student = {
      "firstName":firstName,
      "lastName":lastName,
      "contactNumber":contactNumber,
      "email":email,
      "parentName":parentName,
      "parentContact":parentContact,
      "parentEmail":parentEmail
    };

    api.post('/student/create', student,{
        headers: { Authorization: `Bearer ${token}`  }
    }).then(function (response) {
        setSpinnerLoading(true);
        SetToggle(!toggle);
        setModalVisible(!modalVisible);
        
    })
        .catch(function (error) {
            console.log(error);

        });
}

  return (
  
  <View style={styles.centeredViewMain}>

      <Modal
        statusBarTranslucent={true}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        animationIn='slideInUp'
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
        <View style={styles.modelViewBackground}>
          <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Student Details Form</Text>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {setModalVisible(!modalVisible)}} >
                    <Ionicons style={styles.ModalCloseIcon} name="ios-close"/>
                </Pressable>
              </View>
              {SpinnerLoading ?
              <View >
                <SafeAreaView>
                  <View >
                    <Text style={styles.InputLable}>First name</Text>
                    <TextInput style={styles.InputFeild} onChangeText={SetfirstName}    placeholder="firstname"  ref={inputRef}/>
                  </View>
                  <View >
                    <Text style={styles.InputLable}>Last name</Text>
                    <TextInput style={styles.InputFeild} onChangeText={SetlastName}   placeholder="lastname" />
                  </View>

                  <View >
                    <Text style={styles.InputLable}>Contact Number</Text>
                    <TextInput style={styles.InputFeild} onChangeText={SetcontactNumber}   placeholder="+94"  />
                  </View>

                  <View >
                    <Text style={styles.InputLable}>Email</Text>
                    <TextInput style={styles.InputFeild} onChangeText={Setemail}   placeholder="student email address" />
                  </View>

                  <View >
                    <Text style={styles.InputLable}>Parent Name</Text>
                    <TextInput style={styles.InputFeild} onChangeText={SetparentName}   placeholder="parent fullname"  />
                  </View>
                    
                  <View >
                    <Text style={styles.InputLable}>Parent Contact Number</Text>
                    <TextInput style={styles.InputFeild} onChangeText={SetparentContact}   placeholder="+94"  />
                  </View>

                  <View >
                    <Text style={styles.InputLable}>Parent Email</Text>
                    <TextInput style={styles.InputFeild} onChangeText={SetparentEmail}   placeholder="parent email address"  />
                  </View>
                  
                    
                   
                       

                </SafeAreaView>
                </View>:<SpinnerLoad/>}
                <Pressable
                    style={styles.SaveButton}
                    onPress={() => StudentSubmit()} >
                     <Ionicons style={styles.SaveIcon} name="ios-add-circle-outline" />
                     <Text style={styles.SaveBtnText}>SAVE STUDENT</Text>
                </Pressable>

                
          </View>
          </View>
        </View>
      </Modal>




      <TouchableHighlight underlayColor="transparent" onPress={() => setModalVisible(true)} style={styles.AddStudentBtn}>
            <View style={styles.AddStudentBtnContainer}>
                    <Ionicons style={styles.StudentAddIcon} name="ios-add-circle-outline" />
                    <Text style={styles.AddStudentBtnText}>Add Student</Text>
            </View>
     </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({

    AddStudentBtn:{
        width:230,
        alignSelf:"center",
        height:52,
        marginRight:20,
        marginTop:20,
        marginBottom:25

    },
    AddStudentBtnContainer:{
        width:220,
        height:52,
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
    modelViewBackground: {
    backgroundColor:"rgba(0,0,0,0.5)",
    width:width,
    height:height,
    
   
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 0,
   
  },
  modalView: {
    width:width,
    height:750,
    backgroundColor: "#FFFEFE",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position:"absolute",
    bottom:0,
    zIndex: 2,
  },
  button: {
    borderRadius: 8,
    elevation: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
    alignSelf:"flex-end",
    marginRight:25,
    marginBottom:14
  },
  ModalCloseIcon:{
    fontSize:25,
    color:"#555555",
  },
  modalHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:width,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "left",
    marginLeft:20,
    marginTop:25,
    fontFamily:"Raleway-SemiBold",
    fontSize:20
  },
  SaveButton:{
    width:230,
    alignSelf:"center",
    height:52,
    borderRadius:10,
    margin:8,
    backgroundColor:"#5956E9",
    borderColor:'#5956E9', 
    borderWidth:1,
    overflow: 'hidden',
    shadowColor: "black",
    shadowRadius: 10,
    flexDirection:"row",
    justifyContent:"center",
    alignItems: 'center',
    shadowOffset: {width : 0.5,height:0.5},
    shadowOpacity:0.7,
    elevation: 5,
    marginTop:12 
  },
  SaveIcon:{
    color:"#F6F6F9",
    fontSize:30,
  },
  SaveBtnText:{
    fontFamily: 'Raleway-Bold',
    fontWeight:"700",
    fontSize:15,
    textAlign: 'center',
    paddingLeft:6,
    color:"#F6F6F9",
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
  }
});

export default AddStudent;