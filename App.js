import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground,Pressable,Alert } from 'react-native';
import React,{useState} from 'react';
import bg from './assets/bg.jpeg';


export default function App() {
	const emptyMap=[
		['','',''],//1st row
		['','',''],//2nd row
		['','',''],//3rd row
	];
	const [map, setMap] =useState(emptyMap);
	const [currentTurn, setCurrentTurn] =useState('x')
	const onPressF=(rowIndex,cellIndex)=>{
		//console.log('Hello',rowIndex,cellIndex);
		if(map[rowIndex][cellIndex] !== ""){
			Alert.alert('Possition already occupied.');
			//console.log('Possition already occupied.');
			return;
		}
		setMap((existingMap)=>{
			const previousMap=[...existingMap]
			previousMap[rowIndex][cellIndex] =currentTurn;
			return previousMap;
		})
		setCurrentTurn(currentTurn === 'x'?'o':'x');


		const winner =getWinner();
		if(winner){
			gameWon(winner)
		}else{
			checkTieState();
		}
		
	}
	const getWinner =()=>{
		//check rows
		for(let i=0; i < 3; i++){
			const isRowXWinning=map[i].every((cell)=>cell ==='x');
			const isRowOWinning=map[i].every((cell)=>cell ==='o');
			if(isRowXWinning){
				return 'X';
				//Alert.alert(`X won. row: ${i}`);
			}
			if(isRowOWinning){
				return 'O';
				//Alert.alert(`O won. row: ${i}`);
			}
		}
		//check columns
		for(let col=0; col < 3; col++){
			let isColXWinning=true;
			let isColOWinning=true;
			for(let row=0; row < 3; row++){
				
				if(map[row][col] !== 'x'){
					isColXWinning=false;
				}
				if(map[row][col] !== 'o'){
					isColOWinning=false;
				}
			}
			
			if(isColXWinning){
				return 'X';
				//Alert.alert(`X won. col: ${col}`);
				break;
			}
			if(isColOWinning){
				return 'O';
				//Alert.alert(`O won. col: ${col}`);
				break;
			}


		}

		//checl diago
		let isDiagonal1XWinning=true;
		let isDiagonal1OWinning =true;

		let isDiagonal2XWinning=true;
		let isDiagonal2OWinning =true;
		for(let i=0; i < 3; i++){
			if(map[i][i] !== 'x'){
				isDiagonal1XWinning=false;
			}
			if(map[i][i] !== 'o'){
				isDiagonal1OWinning=false;
			}

			if(map[i][2-i] !== 'x'){
				isDiagonal2XWinning=false;
			}
			if(map[i][2-i] !== 'o'){
				isDiagonal2OWinning=false;
			}

		}

		if(isDiagonal1XWinning || isDiagonal2XWinning){
			return 'X';
			//Alert.alert(`X won. Diagonal: 1`);
		}
		if(isDiagonal1OWinning || isDiagonal2OWinning){
			return 'O';
			//Alert.alert(`O won. Diagonal: 1`);
		}

		// if(isDiagonal2XWinning){
		// 	gameWon('X');
		// 	//Alert.alert(`X won. Diagonal: 2`);
		// }
		// if(isDiagonal2OWinning){
		// 	gameWon('O');
		// 	//Alert.alert(`O won. Diagonal: 2`);
		// }

	}

	const checkTieState=()=>{
		if(!map.some(row => row.some(cell =>cell === ''))){
			Alert.alert(`It's a tie`,`tie`,[{
				text:'Restart',
				onPress:resetGame
			}]);
		}
	}


	const gameWon=(player)=>{
		Alert.alert(`Huraay✌️✌️✌️✌️`,`Player ${player} won`,[{
			text:'Restart',
			onPress:resetGame
		}]);
	}

	const resetGame=()=>{
		setMap(emptyMap);
		setCurrentTurn('x');
	}

  return (
    <View style={styles.container}>
		<ImageBackground source={bg} style={styles.bg} resizeMode="contain">
		<Text style={{fontSize:24, color:'white',marginBottom:'auto',marginTop:50,position:'absolute',top:50}}>Current Turn : {currentTurn.toUpperCase()}</Text>
			<View style={styles.map}>
			{
				map.map((row,rowIndex)=>(
					<View style={styles.row} key={`row-${rowIndex}`}>
						{row.map((cell,cellIndex)=>( 
							<Pressable style={styles.cell} key={`row-${rowIndex}-col-${cellIndex}`} onPress={()=>onPressF(rowIndex,cellIndex)}>
								{cell ==='o' && <View style={styles.circle}/>}
								{cell === 'x' && (
									<View style={styles.cross}>
										<View style={styles.crossLine}></View>
										<View style={[styles.crossLine,styles.crossLineReversed]}></View>
									</View>
									)}
							</Pressable>
							
						 ))}
					</View>
				))
			}
				{/* <View style={styles.circle}/>
				
				<View style={styles.cross}>
					<View style={styles.crossLine}></View>
					<View style={[styles.crossLine,styles.crossLineReversed]}></View>
				</View> */}
			</View>
		</ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:'#242D34',
	},
	bg:{
		width:'100%',
		height:'100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop:20,
	},
	map:{
		width:'80%',
		aspectRatio:1,
	},
	row:{
		flex:1,
		flexDirection:'row',
	},
	cell:{
		width:95,
		height:95,
		flex:1,
	},
  	circle:{
		flex:1,
		borderRadius:50,
		alignItems: 'center',
		justifyContent: 'center',
		margin:15,
		borderWidth:8,
		borderColor:'white',
		
  	},
	cross:{
		flex:1,
	},
	crossLine:{
		position:'absolute',
		left:'48%',
		width:8,
		height:'90%',
		backgroundColor:'white',
		borderRadius:5,
		transform:[{
			rotate:'45deg',
		}],
	},
	crossLineReversed:{
		transform:[{
			rotate:'-45deg',
		}],
	}




});
