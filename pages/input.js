import { useEffect, useState } from 'react'
import { getDb, getId, deleteData, setData, addData, getSortData } from 'components/api'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import Loading from 'components/loading'

import styles from 'styles/input.module.scss'

export default function Input(){
	return(
		<>
			<h2>ご予約</h2>
			
		</>
	)
}	