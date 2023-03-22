import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , SafeAreaView, ScrollView,Image} from 'react-native';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import Phonelogo from './assets/phone.png';
import Peoplelogo from './assets/human.png';

export default function App() {
  let [error,setError]=useState(undefined);
  let [contacts,setContacts]=useState(undefined);

  useEffect(()=>{
    (async()=>{
      const { status} = await Contacts.requestPermissionsAsync();
      if(status === "granted"){
        const {data}=await Contacts.getContactsAsync({
        fields:[
          Contacts.Fields.Birthday,
          Contacts.Fields.Emails,
          Contacts.Fields.FirstName,
          Contacts.Fields.LastName,
          Contacts.Fields.PhoneNumbers
      ]})

      if(data.length>0){
        //console.log(data);
        setContacts(data);
      }else {
        setError("No contacts found");
      }
      } else {
        setError("Permission to access contacts denied.");
      }

    })();
  },[]);

  let getContactData=(data,property)=>{
    if(data){
      return data.map((data,index) =>{
        return (
          <View key={index} style={{flexDirection:'row',alignItems:'center'}}>
               <Image source={Phonelogo} style={{ width: 20, height: 20 }} />
              <Text>{data[property]}</Text>
          </View>
        )
      });
    }
  }

  let getEmails=(contact)=>{
    if (contact.emails){
      return contact.emails.map((email,index)=>{
        return {

        };
      })
    }
  };

  let getContactRows=()=>{
    if(contacts !== undefined){
      return contacts.map((contact,index)=>{
        return(
        <View key={index} style={[styles.contact,{flexDirection:'column',alignItems:'center'}]} >
          <View style={[styles.name,{flexDirection:'row'}]}>
              <Image source={Peoplelogo} style={{ width: 20, height: 20 }} />
              <Text>{contact.firstName} {contact.lastName}</Text>
          </View>
           <View style={styles.phno}>
              {contact.birthday?<Text>Birthday:{contact.birthday.month}/{contact.birthday.day}/{contact.birthday.year} </Text>:undefined}
              {getContactData(contact.phoneNumbers,"number")}
              {getContactData(contact.email,"email")}
           </View>
         
          {/* {getEmails(contact)}  */}
        </View>
        );
      });
    }else {
      return <Text>Awaiting contacts ...</Text>
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {getContactRows()}
      </ScrollView>
      <Text>{error}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    
    
  },
  contact: {
    backgroundColor: '#5e0acc',
    marginVertical:8,
    justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'column'
    
  },
  name:{
    fontSize:32,
    margin:8,
    padding:8,
    borderRadius:6,
  },
  phno:{
    backgroundColor: '#fff',
    margin:8,
    padding:8,
    borderRadius:6,
  },
});
