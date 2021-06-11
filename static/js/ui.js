class Ui {
    constructor() {
        this.pobieranie()
        this.usuwanie()
        this.wejscie()
        this.reset()
        this.function()
    }

    pobieranie() {
        $("#root").on("click", function (e) {
            gra.pobierz(e)
        })
    }
    usuwanie(){
        $("#reset").on("click", function () {
            net.usuwanie()
        })
    }
    wejscie(){
        $("#zaloguj").on("click", function () {
            net.ajax(net)
        })
    }
    reset(){
        $("#zagraj").on("click", function () {
            net.odnowa()

        })
    }
    function(){
        $("#root").contextmenu(function(e) {
            e.preventDefault();
        });
    }
}