import React, { useState } from 'react';
import { PDFDownloadLink, PDFViewer, Page, Text, View, Font, Document, StyleSheet } from '@react-pdf/renderer'
import fontRegular from 'public/fonts/Nasu-Regular.ttf'
import fontBold from 'public/fonts/Nasu-Bold.ttf'
import TextField from '@mui/material/TextField'

export default function Generator(){
	// ttfファイルのフォント定義
	// フォント「ナス レギュラー」
	Font.register({
		family: 'Nasu-Regular',
		src: fontRegular
	});

	// // フォント「ナス 太字」
	Font.register({
		family: 'Nasu-Bold',
		src: fontBold
	});

	// CSSスタイル定義
	const styles = StyleSheet.create({
		page: {
			paddingTop: 35,
			paddingBottom: 65,
			paddingHorizontal: 35,
		},
		title: {
			fontSize: 24,
			textAlign: 'center',
			fontFamily: 'Oswald'
		},
		author: {
			fontSize: 12,
			textAlign: 'center',
			marginBottom: 40,
		},
		subtitle: {
			fontSize: 18,
			margin: 12,
			fontFamily: 'Oswald'
		},
		text: {
			margin: 12,
			fontSize: 14,
			textAlign: 'justify',
			fontFamily: 'Times-Roman'
		},
		image: {
			marginVertical: 15,
			marginHorizontal: 100,
		},
		header: {
			fontSize: 12,
			marginBottom: 20,
			textAlign: 'center',
			color: 'grey',
		},
		view: {
			textAlign: 'center',
			position: 'absolute',
			top: '100px',
			left: '35px',
			width: '200px',
			height: '100px',
			borderWidth: '0.2mm 0.2mm 0.2mm 0.2mm',
			borderStyle: 'solid solid solid solid',
			backgroundColor:"#ff8800",
		},
		pageNumber: {
			position: 'absolute',
			fontSize: 12,
			bottom: 30,
			left: 0,
			right: 0,
			textAlign: 'center',
			color: 'grey',
		},
		text1: { fontSize: '24pt', fontFamily: 'Nasu-Regular' },
		text2: { fontSize: '20pt', fontFamily: 'Nasu-Regular' },
		text3: { fontSize: '16pt', fontFamily: 'Nasu-Regular' }
	});

	const [data,setData] = useState()
	const [data2,setData2] = useState()
	const handleInput = (e) => {
		setData(e.target.value);
	}
	const handleInput2 = (e) => {
		setData2(e.target.value);
	}
	const MyDoc = () => {
		return (
			<Document>
				{/* orientationは用紙の縦横を指定する（公式ドキュメント参照） */}
				<Page size="A4" orientation="landscape" >
					<View style={styles.view}>
						<Text style={styles.text1}>{data}</Text>

						<Text style={styles.text2}>{data2}</Text>
					</View>
				</Page>
			</Document>
		)
	}

	return (
    <>
			<TextField onChange={handleInput} value={data}/>
			<TextField onChange={handleInput2} value={data2}/>
			{/* ①:クリックするとPDFをダウンロードする */}
			<PDFDownloadLink document={<MyDoc />} fileName="test1.pdf">
				{({ loading }) => (loading ? 'Loading document...' : 'クリックでPDFダウンロード')}
			</PDFDownloadLink>

			{/* ②:PDFをビューアーで表示する */}
			<PDFViewer width="800px" height="400px">
				<MyDoc />
			</PDFViewer>
    </>
	);
};
