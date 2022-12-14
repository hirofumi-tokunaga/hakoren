import React, { useState } from 'react';
import { PDFDownloadLink, PDFViewer, Page, Text, View, Font, Document, StyleSheet } from '@react-pdf/renderer'
import fontRegular from 'public/fonts/Nasu-Regular.ttf'
import fontBold from 'public/fonts/Nasu-Bold.ttf'
import TextField from '@mui/material/TextField'

export default function Resume(){
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
	const wk_styles = StyleSheet.create({
		text1: { fontSize: '11pt', fontFamily: 'Nasu-Regular' },
		text2: { fontSize: '8pt', fontFamily: 'Nasu-Regular' },
		text3: { fontSize: '7pt', fontFamily: 'Nasu-Regular' }
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
					{/* View要素で罫線を出力、Text要素で文字列を出力 */}
					<View style={{ textAlign: 'center', position: 'absolute', top: '100px', left: '35px', width: '40px', height: '32px', borderWidth: '0.2mm 0.2mm 0.2mm 0.2mm', borderStyle: 'solid solid solid solid' }}>
						{/* <Text style={wk_styles.text1}>大きい文字列です</Text>
						<Text style={wk_styles.text2}>ふつうの文字列です</Text>
						<Text style={wk_styles.text3}>小さい文字列です</Text> */}
						<Text style={wk_styles.text1}>{data}</Text>
						<Text style={wk_styles.text1}>{data2}</Text>
					</View>
				</Page>
			</Document>
		)
	}

	return (
    <>
			<TextField onChange={handleInput} value={data}/>
			<TextField onChange={handleInput2} value={data2}/>
			{/* ①②は自分の目的に合わせて選ぶ */}
			{/* ①:クリックするとPDFをダウンロードする */}
			<PDFDownloadLink document={<MyDoc />} fileName="test1.pdf">
				{({ loading }) => (loading ? 'Loading document...' : 'クリックでPDFダウンロード')}
			</PDFDownloadLink>

			{/* ②:PDFをビューアーで表示する */}
			<PDFViewer>
				<MyDoc />
			</PDFViewer>
    </>
	);
};
