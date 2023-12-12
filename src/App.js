import { useEffect, useState } from 'react';
import './App.css';
import { chocolate,dango,iceCream,lollipop,purpleCandy,blank } from './images';



const width = 8
const candyColors =[
  chocolate,
  dango,
  iceCream,
  lollipop,
  purpleCandy
]

const App = () => {

const [currentColorArrangement, setCurrentColorArrangement] = useState([])
const[squareBeingDragged, setSquareBeingDragged] =useState(null)
const [squareBeingReplaced,setSquareBeingReplaced] =useState(null)
const [scoreDisplay,setScoreDisplay] =useState(0)


const checkForColumnOfFive =()=>{
  for(let i =0;i<32;i++){
    const columOfFive = [i, i + width , i + width * 2 , i + width * 3 , i + width * 4]
    const decidedColor = currentColorArrangement[i]
    const isBlank =currentColorArrangement[i] === blank
    
    
    if(columOfFive.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
      columOfFive.forEach(square => currentColorArrangement[square]= blank)
      setScoreDisplay((score)=>score+1)
      return true
    }
  }
}

const checkForRowOfFive =()=>{
  for(let i =0; i<64; i++){
    const rowOfFive =[i,i+1,i+2,i+3,i+4]
    const decidedColor = currentColorArrangement[i]
    const notValid =[4,5,6,7,12,13,14,15,20,21,22,23,28,29,30,31,36,37,38,39,44,45,46,47,52,53,54,55,60,61,62,63]
    const isBlank =currentColorArrangement[i] === blank


    if(notValid.includes(i)) continue
    if(rowOfFive.every(square => currentColorArrangement[square]===decidedColor & !isBlank)){
       rowOfFive.forEach(square=>currentColorArrangement[square] = blank)
       setScoreDisplay((score)=>score + 1)
       return true
    }
  }
}

const checkForColumnOfFour =()=>{
  for(let i =0;i<40;i++){
    const columOfFour = [i, i + width , i + width * 2 , i + width * 3 ]
    const decidedColor = currentColorArrangement[i]
    const isBlank =currentColorArrangement[i] === blank
    
    
    if(columOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
      columOfFour.forEach(square => currentColorArrangement[square]= blank)
      setScoreDisplay((score)=>score+1)
      return true
    }
  }
}

const checkForRowOfFour =()=>{
  for(let i =0; i < 64; i++){
    const rowOfFour =[i,i+1,i+2,i+3]
    const decidedColor = currentColorArrangement[i]
    const notValid =[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,61,62,63]
    const isBlank =currentColorArrangement[i] === blank


    if(notValid.includes(i)) continue
    if(rowOfFour.every(square => currentColorArrangement[square]===decidedColor & !isBlank)){
      rowOfFour.forEach(square=>currentColorArrangement[square] = blank)
       setScoreDisplay((score)=>score + 1)
       return true
    }
  }
}

const checkForColumnOfThree =()=>{
  for(let i =0;i < 48;i++){
    const columOfThree = [i, i + width , i + width * 2  ]
    const decidedColor = currentColorArrangement[i]
    const isBlank =currentColorArrangement[i] === blank
    
    
    if(columOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
      columOfThree.forEach(square => currentColorArrangement[square]= blank)
      setScoreDisplay((score)=>score+1)
      return true
    }
  }
}

const checkForRowOfThree =()=>{
  for(let i =0; i < 64; i++){
    const rowOfThree =[i,i+1,i+2]
    const decidedColor = currentColorArrangement[i]
    const notValid =[6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63]
    const isBlank =currentColorArrangement[i] === blank


    if(notValid.includes(i)) continue
    if(rowOfThree.every(square => currentColorArrangement[square]===decidedColor & !isBlank)){
      rowOfThree.forEach(square=>currentColorArrangement[square] = blank)
       setScoreDisplay((score)=>score + 1)
       return true
    }
  }
}

const moveIntoSquareBelow =()=>{
  for(let i=0;i<56;i++){
    const firstRow = [0,1,2,3,4,5,6,7]
    const isFirstRow =firstRow.includes(i)


    if(isFirstRow && currentColorArrangement[i]=== blank){
      let randNumber = Math.floor(Math.random()*candyColors.length)
      currentColorArrangement[i] =candyColors[randNumber]
    }
    if ((currentColorArrangement[i+width])== blank){
      currentColorArrangement[i+width] = currentColorArrangement[i]
      currentColorArrangement[i] = blank
    }
  }
}

const dragStart =(e) =>{
  setSquareBeingDragged(e.target)

}

const dragDrop = (e) =>{
  setSquareBeingReplaced(e.target)

}

const dragEnd =(e)=>{
  const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
  const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

  currentColorArrangement[squareBeingReplacedId] =squareBeingDragged.getAttribute('src')
  currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

  const validMoves = [
    squareBeingDraggedId - 1,
    squareBeingDraggedId - width,
    squareBeingDraggedId + 1,
    squareBeingDraggedId + width

  ]

  const validMove = validMoves.includes(squareBeingReplacedId)

  const isColumnOfFive =checkForColumnOfFive()
  const isARowOfFive =checkForRowOfFive()
  const isColumnOfFour = checkForColumnOfFour()
  const isARowOfFour = checkForRowOfFour()
  const isColumnOfThree =checkForColumnOfThree()
  const isARowOfThree = checkForRowOfThree()

  if(squareBeingReplacedId && validMove &&
    (isColumnOfThree || isARowOfThree || isColumnOfFour || isARowOfFour || isColumnOfFive || isARowOfFive)){
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    }
    else{
      currentColorArrangement[squareBeingReplacedId] =squareBeingReplacedId.getAttribute('src')
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      setCurrentColorArrangement([...currentColorArrangement])
    }
}

  const createBoard=()=>{
    const randomColorArrangement =[]
    for(let i=0;i<width*width;i++){
      const randomColor = candyColors[Math.floor(Math.random()* candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }


  useEffect(()=>{
    createBoard()
  },[])
 
  useEffect(()=>{
    const timer =setInterval(()=>{
      checkForColumnOfFive()
      checkForRowOfFive()
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    },100)
    return ()=> clearInterval(timer)
  },[checkForColumnOfFive,checkForRowOfFive,checkForColumnOfFour,checkForRowOfFour,checkForColumnOfThree,checkForRowOfThree,currentColorArrangement])


  return (
    <div className='app'>
            
            <div className='container'>
              <img className='rounded'
              src='https://wallpapercrafter.com/desktop3/1120548-Video-Game-Candy-Crush-Saga-1080P.jpg'
              width={'400px'}
              height={'300px'}
              />
              <h1 className='d-flex align-items-center justify-content-center text '
            style={{fontFamily:'sans-serif',fontStyle:"oblique", color:'chocolate' }}>Hakuna Matata!!!!</h1>
            <p className='text-warning' style={{fontFamily:'cursive',fontSize:'20px'}}>"Satisfy your sweet cravings with Candy Crush."</p>
              
            </div>

      <div className='game'>

        {currentColorArrangement.map((candyColor,index)=>(
          <img
          key={index}
          src={candyColor}
          alt={candyColor}
          data-id={index}
          draggable={true}
          onDragStart={dragStart}
          onDragOver={(e)=>e.preventDefault()}
          onDragEnter={(e)=>e.preventDefault()}
          onDragLeave={(e)=>e.preventDefault()}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
          />
        ))}
      </div>
      <h1 className='score'>Score:{scoreDisplay}</h1>
    </div>
  );
}

export default App;
