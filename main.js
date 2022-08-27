let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

let appElement = $(".app");
let musicPlayer = $(".music_player");
let playList = $(".play-list");
let playListWrap = $(".play-list__wrap");
let listMusicBtn = $(".list");
let exitBtnPlayList = $(".playwrap .play-list__header-exit");
let control = $(".control");
let playListHeader = $(".play-list__header");

let start = $(".start");

let prevBtn = $(".previous");
let nextBtn = $(".next");
let randomBtn = $(".random");

let headingName = $(".detail__name");
let singer = $(".detail__author");
let cdSymb = $(".header-cd");
let audio = $("#audio");

let processBar = $(".detail_process");
let processSub = $(".detail_processbar");

let volumeIcon = $(".volume-icon");
let volumeBar = $(".volume-bar");
let volumeSub = $(".volume-bar__process")

let timeCur = $(".time-current");
let timeDur = $(".time-duration");

let optionBtn = $(".song-option");
let optionSelect = $(".option-select");
let optionExit = $(".option-select__exit");
let addBtn = $(".option-add");
let removeBtn = $(".option-remove");

let wishwrap = $(".wishwrap");
let wishlist = $(".wishlist");
let wishIconBtn = $(".wishlist-icon");
let exitBtnWishList = $(".wishwrap .play-list__header-exit")

let overlay = $(".overlay");
// let confirmNotification =  $(".confirm");



let cdElement = cdSymb.animate([{
    transform: "rotate(360deg)",
}], {
    duration: 10000,
    iterations: Infinity
})

// Rotate cd (Default is paused)
cdElement.pause();


let setIndex = new Set();

