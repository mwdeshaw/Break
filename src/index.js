import Game from "./classes/game";
import GView from "./classes/g_view";

document.addEventListener("DOMContentLoaded", () => {
    let github = document.getElementById("github");
    github.onclick = () => {
        document.location.href = 'https://github.com/mwdeshaw';
    }
    let linkedin = document.getElementById("linkedin");
    linkedin.onclick = () => {
        document.location.href = 'https://www.linkedin.com/in/matthew-deshaw-b629a0ba/';
    }

    const defScreen = document.getElementById("default");
    const powerBtn = document.querySelector(".power-btn");
    powerBtn.classList.add("end");

    const arrow = document.querySelector(".arrow");
    powerBtn.onclick = () => {
        powerBtn.classList.remove("end");
        arrow.classList.add("end");
        defScreen.setAttribute("class", "active");
        const startScreen = document.getElementById('start-screen');
        startScreen.setAttribute("class", "active");

        const light = document.getElementById('power-lt');
        light.setAttribute("class", "active");

        const screenText = document.querySelector(".start-text");
        const instructions = document.querySelector(".instructions");
        const controlsList = document.querySelector(".controls-list");

        screenText.classList.add("end");
        const startBtn = document.getElementById("start-game");
        const arrowDown = document.querySelector(".arrow-start");
        setTimeout(() => {
            const audio = document.getElementById("gameboySound");
            audio.currentTime = 0;
            audio.play();
            instructions.classList.add("end");
            controlsList.classList.add("end");
            startBtn.setAttribute("class", "active");
            arrowDown.classList.add("end");
        }, 3000);

        startBtn.onclick = () => {
            instructions.classList.remove("end");
            arrowDown.classList.remove("end");
            startScreen.removeAttribute("class");
            startBtn.removeAttribute("class");
            controlsList.classList.remove("end");
            screenText.classList.remove("end");
            const canvas = document.getElementById("board");
            const ctx = canvas.getContext("2d");
            const game = new Game(ctx);
            new GView(game).start();
        };

        // if (defScreen.classList[0] === "active") {
        //     powerBtn.onclick = () => {
        //         defScreen.removeAttribute("class");
        //         startBtn.removeAttribute("class");
        //         startScreen.removeAttribute("class");
        //         screenText.classList.remove("end");
        //         instructions.classList.remove("end");
        //         controlsList.classList.remove("end");
        //         light.removeAttribute("class");
        //     };
        // };
    };
});