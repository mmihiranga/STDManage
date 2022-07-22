import React,{useState,useEffect} from 'react';
import { StyleSheet,RefreshControl, View, Text,Image ,Dimensions , SafeAreaView, ScrollView,TouchableHighlight,Pressable,StatusBar} from 'react-native';
import api from '../api'
import {  IconButton, Searchbar } from 'react-native-paper';
import { FacebookLoader,InstagramLoader } from 'react-native-easy-content-loader';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AddStudent from './AddStudent';
import SInfo from "react-native-sensitive-info";
// import TopNav from '../Review/TopNav'
const {width , height} = Dimensions.get("window")



const styles = StyleSheet.create({
    
    CompanyListBody:{
        

    },
    CompanyListTitle:{
        fontFamily: 'Raleway-SemiBold',
        fontWeight:"600",
        fontSize:18,
        color:"#000000",
        marginLeft:12

    },
    AddReviewBtn:{
        width:230,
        alignSelf:"flex-end",
        height:52,
        marginRight:20,
        

    },
    AddReviewBtnContainer:{
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
    AddReviewBtnText:{
        color:"#F6F6F9",
        fontFamily: 'Raleway-Bold',
        fontWeight:"700",
        fontSize:15,
        textAlign: 'center',
        paddingLeft:6,
        color:"#343333",
        },
    FeedbackAddIcon:{
       fontSize:33,
       color:"#343333",
    },
    CompanyListCard:{
        overflow: 'hidden',
        shadowRadius: 10,
        borderRadius:8,
        paddingRight:15,
        paddingLeft:15,
        paddingBottom:10,
        paddingTop:12,
        marginTop:15,
        marginBottom:15,
        marginLeft:3,
        marginRight:3,
        backgroundColor:"#Fff",
        shadowColor:'#000',
        shadowOffset: {width : 0.5,height:0.5},
        shadowOpacity:0.5,
        shadowRadius:3,
        elevation: 6,
    },
    CompanyListCardHeader:{
        flexDirection:"row",
        
    },
    Image:{
        width:100,
        height:110,
        flexDirection:'row',
        alignItems:'center'
    },
    ReviewerName:{
       fontSize:15,
       fontFamily: "Raleway-Regular",
       fontStyle: "normal",
       fontWeight: "700",
       color:"#333333",
       marginLeft:8

    },
    CompanyName:{
        fontSize:15,
        fontFamily: "Raleway-Bold",
        fontStyle: "normal",
        fontWeight: "bold",
        color:"#333333",
        marginLeft:8
 
     },
    ReviewDate:{
        textAlign: 'right',
        color:"#333333",
        fontFamily:"Raleway-Regular",
        fontSize:13,
        opacity:0.7
    },
    ReviewDesc:{
        fontSize:15,
        marginTop:18,
        paddingRight:15,
        paddingLeft:15,
        color:"#666666",
        fontSize:16,
        fontFamily:"Raleway-Regular",
        lineHeight:20,
        fontWeight:"400"

    },
    rating:{
        marginTop:15,
        alignSelf:"flex-end"
    },
    starStyle : {
        width: 100,
        height: 20,
        marginBottom: 8,
        marginLeft:6
      },
    
      baseText: {
        fontFamily: "Raleway-Bold",
        fontSize: 30,
        paddingTop:50,
        fontWeight: "bold",
        color: '#000',
    
      },
      AddButton:{
          marginBottom:0,
          height:140

      }
  })

  
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  } 
  

