angular.module('bootstrap-3-demo')

.directive('thumbnailsSection', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/thumbnailsSection/thumbnailsSection.tpl.html',
        scope: {
		    section: '='
        }
	};
});