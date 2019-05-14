angular.module('bootstrap-3-demo')

.directive('header', [function() {
	return {
		restrict: 'E',
		controller: 'headerCtrl',
		templateUrl: 'components/header/header.tpl.html'
	};
}])

.controller('headerCtrl', [
    '$scope', '$timeout',
    function($scope, $timeout) {
        $scope.header = {
            goToTopLabel: 'Website Title',
            links: [{
                label: 'About me',
                url: '#aboutMe'
            }, {
                label: 'Works',
                url: '#works'
            }, {
                label: 'Hobbies',
                url: '#hobbies'
            }, {
                label: 'Contact',
                url: '#contact'
            }]
        };

        $timeout(bindBootstrap);
    }
]);

function bindBootstrap () {
    var header = angular.element('header > nav');
    header.affix({
        offset: {
            top: header.attr('data-offset-top')
        }
    });

    ScrollingNav.initializeScrollingNav();
}