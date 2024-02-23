import { Document, Page, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import Section from './Section'
import {  StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    margin:0,
    padding:0,
  }})
interface PreviewProps {
  profile: {
    no:string;
    libraryName: string;
    address: string;
    receivedFrom: string;
    amount: string;
    for: string;
    receivedBy: string;
  };
}

const Preview: React.FC<PreviewProps> = ({ profile }) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <PDFViewer
        showToolbar={false}
        style={{
          width: 'fit-content',
          height: '50%',
        }}
      >
        <Template profile={profile} />
      </PDFViewer>
      <PDFDownloadLink
        document={<Template profile={profile} />}
        fileName='somename.pdf'
      >
        {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink>
    </div>
  )
}
interface TemplateProps {
  profile: {
    no:string;
    libraryName: string;
    address: string;
    receivedFrom: string;
    amount: string;
    for: string;
    receivedBy: string;
  };
}

const Template: React.FC<TemplateProps> = ({ profile }) => {
 
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <Section profile={profile} />
      </Page>
    </Document>
  )
}

export default Preview