let APIurl = "http://localhost:3000/songs";
function getAPI(cb) {
    fetch(APIurl)
        .then(function (response) {
            return response.json();
        })
        .then(cb)
        .catch(function (err) {
            console.log(err);
        })
};
getAPI(playSong);
function playSong(data) {



    let app = {
        songStates: ["fa-repeat", "fa-arrow-rotate-right", "fa-shuffle"],
        currentState: 0,
        volumeStates: ["fa-volume-xmark", "fa-volume-low", "fa-volume-high"],
        currentVolume: 1,
        currentIndex: 0,
        isPlaying: false,
        isHoldMusic: false,
        isHoldVolume: false,
        songs: data,
        // songs: [
        //     {
        //         name: "Reality",
        //         singer: "Lost Frequencies",
        //         img: "./assets/img/img1.jpg",
        //         music: "./assets/music/song1.mp3"

        //     },
        //     {
        //         name: "You Don't Know Me",
        //         singer: "Brodie Barclay",
        //         img: "./assets/img/img2.jpg",
        //         music: "./assets/music/song2.mp3"
        //     },
        //     {
        //         name: "Endless Love",
        //         singer: "Diana Ross",
        //         img: "./assets/img/img3.jpg",
        //         music: "./assets/music/song3.mp3"
        //     },
        //     {
        //         name: "Illusionary Daytime",
        //         singer: "Shirfine",
        //         img: "./assets/img/img4.jpg",
        //         music: "./assets/music/song4.mp3"
        //     },
        //     {
        //         name: "Cause I love you",
        //         singer: "Noo Phuoc Thinh",
        //         img: "./assets/img/img5.jpg",
        //         music: "./assets/music/song5.mp3"
        //     },
        //     {
        //         name: "Lệ Tình",
        //         singer: "Instrumental",
        //         img: "./assets/img/img6.jpg",
        //         music: "./assets/music/song6.mp3"
        //     },
        //     {
        //         name: "1 3 5",
        //         singer: "Alan Walker",
        //         img: "./assets/img/img7.jpg",
        //         music: "./assets/music/song7.mp3"
        //     },
        //     {
        //         name: "Legendary",
        //         singer: "Amadeus",
        //         img: "./assets/img/img8.jpg",
        //         music: "./assets/music/song8.mp3"
        //     },
        //     {
        //         name: "Horizon",
        //         singer: "Janji",
        //         img: "./assets/img/img9.jpg",
        //         music: "./assets/music/song9.mp3"
        //     },
        //     {
        //         name: "Ignite",
        //         singer: "Alan Walker",
        //         img: "./assets/img/img10.jpg",
        //         music: "./assets/music/song10.mp3"
        //     },
        //     {
        //         name: "Sakura Tear",
        //         singer: "Snigellin",
        //         img: "./assets/img/img11.jpg",
        //         music: "./assets/music/song11.mp3"
        //     },
        //     {
        //         name: "Something Just Like This",
        //         singer: "The Chainsmokers",
        //         img: "./assets/img/img12.jpg",
        //         music: "./assets/music/song12.mp3"
        //     },
        //     {
        //         name: "N 30 N - Speed",
        //         singer: "Alan Walker",
        //         img: "./assets/img/img13.jpg",
        //         music: "./assets/music/song13.mp3"
        //     },
        //     {
        //         name: "Fiction Sad",
        //         singer: "Instrumental",
        //         img: "./assets/img/img14.jpg",
        //         music: "./assets/music/song14.mp3"
        //     },
        //     {
        //         name: "Melody Of The Night",
        //         singer: "Shi Jin",
        //         img: "./assets/img/img15.jpg",
        //         music: "./assets/music/song15.mp3"
        //     },
        //     {
        //         name: "Kiss The Rain",
        //         singer: "Yiruma",
        //         img: "./assets/img/img16.jpg",
        //         music: "./assets/music/song16.mp3"
        //     }

        //],
        defineProperties: function () {
            Object.defineProperty(this, "currentSong", {
                get: function () {
                    return this.songs[this.currentIndex];
                }
            })
        },
        render() {
            let html = this.songs.map((song, index) => {
                return `<div class="song ${index === this.currentIndex ? "active" : ""}" data-index=${index}>
                <div class="song-avatar" style="background-image: url(${song.img});">

                </div>
                <div class="song-des ${index === this.currentIndex ? "effect" : ""}">
                    <h3 class="song-des__name">${song.name}</h3>
                    <h3 class="song-des__singer">${song.singer}</h3>
                </div>
                <div class="wave ${index === this.currentIndex ? "current" : ""}">
                    <span class="stroke"></span>
                    <span class="stroke"></span>
                    <span class="stroke"></span>
                    <span class="stroke"></span>
                    <span class="stroke"></span>
                </div>
                
                <div class="song-option">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>`
            });
            playList.innerHTML = html.join("");
        },
        renderWishList() {
            let html = Array.prototype.slice.call($$(".song")).map((song, index) => {
                if (song.classList.contains("wish")) {
                    // return `${song.outerHTML}`;   
                    /* Get the code of song (consist content inline), 
                    but make other animation so this code is not effect, 
                    must return other code
                    */
                    return `<div class="song ${index == this.currentIndex ? "active" : ""}" data-index=${index}>
                <div class="song-avatar" style="background-image: url(${this.songs[index].img});">
                </div>
                <div class="song-des ${index == this.currentIndex ? "effect" : ""}">
                    <h3 class="song-des__name">${this.songs[index].name}</h3>
                    <h3 class="song-des__singer">${this.songs[index].singer}</h3>
                </div>
                <div class="vibrations ${index == this.currentIndex ? "current" : ""}">
                    <div class="box box1"></div>
                    <div class="box box2"></div>
                    <div class="box box3"></div>
                    <div class="box box4"></div>
                    <div class="box box5"></div>
                </div>
                <div class="song-option__wish">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>`
                } else {
                    return "";
                }
            });
            wishlist.innerHTML = html.join("");
        },
        handleEvent() {
            let _this = this;




            listMusicBtn.onclick = function () {
                _this.addBackGroundList();
                _this.scrollToCurrentSong();
            };


            appElement.onclick = function () {
                _this.moveList();
                _this.moveWish();
            }

            control.onclick = function (e) {
                _this.stopPropag(e);
            };
            playListHeader.onclick = function (e) {
                _this.stopPropag(e);
            };
            $(".play-list__header.wishbg").onclick = function (e) {
                _this.stopPropag(e);
            }

            // };
            // list();
            start.onclick = function () {
                if (_this.isPlaying) {
                    audio.pause();
                } else {
                    audio.play();
                }
            }

            // Load time duration before playing
            audio.onloadedmetadata = function () {
                timeCur.textContent = _this.timeFormatter(this.currentTime);
                timeDur.textContent = _this.timeFormatter(this.duration);
            }
            // Update element when audio is playing
            audio.ontimeupdate = function () {
                let widthpro = processBar.offsetWidth;
                if (this.durarion !== NaN) {
                    processSub.style.width = (this.currentTime / this.duration * widthpro) + "px";
                }
                timeCur.textContent = _this.timeFormatter(this.currentTime);
            }
            audio.onended = function () {
                if (_this.currentState == 1) {
                    audio.play();
                    cdElement.cancel();
                } else if (_this.currentState == 0 || 2) {
                    nextBtn.click();
                }
            }
            // Play and pause music
            audio.onplay = function () {
                _this.isPlaying = true;
                cdElement.play();
                start.classList.add("playing");
            }

            audio.onpause = function () {
                _this.isPlaying = false;
                cdElement.pause();
                start.classList.remove("playing");
            }


            // Seek music
            processBar.onmousedown = function (e) {
                let seekTime = (e.offsetX / this.offsetWidth) * audio.duration;
                audio.currentTime = seekTime;
                _this.isHoldMusic = true;

            }
            processBar.onmousemove = function (e) {
                if (_this.isHoldMusic) {
                    let seekTime = (e.offsetX / this.offsetWidth) * audio.duration;
                    audio.currentTime = seekTime;
                }
            }

            // Seek volume
            volumeBar.onmousedown = function (e) {
                if (e.offsetX <= this.offsetWidth && e.offsetX >= 0) {
                    let seekVolume = (e.offsetX / this.offsetWidth);
                    audio.volume = seekVolume;
                    _this.isHoldVolume = true;
                    volumeSub.style.width = seekVolume * this.offsetWidth + "px";
                }

            }

            volumeBar.onmousemove = function (e) {
                if (_this.isHoldVolume) {
                    if (e.offsetX <= this.offsetWidth && e.offsetX >= 0) {
                        let seekVolume = (e.offsetX / this.offsetWidth);
                        audio.volume = seekVolume;
                        volumeSub.style.width = seekVolume * this.offsetWidth + "px";
                    }
                }
            }

            //Change icon volume when change volume
            audio.onvolumechange = function (e) {
                if (this.muted) {
                    _this.currentVolume = 0;
                } else {
                    if (this.volume <= 0) {
                        _this.currentVolume = 0;
                    } else if (this.volume > 0.5) {
                        _this.currentVolume = 2;
                    } else {
                        _this.currentVolume = 1;
                    }
                }
                volumeIcon.innerHTML = `<i i class="fa-solid ${_this.volumeStates[_this.currentVolume]}" ></i > `;
            }

            // Event click to mute
            volumeIcon.onclick = function (e) {
                audio.muted = !audio.muted;
                if (audio.muted) {
                    volumeSub.style.width = 0;
                } else {
                    volumeSub.style.width = audio.volume * volumeBar.offsetWidth + "px";
                }
            }

            // Hanlde event on keyboar

            window.onmouseup = () => {
                _this.isHoldMusic = false;
                _this.isHoldVolume = false;
            }

            window.onkeydown = function (e) {
                let btn = e.keyCode;
                switch (btn) {
                    // Click on Left arrow to come again 5 seconds ago
                    case 37: {
                        audio.currentTime -= 5;
                    } break;

                    // Click on Right arrow to come to 5seconds later
                    case 39: {
                        audio.currentTime += 5;
                    } break;

                    // Click on Top arrow to incease volume 5%
                    case 38: {
                        if (audio.volume + 0.05 > 1) {
                            audio.volume = 1;
                        } else {
                            audio.volume += 0.05;
                        }
                        volumeSub.style.width = audio.volume * volumeBar.offsetWidth + "px";
                    } break;

                    // Click on Bottom arrow to decrease volume 5%
                    case 40: {
                        if (audio.volume - 0.05 < 0) {
                            audio.volume = 0;
                        } else {
                            audio.volume -= 0.05;
                        }
                        volumeSub.style.width = audio.volume * volumeBar.offsetWidth + "px";

                    } break;

                    // Click on K or Space to play/pause music
                    case 75:
                    case 32: {
                        start.click();
                    } break;

                    // Click on J to move to the previous music
                    case 74: {
                        prevBtn.click();
                    } break;

                    // Click on L to move to the following music
                    case 76: {
                        nextBtn.click();
                    } break;

                    // Click on M to muted/unmuted to current music
                    case 77: {
                        volumeIcon.click();
                    } break;
                }
            }


            nextBtn.onclick = function () {
                if (_this.currentState == 2) {
                    _this.randomIndex();
                } else {
                    _this.nextSong();
                }
                audio.play();
                cdElement.cancel();
                _this.activeSong();

                // Reload the wishlist
                wishlist.innerHTML = "";
                _this.renderWishList();
            }
            prevBtn.onclick = function () {
                if (_this.currentState == 2) {
                    _this.randomIndex();
                } else {
                    _this.prevSong();
                }
                audio.play();
                cdElement.cancel();
                _this.activeSong();

                // Reload the wishlist
                wishlist.innerHTML = "";
                _this.renderWishList();
            }
            // Change state songs
            randomBtn.onclick = function () {
                _this.changeStates();
                if (_this.currentState !== 0) {
                    this.classList.add("running");
                } else {
                    this.classList.remove("running");
                }
            }

            // Change song when click 
            playList.onclick = function (e) {
                let wishSongs = $$(".song");
                let songNode = e.target.closest(".song:not(.active)");
                if (e.target.closest(".song-option")) { // Hanlde when click on option button
                    e.stopPropagation();
                    let order = e.target.closest(".song").dataset.index;
                    optionSelect.classList.add("arise");
                    overlay.classList.add("exist");

                    // Return text notification add / remove music from playlist
                    optionSelect.querySelector(".option-select__heading").textContent = "Your option?";
                    optionSelect.querySelector(".option-add").textContent = "Add to wishlist";
                    optionSelect.querySelector(".option-remove").textContent = "Remove from wishlist";


                    // Click to select remove/add to wishlist
                    // Click to add to wishlist
                    addBtn.onclick = function (event) {
                        overlay.classList.remove("exist");
                        optionSelect.classList.remove("arise");
                        wishSongs[order].classList.add("wish");
                        wishlist.innerHTML = "";
                        _this.renderWishList();
                    }

                    // Click to remove from wishlist
                    removeBtn.onclick = function (event) {
                        overlay.classList.remove("exist");
                        optionSelect.classList.remove("arise");
                        wishSongs[order].classList.remove("wish");
                        wishlist.innerHTML = "";
                        _this.renderWishList();
                    }
                } else if (songNode) { // Handle when click on a music element
                    let order = songNode.getAttribute("data-index") || songNode.dataset.index;
                    _this.currentIndex = order;
                    _this.loadCurrentSong();
                    _this.activeSong();
                    audio.play();
                    cdElement.cancel();
                    //Reload the wishlist
                    wishlist.innerHTML = "";
                    _this.renderWishList();
                }
            }

            // Click exit to close option notification
            optionExit.onclick = function () {
                optionSelect.classList.remove("arise");
                overlay.classList.remove("exist");
            }

            //Prevent propagation from click on option notification to close the overlay layout
            optionSelect.onclick = function (e) {
                e.stopPropagation();
            }
            overlay.onclick = function () {
                overlay.classList.remove("exist");
            }

            //Click to open wishlist
            wishIconBtn.onclick = function (e) {
                if (wishwrap.classList.contains("appear")) {
                    _this.moveWish();
                } else {
                    _this.addBackgroundWish();
                    _this.stopPropag(e);
                }

                _this.scrollToCurrentSong();

            }




            // Click to close wishlist
            exitBtnWishList.onclick = function (e) {
                if (playListWrap.classList.contains("appear")) {
                    _this.moveWish();
                    _this.addBackGroundList();
                } else {
                    _this.moveWish();
                }
            }
            // Click to close playlist
            exitBtnPlayList.onclick = function () {
                if (wishwrap.classList.contains("appear")) {
                    console.log(123);
                    _this.moveList();
                    _this.addBackgroundWish();
                } else {
                    _this.moveList();
                }
            };

            // Click on ellipsis remove a music from wishlist (In case wishlist)
            wishwrap.onclick = function (e) {
                let songNode = e.target.closest(".song:not(.active)");
                if (e.target.closest(".song-option__wish")) {
                    _this.stopPropag(e);
                    let wishSongs = $$(".song");
                    let confirmBtnYes = optionSelect.querySelector(".option-add");
                    let confirmBtnNo = optionSelect.querySelector(".option-remove");
                    let order = e.target.closest(".song").dataset.index;
                    overlay.classList.add("exist");
                    optionSelect.classList.add("arise");


                    optionSelect.querySelector(".option-select__heading").textContent = "Confirm to remove?";
                    optionSelect.querySelector(".option-add").textContent = "YES";
                    optionSelect.querySelector(".option-remove").textContent = "NO";


                    confirmBtnYes.onclick = function (event) {
                        overlay.classList.remove("exist");
                        optionSelect.classList.remove("arise");
                        wishSongs[order].classList.remove("wish");
                        wishlist.innerHTML = "";
                        _this.renderWishList();
                    }
                    confirmBtnNo.onclick = function (event) {
                        overlay.classList.remove("exist");
                        optionSelect.classList.remove("arise");
                    }
                } else if (songNode) {
                    let order = songNode.getAttribute("data-index") || songNode.dataset.index;
                    _this.currentIndex = order;
                    _this.loadCurrentSong();
                    _this.activeSong();
                    audio.play();
                    cdElement.cancel();

                    // Reload the wishlist
                    wishlist.innerHTML = "";
                    _this.renderWishList();
                }
            }
        },
        loadCurrentSong: function () {
            headingName.textContent = this.currentSong.name;
            singer.textContent = this.currentSong.singer;
            cdSymb.style.backgroundImage = `url(${this.currentSong.img})`;
            audio.src = this.currentSong.music;
        },

        // Change background music player regard as overlayin circumstance list musics
        addBackGroundList: function () {
            playListWrap.classList.add("appear");
            musicPlayer.style.backgroundColor = "var(--background-mp-list)";
            $(".header-des").style.color = "var(--color-text)";
            (wishIconBtn.querySelector(".fa-brands")).style.color = "var(--color-text)";
        },

        // Return background music player
        moveList: function () {
            playListWrap.classList.remove("appear");
            musicPlayer.style.backgroundColor = "var(--background-mp-default)";
            $(".header-des").style.color = "#f08bb0";
            (wishIconBtn.querySelector(".fa-brands")).style.color = "var(--icon-wish-color)";
        },

        // Change background music player regard as overlay in circumstance wishlist
        addBackgroundWish: function () {
            wishwrap.classList.add("appear");
            musicPlayer.style.backgroundColor = "var(--background-mp-wish)";
            $(".header-des").style.color = "var(--color-text)";
            (wishIconBtn.querySelector(".fa-brands")).style.color = "var(--color-text)";
        },

        // Return background music player in case wishlist
        moveWish: function () {
            wishwrap.classList.remove("appear");
            musicPlayer.style.backgroundColor = "var(--background-mp-default)";
            $(".header-des").style.color = "#f08bb0";
            (wishIconBtn.querySelector(".fa-brands")).style.color = "var(--icon-wish-color)";
        },


        // Stop prapagation event 
        stopPropag: function (e) {
            e.stopPropagation();
        },

        // Change songs
        nextSong: function () {
            this.currentIndex++;
            if (this.currentIndex == this.songs.length) {
                this.currentIndex = 0;
            }
            this.loadCurrentSong();

        },
        prevSong: function () {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1;
            }
            this.loadCurrentSong();

        },
        // Change states
        changeStates: function () {
            this.currentState++;
            if (this.currentState == 3) {
                this.currentState = 0;
            }
            randomBtn.innerHTML = `<i i class="fa-solid ${this.songStates[this.currentState]}" ></i > `;
        },

        // Random index song
        randomIndex: function () {
            setIndex.add(this.currentIndex);
            let rand;
            do {
                rand = Math.floor(Math.random() * this.songs.length);
            } while (setIndex.has(rand));
            this.currentIndex = rand;
            this.loadCurrentSong();
            if (setIndex.size == this.songs.length - 1) {
                setIndex.clear();
            }
        },

        // Change song active
        activeSong: function () {
            let musics = $$(".song");
            musics.forEach((music) => {
                if (music.classList.contains("active")) {
                    music.classList.remove("active");
                }
            })
            musics[this.currentIndex].classList.add("active");
            let waves = playList.querySelectorAll(".wave");
            waves.forEach((wave) => {
                if (wave.classList.contains("current")) {
                    wave.classList.remove("current");
                }
            })
            waves[this.currentIndex].classList.add("current");

            let songeffs = $$(".song-des");
            songeffs.forEach((songeff) => {
                if (songeff.classList.contains("effect")) {
                    songeff.classList.remove("effect");
                }
            })
            songeffs[this.currentIndex].classList.add("effect");
        },
        // Scroll to current song
        scrollToCurrentSong: function () {

            let activeSong = $$(".song.active");
            activeSong.forEach((element) => {
                setTimeout(() => {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }, 300);
            })
        },

        // Initialize volume
        initialVolume: function () {
            let defaultVolume = 0.5;
            audio.volume = defaultVolume;
            let volumeWidth = volumeBar.offsetWidth;
            volumeSub.style.width = (volumeWidth * defaultVolume) + "px";
        },

        // Time formatter
        timeFormatter: function (timeElement) {
            let timeFloored = Math.floor(timeElement);
            let min = Math.floor(timeFloored / 60);
            let sec = timeFloored % 60;
            return `${min >= 10 ? min + "" : "0" + min}:${sec >= 10 ? sec + "" : "0" + sec} `;
        },

        start() {
            this.defineProperties();

            this.loadCurrentSong();

            this.initialVolume();

            this.handleEvent();

            this.render();

        },

    }

    app.start();
}