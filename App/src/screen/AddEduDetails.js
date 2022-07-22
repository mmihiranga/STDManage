import React, { useState ,useEffect,useReducer } from "react";
import { Alert,SafeAreaView, Modal, StyleSheet,StatusBar,Dimensions, TextInput ,Text, Pressable, View,Animated,TouchableHighlight } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SpinnerLoad from "../components/spinnerLoad";
import api from "../api";
import EduDetailsList from "./EduDetailsList";


const {width , height} = Dimensions.get("window")

const initialState = {
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    parentName: "",
    parentContact: "",
    parentEmail: ""
    };


const reducer = (state, action) => {
    switch (action.type) {
      case "FIRSTNAME":
        return { firstName: state.firstName };
      case "LASTNAME":
        return { lastName: state.lastName };
      default:
        return state;
    }
  };

const AddEduDetails = ({toggle,setToggle,stdID}) => {
const [state, dispatch] = useReducer(reducer, initialState);
  const [modalVisible, setModalVisible] = useState(false);

  const [qualification, Setqualification] = React.useState("");
  const [instituteName, SetinstituteName] = React.useState("");
  const [startedDate, SetstartedDate] = React.useState("");
  const [endDate, SetendDate] = React.useState("");
  const [grade, Setgrade] = React.useState("");

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [SpinnerLoading,setSpinnerLoading] = useState(true);




const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmZiIsImV4cCI6MTY1ODQ4MDY3NiwiaWF0IjoxNjU4NDYyNjc2fQ.nGMaePI9LlkHhv024ehjo4ggsuw69FQRfJmdSQWxvh8rTbFgII8hJitedYFwfRWOD0I3FXd0pXuiRfZZ-ava_w';  

function DetailsSubmit() {
    setSpinnerLoading(false);

    const edu = {

  
        "stdId": stdID,
        "qualification": qualification,
        "instituteName": instituteName,
        "startedDate": startedDate,
        "endDate": endDate,
        "grade": grade
    };

    api.post('/edu/create', edu,{
        headers: { Authorization: `Bearer ${token}`  }
    }).then(function (response) {
        if (response) {
            console.log(response)
        }
        setSpinnerLoading(true);
        setModalVisible(!modalVisible);
        setToggle(!toggle);
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
                <Text style={styles.modalTitle}>Student Education Details Form</Text>
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
                    <Text style={styles.InputLable}>Student ID : {stdID}</Text>
                    <Text style={styles.InputLable}></Text>
                  </View>

                  <View >
                    <Text style={styles.InputLable}>Qualification</Text>
                    <TextInput style={styles.InputFeild} onChangeText={Setqualification}   placeholder="qualification"  />
                  </View>

                  <View >
                    <Text style={styles.InputLable}>Institute Name</Text>
                    <TextInput style={styles.InputFeild} onChangeText={SetinstituteName}   placeholder="instituteName" />
                  </View>

                  <View >
                    <Text style={styles.InputLable}>Started Date</Text>
                    <TextInput style={styles.InputFeild} onChangeText={SetstartedDate}   placeholder="dd/mm/yyyy"  />
                  </View>
                    
                  <View >
                    <Text style={styles.InputLable}>End Date</Text>
                    <TextInput style={styles.InputFeild} onChangeText={SetendDate}   placeholder="dd/mm/yyyy"  />
                  </View>

                  <View >
                    <Text style={styles.InputLable}>Grade</Text>
                    <TextInput style={styles.InputFeild} onChangeText={Setgrade}   placeholder="grade"  />
                  </View>
                  
                    
                   
                       

                </SafeAreaView>
                </View>:<SpinnerLoad/>}
                <Pressable
                    style={styles.SaveButton}
                    onPress={() => DetailsSubmit()} >
                     <Ionicons style={styles.SaveIcon} name="ios-add-circle-outline" />
                     <Text style={styles.SaveBtnText}>SAVE DETAILS</Text>
                </Pressable>

                
          </View>
          </View>
        </View>
      </Modal>




      <TouchableHighlight underlayColor="transparent" onPress={() => setModalVisible(true)} style={styles.AddStudentBtn}>
            <View style={styles.AddStudentBtnContainer}>
                    <Ionicons style={styles.StudentAddIcon} name="ios-add-circle-outline" />
                    <Text style={styles.AddStudentBtnText}>Add Education Details</Text>
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

export default AddEduDetails;