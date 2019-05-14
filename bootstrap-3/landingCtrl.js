angular.module('bootstrap-3-demo')
.controller('landingCtrl', [
	'$scope', '$q', '$timeout', 'dataService',
	function ($scope, $q, $timeout, dataService) {
		/* private */
	    var scrollReveal = {};
	    var scrollBoxSettings = {};
	    var scrollBoxDelay = 0;
        var data = dataService.getData();

	    /* public */
	    $scope.carousel = data.carousel;
	    $scope.aboutMe = data.aboutMe;
	    $scope.works = data.works;
	    $scope.hobbies = data.hobbies;
	    $scope.footer = data.footer;
		$timeout(initialize);

		/* private */
		function initialize () {
			preloadBackground().then(function () {
				angular.element('.landing-page').addClass('loaded');
                angular.element('.carousel').carousel({ interval: 5000 });
				$timeout(setupScrollBox);
			});
		}

		function preloadBackground (successCallback) {
			var deferred = $q.defer();
			angular.element('<img src="res/pictures/works.jpg">').on('load', deferred.resolve);
			return deferred.promise;
		}

		function setupScrollBox () {
	    	scrollReveal = ScrollReveal();
	    	scrollBoxSettings = { duration: 360 };
	    	scrollBoxDelay = 120;

		    scrollReveal.reveal('.scroll-reveal');
		    scrollReveal.reveal('.scroll-reveal-work', scrollBoxSettings, scrollBoxDelay);
		    scrollReveal.reveal('.scroll-reveal-hobby', scrollBoxSettings, scrollBoxDelay);
		}

	}
]);