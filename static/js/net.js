let wait
let nick
let spraw
class Net {
  constructor() {
    this.player
    this.stan
    this.ruch = "true"
    this.newPlayer
    this.spraw
    this.nick 
  }
  ajax(e) {
    nick = $("#login").val()
    this.nick = nick
    $.ajax({
      url: "/",
      data: { nick: nick, action: "dodaj" },
      type: "POST",
      success: function (data) {
        e.player = data
        switch (data) {
          case "player 1":
            $("#form").css("display", "none")
            $("h1").text("Gracz: ")
            $("#player").css("display", "flex")
            $("#player").css("height", "60px")
            $("#player").text(data + ":" + nick)
            wait = setInterval(function () {
              e.check(e)
            }, 1000)
            spraw = setInterval(function () { e.sprawdzanie(e) }, 300);
            break;
          case "player 2":
            net.ruch = "false"
            spraw = setInterval(function () { e.sprawdzanie(e) }, 300);
            $("#form").css("display", "none")
            $("h1").text("Gracz: ")
            $("#player").css("display", "flex")
            $("#player").css("height", "60px")
            $("#player").text(data + ":" + nick)
            break;
          case "brak miejsc":
            $("#player").css("display", "flex")
            $("#player").text(data)
            break;
          case "zajety":
            $("#player").css("display", "flex")
            $("#player").text(data + " wybierz inny nick")
          default:

        }
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    });
  }

  usuwanie() {

    $.ajax({
      url: "/",
      data: { action: "usun" },
      type: "POST",
      success: function (data) {
        if (data == "jest ok") {
          location.reload()
        }
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })

  }

  check(e) {
    $.ajax({
      url: "/",
      data: { action: "check" },
      type: "POST",
      success: function (data) {
        if (data == "true") {
          net.stan = data
          $("#player").html(e.player + ":" + nick + "<br> gracz 2 dołączył")
          clearInterval(wait)
        }

      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })
  }

  porownywanie() {
    $.ajax({
      url: "/",
      data: { action: "przesylanie", ruch: net.newPlayer, data: JSON.stringify(gra.tablica), obj: JSON.stringify(gra.obj) },
      type: "POST",
      success: function (data) {
        //console.log("zmiana")
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })
  }
  sprawdzanie(e) {
    clearInterval(spraw)
    $.ajax({
      url: "/",
      data: { action: "sprawdzanie", data: JSON.stringify(gra.tablica) },
      type: "POST",
      success: function (data) {
        let object = JSON.parse(data)
        let object2 = JSON.parse(object.obj)
        if (net.player == "player 1") {
          net.ruch = object.player1
        }
        else if (net.player == "player 2") {
          net.ruch = object.player2
        }
        gra.gotowosc = object.reset
        if (object.inny == "true") {
          gra.tablica = object.tab
          gra.obj = object2
          gra.pionki(object2.x, object2.y)
        }
        spraw = setInterval(function () {  e.sprawdzanie(e) }, 300);
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })
  }
  gotowosc() {
    clearInterval(spraw)
    $.ajax({
      url: "/",
      data: { action: "gotowosc" },
      type: "POST",
      success: function (data) {
        console.log("zmiana")
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })
  }
  odnowa() {
    clearInterval(spraw)
    gra.tablica = [[0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]]
    gra.obj = { x: 0, y: 0, value: "false" }
    gra.tablice = { x: [], y: [], kule: [] }
    gra.kulka = ""
    gra.wch = -120
    gra.kolorek = 1
    gra.zmienianie = "-"
    gra.kolorki = "false"
    gra.li = 0
    gra.stop = "false"
    gra.gotowosc = { player1: "false", player2: "false" }
    var c = 0;
    while (gra.scene.children[c]) {
      if (gra.scene.children[c].geometry.type == "CylinderGeometry") {
        gra.scene.remove(gra.scene.children[c])
      }
      else {
        c++;
      }
    }
    $.ajax({
      url: "/",
      data: { action: "reset", data: net.player,wygrany: gra.wygrany },
      type: "POST",
      success: function (data) {
        $("#root2").css("justify-content", "flex-start")
        $("#root2").css("align-items", "flex-start")
        $("#root4").css("display", "none")
        spraw = setInterval(function () { net.sprawdzanie(net) }, 300);
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })
    gra.wygrany = ""
  }
}
