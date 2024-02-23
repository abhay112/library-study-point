import { useState,ChangeEvent } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

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
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginLeft: '10px'
  },
  underlineWrapperText: {
    marginLeft: '10px'
  },
  label: {
    marginBottom: '10px',
  },
  input: {
    marginBottom: '20px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: 'rgb(30, 144, 255)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
});


const Pdf = () => {
  const [profile, setProfile] = useState({
    libraryName: "",
    address: "",
    receivedFrom: "",
    amount: "",
    for: "",
    receivedBy: ""
  });


  const [showPDF, setShowPDF] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  }
  const handleSubmit = () => {
    setShowPDF(true);
  }

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
      <div style={{ width: '50%', padding: '20px' }}>
        <label style={styles.label}>Library Name:</label>
        <input
          name='libraryName'
          value={profile.libraryName}
          onChange={handleChange}
          style={styles.input}
        />
        <label style={styles.label}>Address:</label>
        <input
          name='address'
          value={profile.address}
          onChange={handleChange}
          style={styles.input}
        />
        <label style={styles.label}>Received From:</label>
        <input
          name='receivedFrom'
          value={profile.receivedFrom}
          onChange={handleChange}
          style={styles.input}
        />
        <label style={styles.label}>Amount:</label>
        <input
          name='amount'
          value={profile.amount}
          onChange={handleChange}
          style={styles.input}
        />
        <label style={styles.label}>For:</label>
        <input
          name='for'
          value={profile.for}
          onChange={handleChange}
          style={styles.input}
        />
        <label style={styles.label}>Received By:</label>
        <input
          name='receivedBy'
          value={profile.receivedBy}
          onChange={handleChange}
          style={styles.input}
        />
        <button style={styles.button} onClick={handleSubmit}>Generate PDF</button>
      </div>
      {showPDF && (
        <div style={{ width: '50%' }}>
          <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
              <Page>
                <View style={styles.container}>
                  <View style={styles.containerHeader}>
                    <View style={styles.headerContainer}> <Text style={styles.header}>Payment Receipt</Text></View>
                    <Text>No.<Text></Text></Text>
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
                      <Text style={styles.underlineWrapperText}>{profile.amount}</Text>
                    </View>
                  </View>
                  <View style={styles.contentDiv}>
                    <Text>For:</Text>
                    <View style={styles.underlineWrapper}>
                      <Text style={styles.underlineWrapperText}>{profile.for}</Text>
                    </View>
                  </View>
                  <View style={styles.contentDiv}>
                    <Text>Received By:</Text>
                    <View style={styles.underlineWrapper}>
                      <Text style={styles.underlineWrapperText}>{profile.receivedBy}</Text>
                    </View>
                  </View>
                </View>
              </Page>
            </Document>
          </PDFViewer>
          <PDFDownloadLink
            document={<Document></Document>}
            fileName='payment_receipt.pdf'
          >
            {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default Pdf;
