///<reference path='mediadata.ts' />
///<reference path='media.ts' />
///<reference path='stage.ts' />
///<reference path='properties.ts' />
var Medias;
(function (Medias) {
    var medias = [];

    function getActiveMedia() {
        for (var i = 0; i < medias.length; i++) {
            if (medias[i].isActive())
                return medias[i];
        }
    }
    Medias.getActiveMedia = getActiveMedia;

    function deactivateAllMediasExceptMe(me) {
        for (var i = 0; i < medias.length; i++) {
            if (medias[i].id == me.id)
                continue;
            medias[i].deactivate();
        }
    }
    Medias.deactivateAllMediasExceptMe = deactivateAllMediasExceptMe;

    function removeActiveMedia() {
        for (var i = 0; i < medias.length; i++) {
            if (medias[i].isActive()) {
                medias[i].delete();
                medias.splice(i, 1);
                return;
            }
        }
    }
    Medias.removeActiveMedia = removeActiveMedia;

    function createNewMedia(top, left, mediaData) {
        /*
        
        var active = getActiveBasket();
        if (active) {
        LinkedBaskets.deactivateactiveLink();
        active.deactivate();
        
        Properties.removeActiveComponent();
        return;
        }
        var basketData = new basketdata(e.pageY - $stage.offset().top, e.pageX - $stage.offset().left);
        
        
        
        fixOverflowBaskets(basketData);
        basketData.color = Properties.color;
        createNewBasket(basketData);
        */
        if (typeof mediaData === "undefined") { mediaData = new mediadata(top, left); }
        //fixOverflowMedias(mediaData);
        //mediaData.color = mediaProperties.color;
        Stage.fixComponentOverflow(mediaData);
        var newMedia = new media(mediaData);

        //newMedia.on('active', function (e, activatedMedia) {
        // Medias.deactivateAllMediasExceptMe(activatedMedia);
        // Properties.setActiveComponent(activatedMedia);
        //});
        //if (mediaData.realTimeCreation)
        // Properties.setActiveComponent(newMedia);
        newMedia.on('active', Stage.componentActivatedHandler);
        medias.push(newMedia);

        return newMedia;
    }
    Medias.createNewMedia = createNewMedia;

    function getMedias() {
        return medias;
    }
    Medias.getMedias = getMedias;
})(Medias || (Medias = {}));
