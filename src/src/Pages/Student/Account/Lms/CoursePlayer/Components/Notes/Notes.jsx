import './Notes.scss'
import { useRef,useState } from 'react';
import JoditEditor from 'jodit-react';

import { StyleSheet } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// 
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
const Notes = () => {
  const editor = useRef(null);
  const pdfContainerRef = useRef(null);
	const [content, setContent] = useState('');
  // const config = useMemo(
	// 	{
	// 		readonly: false,
	// 		placeholder: placeholder || 'Start typings...'
	// 	},
	// 	[placeholder]
	// );
  const convertToPDF = () => {
   const pdfContainer = pdfContainerRef.current;

    html2canvas(pdfContainer, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('generated-pdf.pdf');
    });
  };

  return (
    <div className='notes-components'>
      <JoditEditor
			ref={editor}
			value={content}
			tabIndex={10}
			onChange={newContent => setContent(newContent)}
		/>
    <button id="save" onClick={convertToPDF}>Save & Download</button>
    <div ref={pdfContainerRef} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default Notes
