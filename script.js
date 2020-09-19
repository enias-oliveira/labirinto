const mapa = {
    1:"WWWWWWWWWWWWWWWWWWWWW",
    2:"W   W     W     W W W",
    3: "W W W WWW WWWWW W W W",
    4:"W W W   W     W W   W",
    5:"W WWWWWWW W WWW W W W",
    6:"W         W     W W W",
    7: "W WWW WWWWW WWWWW W W",
    8: "W W   W   W W     W W",
    9: "W WWWWW W W W WWW W F",
    10: "S     W W W W W W WWW",
    11: "WWWWW W W W W W W W W",
    12: "W     W W W   W W W W",
    13: "W WWWWWWW WWWWW W W W",
    14: "W       W       W   W",
    15: "WWWWWWWWWWWWWWWWWWWWW",
}

const labirinto = document.querySelector(".labirinto")

labirinto.displayMap = () => {
    for (let i = 1; i <= 15;i++){
        let linha = document.createElement("div")
        linha.classList.add("linhas", `linha${i}`)
        
        for (let j = 0; j < mapa[i].length; j++){
            let cell = document.createElement("div")
            cell.classList.add("cell",`coluna${j}`)
        
            let cellfill = mapa[i][j] == 'W' ? 'wall' : 'space'
            cell.classList.add(`${cellfill}`)
            linha.appendChild(cell)
            }
        
        labirinto.appendChild(linha)
    }
}

labirinto.displayMap()
const linhas = document.querySelectorAll(".linhas")

const jogador = document.createElement("div")
jogador.classList.add("jogador")
jogador.position = {linha : 10, coluna : 0}
jogador.initialPosition = () => {
document.querySelector(".linha10 .coluna0").appendChild(jogador)
}

jogador.initialPosition()

jogador.move = (dir) => {
    let currentline = jogador.position.linha
    let currentCol = jogador.position.coluna
    
    switch(dir) {
        case 'ArrowUp':
            currentline -= 1
            break
        case 'ArrowDown':
            currentline += 1
            break
        case 'ArrowLeft':
            currentCol -=1
            break
        case 'ArrowRight':
            currentCol += 1
    }

    let destination = document.querySelector(`.linha${currentline} .coluna${currentCol}`)

    let currentPosition = mapa[currentline][currentCol]

    if (currentPosition !== 'W' && currentPosition !== undefined){
    jogador.position.linha = currentline
    jogador.position.coluna = currentCol
    console.log(jogador.position)
    destination.appendChild(jogador)
    }

    jogador.victoryVerify(currentPosition)
}

document.addEventListener('keydown',(event) =>jogador.move(event.key))

jogador.victoryVerify = (pos) => {
    if (pos === 'F'){
       linhas.forEach(l => l.style.display = 'none')
       let victoryMessage = document.createElement('div')
       victoryMessage.classList.add('victory')
       victoryMessage.innerText = "Parabéns, você conseguiu sair do labirinto!"
       labirinto.appendChild(victoryMessage)
    }
}
