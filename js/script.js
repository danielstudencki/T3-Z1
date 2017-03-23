(function() {

    if(!navigator.geolocation) return;

    var figure = document.querySelector(".field");
    var linkField = document.querySelector(".link");
    var figcaption = document.querySelector(".field figcaption")
    var getPositionButton = document.querySelector("#get-position-button");

    getPositionButton.onclick = function(e){
        e.preventDefault();
        userPosition.getPosition();
        figcaption.innerHTML = "";
    };


    var userPosition = {

        getPosition: function() {
            navigator.geolocation.getCurrentPosition(this.succ.bind(this), this.err.bind(this), { eneableHighAccuracy: true, timeOut: 5000 });
        },

        succ: function(data) {
            this.generateLink(data);
        },

        err: function(errObj) {
            
            var msg;
            this.setLinkFieldColor("error");

            switch(errObj.code) {
                case errObj.PERMISSION_DENIED :
                    msg = "Brak dostępu";
                    break;
                case errObj.POSITION_UNAVAILABLE :
                    msg = "Brak dostępu do sieci";
                    break;
                case errObj.TIMEOUT :
                    msg = "Przekroczono limit oczekiwania";
                    break;
            }

            linkField.innerHTML = msg;
        },

        generateLink: function(data) {
            var link = "http://bing.com/maps/default.aspx?cp=" + data.coords.latitude +"~"+ data.coords.longitude;
            linkField.setAttribute("href", link);
            linkField.setAttribute("target", "_blank");
            linkField.innerHTML = link;
            this.setLinkFieldColor("success");
        },

        setLinkFieldColor: function(color) {
            if(color === "success") {
                figure.style.backgroundColor = "#ecf2f9";
                figure.style.transition = "background-color 0.9s";
            } else {
                figure.style.backgroundColor = "#ffcccc";
                figure.style.transition = "background-color 0.9s";
            }
        }

    };

})();