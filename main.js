const gameStatus = {
    over: false,
    winner: false,
    begginerFlag: false
}

function verifyTurn(boxes) {
    const X = 'X'
    const O = 'O'

    if( gameStatus.begginerFlag === false ){
        gameStatus.begginerFlag = true
        boxes.id = 'x'
        return X
    }
    else if( gameStatus.begginerFlag === true ) {
        gameStatus.begginerFlag = false
        boxes.id = 'o'
        return O
    }
}

function changeBoxStyleFactory(selector, color) { // Muda a cor dos quadros
    const winner = document.querySelectorAll(`${selector}`)
    const restartButton = document.querySelector('.restart')
    const screenWidth = window.screen.width

    winner.forEach( (i) => {
        if(screenWidth <= 375) {
            i.style.transition = '.7s'
            i.style.background = color
            i.style.fontSize = '32pt'
        } else {
            i.style.transition = '.7s'
            i.style.background = color
            i.style.fontSize = '48pt'
        }
    } )

    restartButton.addEventListener('click', () => {
        window.location.reload()
    })
}

function verifyVictory() { // Verifica o vencerdor do jogo
    const boxes = document.querySelectorAll('.content')

    if( 
        boxes[0].id == boxes[1].id && 
        boxes[0].id == boxes[2].id && 
        boxes[0].id != "" ) {
            boxes[0].id = boxes[1].id = boxes[2].id = 'winner'
    }else if
        ( 
            boxes[3].id == boxes[4].id && 
            boxes[3].id == boxes[5].id && 
            boxes[3].id != "" 
        ) {
            boxes[3].id = boxes[4].id = boxes[5].id  = 'winner'

    }else if
        ( 
            boxes[6].id == boxes[7].id && 
            boxes[6].id == boxes[8].id && 
            boxes[7-1].id != "" 
        ) {
            boxes[6].id = boxes[7].id = boxes[8].id  = 'winner'

    }else if
        ( 
            boxes[0].id == boxes[3].id && 
            boxes[0].id == boxes[6].id && 
            boxes[0].id != "" 
        ) {
            boxes[0].id = boxes[3].id = boxes[6].id  = 'winner'

    }else if
        ( 
            boxes[1].id == boxes[4].id && 
            boxes[1].id == boxes[7].id && 
            boxes[1].id != "" 
        ) {
            boxes[1].id = boxes[4].id = boxes[7].id  = 'winner'

    }else if
        ( 
            boxes[2].id == boxes[5].id && 
            boxes[2].id == boxes[8].id && 
            boxes[2].id != "" 
        ) {
            boxes[2].id = boxes[5].id = boxes[8].id  = 'winner'

    }else if
        ( 
            boxes[0].id == boxes[4].id && 
            boxes[0].id == boxes[8].id && 
            boxes[0].id != "" 
        ) {
            boxes[0].id = boxes[4].id = boxes[8].id  = 'winner'

    }else if
        ( 
            boxes[2].id == boxes[4].id && 
            boxes[2].id == boxes[6].id && 
            boxes[2].id != "" 
        ) {
            boxes[2].id = boxes[4].id = boxes[6].id  = 'winner'
    }

    if( boxes[0].id === 'winner' || boxes[1].id === 'winner' || boxes[2].id === 'winner'|| boxes[3].id === 'winner' || boxes[6].id === 'winner' ){
        changeBoxStyleFactory('#winner', 'green')
        return
    }
}

function verifyLogic(boxes, endControl) {
    const verify = boxes[0].id === 'winner' || boxes[1].id === 'winner' || boxes[2].id === 'winner'|| boxes[3].id === 'winner' || boxes[6].id === 'winner'
    if( verify ) return

    if(endControl.length === 9) {
        changeBoxStyleFactory('.content', 'red')
        gameStatus.over = true
    }
}

function getBox() { // Coleta todas as caixas do quadro
    const boxes = document.querySelectorAll('.content')
    const button = document.querySelector('.restart')
    const endControl = []

    button.disabled = true
    boxes.forEach((i) => { // Adiciona um evento para caixa do quadro
        i.addEventListener('click', e => {
            for(let i = 0; i < boxes.length; i ++) {
                if(boxes[i].id == "winner") {
                    gameStatus.winner = true
                    break
                }
            }

            if(!gameStatus.winner) {
                if( i.id != '' ) {
                    e.preventDefault()
                } else {
                    endControl.push(1)
                    i.innerHTML = verifyTurn(i)
                }
            }

            verifyVictory()
            verifyLogic(boxes, endControl)
        })
    })
}

window.onload = () => {
    const button = document.querySelector('.restart')
    const myInterval =  setInterval(e => {
        getBox()
        if(gameStatus.winner || gameStatus.over) {
            button.disabled = false
            clearInterval(myInterval)
        }
    }, 600)
}


