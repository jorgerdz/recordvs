'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http', '$location',
	function($scope, Authentication, $http, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.step = 'fill';

		$scope.connect = function(){
			$scope.step = 'loading';
			$http.post('/users/bindlastfm', { lastfm : $scope.lastfm }).
				success(function(data){
					$scope.step = 'success';
					$location.path('/rate');
				}).
				error(function(data){
					$scope.step = 'error';
				});
		};

		var exampleRecords = [
			{
				title : "Illinois",
				artist : "Sufjan Stevens",
				url : "/modules/core/img/records/illinois.jpg",
				style : {
					color1: {'background-color': 'rgb(64,112,131)'},
				    color2: {'color': 'rgb(250,196,76)'},
				    color3: {'color': 'rgb(243,130,51)'}
				}
			},
			{
				title : "Kill the Moonlight",
				artist : "Spoon",
				url : "/modules/core/img/records/spoon.jpg",
				style : {
					color1: {'background-color': 'rgb(195,181,127)'},
				    color2: {'color': 'rgb(15,7,3)'},
				    color3: {'color': 'rgb(50,23,11)'}
				}
			},
			{
				title : "Kid A",
				artist : "Radiohead",
				url : "/modules/core/img/records/kid_a.png",
				style : {
					color1: {'background-color': 'rgb(192,189,193)'},
				    color2: {'color': 'rgb(21,20,26)'},
				    color3: {'color': 'rgb(28,26,33)'}
				}
			},
			{
				title : "No Other",
				artist : "Gene Clark",
				url : "/modules/core/img/records/no_other.jpeg",
				style : {
					color1: {'background-color': 'rgb(60,55,56)'},
				    color2: {'color': 'rgb(209,167,138)'},
				    color3: {'color': 'rgb(187,143,119)'}
				}
			},
			{
				title : "Sound of Silver",
				artist : "LCD Soundsystem",
				url : "/modules/core/img/records/silver.jpg",
				style : {
					color1: {'background-color': 'rgb(251,251,250)'},
				    color2: {'color': 'rgb(7,9,8)'},
				    color3: {'color': 'rgb(73,74,63)'}
				}
			},
			{
				title : "Veckatimest",
				artist : "Grizzly Bear",
				url : "/modules/core/img/records/veckatimest.jpg",
				style : {
					color1: {'background-color': 'rgb(196,192,137)'},
				    color2: {'color': 'rgb(27,20,21)'},
				    color3: {'color': 'rgb(35,25,25)'}
				}
			}
		];

		$scope.record1 = exampleRecords[0];
		$scope.record2 = exampleRecords[1];

		$scope.vote = function(number){
			do{
				$scope.record1 = exampleRecords[Math.floor((Math.random() * 5))];
				$scope.record2 = exampleRecords[Math.floor((Math.random() * 5))];
			}while($scope.record2 == $scope.record1)
			setFalse();
		}

		$scope.enter = function(){
			$scope.entering = true;
		}

		function setFalse(){
			$scope.entering = false;
		}

		$scope.noAccount = function(){
			$scope.lastfm = null;
			$scope.connect();
		};


	}
]);