const StudentList = () => {
    var lightColor = '#CFD4FF' 
    const[search,setSearch]=useState();
    const[rows,setRows] = useState([]);
    const [isLoading,setIsLoading] =useState(true);
    const [toggle, SetToggle] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const navigation = useNavigation(); 
     const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmZiIsImV4cCI6MTY1ODQ4MDY3NiwiaWF0IjoxNjU4NDYyNjc2fQ.nGMaePI9LlkHhv024ehjo4ggsuw69FQRfJmdSQWxvh8rTbFgII8hJitedYFwfRWOD0I3FXd0pXuiRfZZ-ava_w'
    
    
      async function f() {
      const tt =  await SInfo.getItem("key1", {
            sharedPreferencesName: "mySharedPrefs",
            keychainService: "myKeychain",
          })
        return tt;
      }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);
    useEffect(() => {
        f().then(res => {
            token = res;
        })
        setIsLoading(true)
        api.get('/student/',{
            headers: { Authorization: `Bearer ${token}`  }
        }).then(function (response) {
            console.log(response.data);
            setRows(response.data)
            setIsLoading(false)
            if (response.data.message) {
                alert.info(response.data.message);
            }
        })
            .catch(function (error) {
                console.log(error);
            })
        
    }, [refreshing,toggle])

    return(

        <View>
        <View style={{
                flexDirection: "row",
                justifyContent: 'space-between',
                backgroundColor: '#f9f9f9',
                alignItems: 'stretch', 
                alignItems: 'center',
            }}>
                <Searchbar
                    style={{ margin: 10, marginLeft: 10, borderRadius: 30, height: 35, width: 320 }}
                    placeholder="Search.."
                    onChangeText={setSearch}
                    inputStyle={{ fontSize: 14, }}
                    value={search}

                />
                <IconButton
                    style={{}}
                    icon='filter'
                    color='#000'
                    size={30}
                    onPress={() => console.log('Pressed')}
                />
            </View>
            <AddStudent SetToggle={SetToggle} toggle={toggle}/>
        <ScrollView
        
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />}
            style={{
                backgroundColor: '#f9f9f9',
                height: 800,
                padding: 20,
                marginTop: 0,

            }}> 
              {isLoading && <FacebookLoader active/> }
                        {isLoading && <FacebookLoader active/> }
 {isLoading ? <FacebookLoader active/>  : 
             <View style = {styles.CompanyListBody}>
                
                <Text style = {styles.CompanyListTitle}>Students ({rows.length}) </Text>

    
                    {rows.length > 0 && rows.map((row) => {
                
                return (
                    <Pressable key={row._id} onPress={() => navigation.navigate('EduDetailsList',{stdId:row.stdId})} style={styles.CompanyListCard}>
                      
                            <View>

                                <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 5 }} >
                                    <Feather name='chevron-right' color='#5c5c5c' size={22} />
                                    <Text style={styles.CompanyName}>Student ID : {row.stdId}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 5 }} >
                                    <Feather name='chevron-right' color='#5c5c5c' size={22} />
                                    <Text style={styles.ReviewerName}>First Name :{row.firstName} </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 5 }} >
                                    <Feather name='chevron-right' color='#5c5c5c' size={22} />
                                    <Text style={styles.ReviewerName}>Last Name : {row.lastName}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 5 }} >
                                    <Feather name='chevron-right' color='#5c5c5c' size={22} />
                                    <Text style={styles.CompanyName}>Contact Number :{row.contactNumber}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 5 }} >
                                    <Feather name='chevron-right' color='#5c5c5c' size={22} />
                                    <Text style={styles.ReviewerName}>Email : {row.email} </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 5 }} >
                                    <Feather name='chevron-right' color='#5c5c5c' size={22} />
                                    <Text style={styles.ReviewerName}>Parent Name : {row.parentName}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 5 }} >
                                    <Feather name='chevron-right' color='#5c5c5c' size={22} />
                                    <Text style={styles.ReviewerName}>Parent Contact : {row.parentContact}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 5 }} >
                                    <Feather name='chevron-right' color='#5c5c5c' size={22} />
                                    <Text style={styles.ReviewerName}>Parent Email : {row.parentEmail}</Text>
                                </View>
                                
                            </View>
                        
                    </Pressable>
                 ) ;
                  
            })}
            

                    



                   


            </View>
               
        }

</ScrollView>

            
</View>

    )



}

export default StudentList;

