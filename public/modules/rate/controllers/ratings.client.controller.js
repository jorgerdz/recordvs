'use strict';

angular.module('rating').controller('RatingsController', ['$scope', '$stateParams', '$location', 'Authentication', '$http', 'hotkeys',
	function($scope, $stateParams, $location, Authentication, $http, hotkeys) {
		$scope.authentication = Authentication;

		function loadRecords(album1, album2){
			$scope.entering = true;
			$scope.album1 = album1;
			$scope.album2 = album2;
		};

		function nextTwo(){
			$http.get("/albums/getTwo").success(function(data){
				$scope.nextAlbum1 = data.album1;
				$scope.nextAlbum2 = data.album2;
				if($scope.nextAlbum1.image == 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png')
					$scope.nextAlbum1.image = 'http://cyurap.com/img/no-image.jpg';
				if($scope.nextAlbum2.image == 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png')
					$scope.nextAlbum2.image = 'http://cyurap.com/img/no-image.jpg';
				var albumColors1 = new AlbumColors('/proxy?url='+$scope.nextAlbum1.image);
				albumColors1.getColors(function(colors) {
				    $scope.album1color1Style = {'background-color': 'rgb('+colors[0]+')'};
				    $scope.album1color2Style ={'color': 'rgb('+colors[1]+')'};
				    $scope.album1color3Style ={'color': 'rgb('+colors[2]+')'};
				});
				var albumColors2 = new AlbumColors('/proxy?url='+$scope.nextAlbum2.image);
				albumColors2.getColors(function(colors) {
				    $scope.album2color1Style = {'background-color': 'rgb('+colors[0]+')'};
				    $scope.album2color2Style ={'color': 'rgb('+colors[1]+')'};
				    $scope.album2color3Style ={'color': 'rgb('+colors[2]+')'};
				});
			});
			
		}

		$scope.initialize = function(){
			$http.get("/albums/getTwo").success(function(data){
				if(data.album1.image == 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png')
					data.album1.image = 'http://cyurap.com/img/no-image.jpg';
				if(data.album2.image == 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png')
					data.album2.image = 'http://cyurap.com/img/no-image.jpg';
				loadRecords(data.album1, data.album2);
				nextTwo();
			});
		};

		$scope.vote = function(number){
			$scope.entering = false;
			$http.post("/albums/vote", {
				album1 : $scope.album1,
				album2 : $scope.album2,
				vote : number
			}).success(function(data){
				$scope.entering = true;
				loadRecords($scope.nextAlbum1, $scope.nextAlbum2);
				nextTwo();
			});
		};

		$scope.getUser = function(){
			if($location.$$path == '/charts') $location.path('/'+$scope.authentication.user.username);
			$http.get('/charts/'+$stateParams.user).success(function(data){
				$scope.top500 = data.top500;
				$scope.top500.sort(compare);
				$scope.shownAlbums = [];
				for(var i=0; i<5; i++){
					$scope.shownAlbums.push($scope.top500[i]);
				}
			}).error(function(data){
				$scope.error = true;
			});
		};

		$scope.paging = function(){
			if($scope.shownAlbums){
				var length =  $scope.shownAlbums.length;
				for(var i=length;i<length+5;i++){
					if($scope.top500[i]) $scope.shownAlbums.push($scope.top500[i]);
				}
			}
		};

		function compare(a,b) {
		  if (a.index > b.index)
		     return -1;
		  if (a.index < b.index)
		    return 1;
		  return 0;
		}

		$scope.getTopUsers = function(){
			$http.get('/top/').success(function(data){
				$scope.topUsers = data;
			}).error(function(data){
				$scope.error = true;
			});
		};

		hotkeys.add({
		    combo: 'left',
		    description: 'vote left',
		    callback: function(){
		    	$scope.vote(1)
		    }
		    });

		hotkeys.add({
		    combo: 'right',
		    description: 'vote right',
		    callback: function(){
		    	$scope.vote(2)
		    }
		    });
	}
]);