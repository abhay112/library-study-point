import React from 'react';
import {  Text, View, StyleSheet } from '@react-pdf/renderer';

interface Profile {
  no: string;
  libraryName: string;
  address: string;
  receivedFrom: string;
  amount: string;
  for: string;
  receivedBy: string;
}
interface PDFComponentProps {
  profile: Profile;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    padding: '20px',
  },
  containerHeader: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  header: {
    color: 'rgb(205, 25, 25)',
    fontSize: '36px',
  },
  addressDiv: {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px 0',
    width: '300px'
  },
  contentDiv: {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px 0',
  },
  underlineWrapper: {
    flex: 1,
    borderBottom: '1px dotted grey',
    marginLeft:'10px'
  },
  underlineWrapperText:{
    marginLeft:'10px'
  }
});

const PDFComponent: React.FC<PDFComponentProps> = ({ profile }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.headerContainer}> <Text style={styles.header}>Payment Receipt</Text></View>
        <Text>No.<Text>{profile.no}</Text></Text>
      </View>
      <View style={styles.addressDiv}>
        <View >
          <Text>Library Name: </Text>
        </View>
        <View style={styles.underlineWrapper}>
          <Text >{profile.libraryName}</Text>
        </View>
      </View>
      <View style={styles.addressDiv}>
        <View >
          <Text>Address:</Text>
        </View>
        <View style={styles.underlineWrapper}>
          <Text >{profile.address}</Text>
        </View>
      </View>
      <View style={styles.contentDiv}>
        <View >
          <Text>Received From:</Text>
        </View>
        <View style={styles.underlineWrapper}>
          <Text style={styles.underlineWrapperText}>{profile.receivedFrom}</Text>
        </View>
      </View>
      <View style={styles.contentDiv}>
        <View >  <Text>Amount:</Text></View>
        <View style={styles.underlineWrapper}>
          <Text  style={styles.underlineWrapperText}>{profile.amount}</Text>
        </View>
      </View>
      <View style={styles.contentDiv}>
        <Text>For:</Text>
        <View style={styles.underlineWrapper}>
          <Text  style={styles.underlineWrapperText}>{profile.for}</Text>
        </View>
      </View>
      <View style={styles.contentDiv}>
        <Text>Received By:</Text>
        <View style={styles.underlineWrapper}>
          <Text  style={styles.underlineWrapperText}>{profile.receivedBy}</Text>
        </View>
      </View>
    </View>
  );
};

export default PDFComponent;
