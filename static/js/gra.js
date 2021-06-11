class Gra {
  constructor() {
    this.camera
    this.scene
    this.raycaster = new THREE.Raycaster()
    this.wektor = new THREE.Vector2()
    this.tablica = [[0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]]
    this.obj = { x: 0, y: 0, value: "false" }
    this.tablice = { x: [], y: [], kule: [] }
    this.kulka = ""
    this.wch = -120
    this.kolorek = 1
    this.zmienianie = "-"
    this.kolorki = "false"
    this.li = 0
    this.stop = "false"
    this.gotowosc = { player1: "true", player2: "true" }
    this.wygrany = ""
    this.init()
  }

  init() {
    var renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xbb3b3b3);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $("#root").append(renderer.domElement)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.set(150, 700, 150)
    this.camera.lookAt(150, 0, 150)
    for (let z = 0; z <= 5; z++) {
      let boxes = []
      for (let x = 0; x <= 5; x++) {
        let box = new THREE.BoxGeometry(50, 50, 50)
        let material = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
          map: new THREE.TextureLoader().load("/tlo.jpeg"),
        });
        let cube = new THREE.Mesh(box, material)
        cube.userData = { x: x, y: z }
        this.scene.add(cube)
        cube.position.set((x * 50), 0, (z * 50))
        boxes.push(cube)
      }
    }
    let scene = this.scene
    let camera = this.camera
    function render() {
      if (gra) {

        let x = gra.obj.x
        let y = gra.obj.y
        if (gra.obj.value == "true") {
          gra.wch = gra.wch + 10
          gra.kulka.position.set((x * 51), 30, gra.wch)
          if (gra.wch == y * 50) {
            gra.obj.value = "false"
          }
        }


        if (gra.kolorki == "true") {
          if (gra.zmienianie == "-") {
            gra.kolorek = gra.kolorek - 0.01
          }
          if (gra.zmienianie == "+") {
            gra.kolorek = gra.kolorek + 0.01
          }
          for (let zet = 0; zet < gra.tablice.kule.length; zet++) {
            gra.tablice.kule[zet].material.opacity = gra.kolorek
          }
          if (gra.kolorek <= 0.5) {
            gra.zmienianie = "+"
          }
          if (gra.kolorek >= 1) {
            gra.li++
            gra.zmienianie = "-"
          }
          if (gra.li >= 4) {
            gra.kolorki = "false"
          }
        }
      }
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
    render();
  }


  pobierz(e) {
    let scene = this.scene
    let camera = this.camera
    let raycaster = this.raycaster
    let wektor = this.wektor
    wektor.x = (e.clientX / $(window).width()) * 2 - 1;
    wektor.y = -(e.clientY / $(window).height()) * 2 + 1;
    raycaster.setFromCamera(wektor, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      var element = intersects[0].object
      var x = element.userData.x
      if (net.player == "player 1" && this.stop == "false" && this.gotowosc.player1 == "true" && this.gotowosc.player2 == "true") {
        if (net.stan == "true") {
          if ((net.ruch == "true" && this.tablica[0][x] == 0 && this.wch == this.obj.y * 50) || (net.ruch == "true" && this.tablica[0][x] == 0 && this.obj.value == "false")) {
            let y
            if (this.tablica[5][x] == 0) {
              this.tablica[5][x] = 1
              y = 5
            } else if (this.tablica[4][x] == 0) {
              this.tablica[4][x] = 1
              y = 4
            } else if (this.tablica[3][x] == 0) {
              this.tablica[3][x] = 1
              y = 3
            } else if (this.tablica[2][x] == 0) {
              this.tablica[2][x] = 1
              y = 2
            } else if (this.tablica[1][x] == 0) {
              this.tablica[1][x] = 1
              y = 1
            } else if (this.tablica[0][x] == 0) {
              this.tablica[0][x] = 1
              y = 0
            }
            net.ruch = "false"
            net.newPlayer = "player 2"
            this.obj.x = x
            this.obj.y = y
            this.pionki(x, y)
            net.porownywanie()
          }
        }
      } else if (net.player == "player 2" && this.stop == "false") {
        if ((net.ruch == "true" && this.tablica[0][x] == 0 && this.wch == this.obj.y * 50) || (net.ruch == "true" && this.tablica[0][x] == 0 && this.obj.value == "false")) {
          let y
          if (this.tablica[5][x] == 0) {
            this.tablica[5][x] = 2
            y = 5
          } else if (this.tablica[4][x] == 0) {
            this.tablica[4][x] = 2
            y = 4
          } else if (this.tablica[3][x] == 0) {
            this.tablica[3][x] = 2
            y = 3
          } else if (this.tablica[2][x] == 0) {
            this.tablica[2][x] = 2
            y = 2
          } else if (this.tablica[1][x] == 0) {
            this.tablica[1][x] = 2
            y = 1
          } else if (this.tablica[0][x] == 0) {
            this.tablica[0][x] = 2
            y = 0
          }
          net.ruch = "false"
          net.newPlayer = "player 1"
          this.obj.x = x
          this.obj.y = y
          this.pionki(x, y)
          net.porownywanie()
        }
      }
    }
  }

  pionki(x, y) {

    let pionek = new THREE.CylinderGeometry(20, 20, 20, 50)
    let material1 = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load("/tex1.jpg"),
      transparent: true,
      opacity: 1,
    });
    let material2 = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load("/tex2.jpg"),
      transparent: true,
      opacity: 1,
    });
    if (this.tablica[y][x] == 1) {
      let kulka = new THREE.Mesh(pionek, material1)
      kulka.userData = { x: x, y: y }
      this.scene.add(kulka)
      kulka.position.set((x * 51), 30, -150)
      this.kulka = kulka
    } else if (this.tablica[y][x] == 2) {
      let kulka2 = new THREE.Mesh(pionek, material2)
      kulka2.userData = { x: x, y: y }
      this.scene.add(kulka2)
      kulka2.position.set((x * 51), 30, -150)
      this.kulka = kulka2
    }
    this.obj.value = "true"
    this.wch = -150
    this.wygranie(x, y)
  }
  wygranie(x, y) {
    let count = 0
    let liczba = this.tablica[y][x]
    let lewo = this.rekurencja(count, "lewo", x, y, liczba)
    let prawo = this.rekurencja(0, "prawo", x, y, liczba)
    let lewoprawo = lewo + prawo + 1
    if (lewoprawo >= 4) {
      let c = 0
      while (this.scene.children[c]) {
        if (this.scene.children[c].geometry.type == "CylinderGeometry") {
          for (let aa = 0; aa < this.tablice.x.length; aa++) {
            if (this.scene.children[c].userData.x == this.tablice.x[aa] && this.scene.children[c].userData.y == this.tablice.y[aa]) {
              this.tablice.kule.push(this.scene.children[c])
            }
          }
        }
        c++
      }
    }
    else {
      this.tablice.x = []
      this.tablice.y = []
    }
    let gora = this.rekurencja(0, "gora", x, y, liczba)
    let dol = this.rekurencja(0, "dol", x, y, liczba)
    let goradol = gora + dol + 1
    if (goradol >= 4) {
      let c = 0
      while (this.scene.children[c]) {
        if (this.scene.children[c].geometry.type == "CylinderGeometry") {
          for (let aa = 0; aa < this.tablice.x.length; aa++) {
            if (this.scene.children[c].userData.x == this.tablice.x[aa] && this.scene.children[c].userData.y == this.tablice.y[aa]) {
              this.tablice.kule.push(this.scene.children[c])
            }
          }
        }
        c++
      }
    }
    else {
      this.tablice.x = []
      this.tablice.y = []
    }
    let prawogora = this.rekurencja(0, "prawogora", x, y, liczba)
    let lewodol = this.rekurencja(0, "lewodol", x, y, liczba)
    let skosprawo = prawogora + lewodol + 1
    if (skosprawo >= 4) {
      let c = 0
      while (this.scene.children[c]) {
        if (this.scene.children[c].geometry.type == "CylinderGeometry") {
          for (let aa = 0; aa < this.tablice.x.length; aa++) {
            if (this.scene.children[c].userData.x == this.tablice.x[aa] && this.scene.children[c].userData.y == this.tablice.y[aa]) {
              this.tablice.kule.push(this.scene.children[c])
            }
          }
        }
        c++
      }
    }
    else {
      this.tablice.x = []
      this.tablice.y = []
    }
    let lewogora = this.rekurencja(0, "lewogora", x, y, liczba)
    let prawodol = this.rekurencja(0, "prawodol", x, y, liczba)
    let skoslewo = lewogora + prawodol + 1
    if (skoslewo >= 4) {
      let c = 0
      while (this.scene.children[c]) {
        if (this.scene.children[c].geometry.type == "CylinderGeometry") {
          for (let aa = 0; aa < this.tablice.x.length; aa++) {
            if (this.scene.children[c].userData.x == this.tablice.x[aa] && this.scene.children[c].userData.y == this.tablice.y[aa]) {
              this.tablice.kule.push(this.scene.children[c])
            }
          }
        }
        c++
      }
    }
    else {
      this.tablice.x = []
      this.tablice.y = []
    }
    if (this.tablice.kule.length >= 3) {
      let c = 0
      while (this.scene.children[c]) {
        if (this.scene.children[c].geometry.type == "CylinderGeometry") {
          if (this.scene.children[c].userData.x == x && this.scene.children[c].userData.y == y) {
            this.tablice.kule.push(this.scene.children[c])
          }
        }
        c++
      }
      this.stop = "true"
      setTimeout(() => { this.wygrana(liczba) }, 1000)
    }

  }
  wygrana(liczba) {
    this.kolorki = "true"
    if (net.player == "player 1" && liczba == 1) {
      this.wygrany = "player 1"
      setTimeout(() => { alert("Wygrałeś: " + net.nick), this.reset() }, 7000)
    }
    if (net.player == "player 1" && liczba == 2) {
      this.wygrany = "player 2"
      setTimeout(() => { alert("Przegrałes: " + net.nick), this.reset() }, 7000)
    }
    if (net.player == "player 2" && liczba == 1) {
      this.wygrany = "player 1"
      setTimeout(() => { alert("Przegrałeś: " + net.nick), this.reset() }, 7000)
    }
    if (net.player == "player 2" && liczba == 2) {
      this.wygrany = "player 2"
      setTimeout(() => { alert("Wygrałeś: " + net.nick), this.reset() }, 7000)
    }
  }
  reset() {
    net.gotowosc()
    $("#root2").css("justify-content", "center")
    $("#root2").css("align-items", "center")
    $("#root4").css("display", "flex")
  }
  rekurencja(count, parametr, x, y, liczba) {
    if (parametr == "lewo") {
      if (this.tablica[y][x - 1] == liczba) {
        this.tablice.x.push(x - 1)
        this.tablice.y.push(y)
        return this.rekurencja(count += 1, parametr, x - 1, y, liczba)
      }
      else {
        return count
      }
    }
    else if (parametr == "prawo") {
      if (this.tablica[y][x + 1] == liczba) {
        this.tablice.x.push(x + 1)
        this.tablice.y.push(y)
        return this.rekurencja(count += 1, parametr, x + 1, y, liczba)
      }
      else {
        return count
      }
    }
    else if (parametr == "gora") {
      if (y - 1 >= 0 && this.tablica[y - 1][x] == liczba) {
        this.tablice.x.push(x)
        this.tablice.y.push(y - 1)
        return this.rekurencja(count += 1, parametr, x, y - 1, liczba)
      }
      else {
        return count
      }
    }
    else if (parametr == "dol") {
      if (y + 1 <= 5 && this.tablica[y + 1][x] == liczba) {
        this.tablice.x.push(x)
        this.tablice.y.push(y + 1)
        return this.rekurencja(count += 1, parametr, x, y + 1, liczba)
      }
      else {
        return count
      }
    }
    else if (parametr == "prawogora") {
      if (y - 1 >= 0 && this.tablica[y - 1][x + 1] == liczba) {
        this.tablice.x.push(x + 1)
        this.tablice.y.push(y - 1)
        return this.rekurencja(count += 1, parametr, x + 1, y - 1, liczba)
      }
      else {
        return count
      }
    }
    else if (parametr == "lewodol") {
      if (y + 1 <= 5 && this.tablica[y + 1][x - 1] == liczba) {
        this.tablice.x.push(x - 1)
        this.tablice.y.push(y + 1)
        return this.rekurencja(count += 1, parametr, x - 1, y + 1, liczba)
      }
      else {
        return count
      }
    }
    else if (parametr == "prawodol") {
      if (y + 1 <= 5 && this.tablica[y + 1][x + 1] == liczba) {
        this.tablice.x.push(x + 1)
        this.tablice.y.push(y + 1)
        return this.rekurencja(count += 1, parametr, x + 1, y + 1, liczba)
      }
      else {
        return count
      }
    }
    else if (parametr == "lewogora") {
      if (y - 1 >= 0 && this.tablica[y - 1][x - 1] == liczba) {
        this.tablice.x.push(x - 1)
        this.tablice.y.push(y - 1)
        return this.rekurencja(count += 1, parametr, x - 1, y - 1, liczba)
      }
      else {
        return count
      }
    }
  }
}
