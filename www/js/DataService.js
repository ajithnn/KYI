angular.module('starter.services', [])

.service('socketService', ['$rootScope',
    function($rootScope) {
        this.socket;
        this.server = "http://infinite-dusk-7803.herokuapp.com";
        this.Id;
        this.ImgSrc = "";
        this.openSocket = function() {
            this.socket = io(this.server);
            var that = this;
            this.socket.on('connect', function() {
                that.Id = that.socket.io.engine.id;
            });
        }
        this.setupSocketEvents = function() {
            var that = this;
            this.socket.on('ImageModified', function(data) {
                that.ImgSrc = that.server + data;
                $rootScope.$broadcast("ImageMod", that.server + data);
            });
            this.socket.on('Error', function(data) {
                $rootScope.$broadcast("Error",data);
            });
        }
    }
]);