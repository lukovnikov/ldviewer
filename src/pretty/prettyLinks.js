
angular.module('ldv.pretty.links', [])
.directive('prettyLinks', function() {
	return {
		restrict:	"EA",
		transclude:	false,
		replace:	true,
		scope:		{
						links:	"="
					},
		template:	'<div id="dbpvplinks">			<div ng-repeat="(label, list) in links" style="float:left;margin-right: 15px;">				<div ng-show="list.length>1" >					<a role="button" href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">{{label}} <span class="glyphicon glyphicon-chevron-down" style="font-size:0.6em;"></span></a>					<ul class="dropdown-menu">						<li ng-repeat="link in list"><a target="_blank" href="{{link.uri}}">{{link.plex}}</a></li>									</ul>				</div>				<div ng-show="list.length==1">					<a target="_blank" href="{{list[0].uri}}">{{list[0].plex}}</a>				</div>			</div>		</div>'
	};
});