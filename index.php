<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="vendor/bootstrapv3/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="vendor/bootstrapv3/css/bootstrap-theme.css">
	<link rel="stylesheet" type="text/css" href="vendor/bootstrapv3/css/grid.css">

	<link rel="stylesheet" href="vendor/alertify.js-0.3.11/themes/alertify.core.css" />
	<link rel="stylesheet" href="vendor/alertify.js-0.3.11/themes/alertify.default.css" id="toggleCSS" />

	<link rel="stylesheet" type="text/css" href="css/bibleStyle.css">
</head>
<body>

	<div class="container">
		<div class="row">
			<!-- Left Side -->
			<div class="col-md-5" id="left-side">
				<div role="tab-panel">
					<!-- Tab List -->
					<ul class="nav nav-tabs" role="tab-list">
						<li role="presentation" class="active">
							<a href="#old" aria-controls="old" role="tab" data-toggle="tab">Old Testament</a>
						</li>
						<li role="presentation">
							<a href="#new" aria-controls="new" role="tab" data-toggle="tab">New Testament</a>
						</li>
					</ul>

					<!-- Content Of Tab -->
					<div class="tab-content">
						<div role="tab-panel" class="tab-pane fade in active" id="old">
							<!-- Old Testament table will be load by ajax -->
						</div>
						<div role="tab-panel" class="tab-pane fade" id="new">
							<!-- New Testament table will be load by ajax -->
						</div>
					</div>
				</div>
			</div>

			<!-- Right Side -->
			<div class="col-md-7" id="main-content">				
				<div id="read-content">
					<div id="jumpTo">
						<small>Jump to: </small>
						<select id="chapter"></select>
						<select id="verse"></select>
					</div>
					<h3 id="book-name"></h3>
					<p id="verse-text" class="well"></p>
					<nav>
						<ul class="pager">
							<li class="previous">
								<a href="#previous" id="prev"><span aria-hidden="true">&larr;</span> Previous</a>
							</li>
							<li class="next">
								<a href="#next" id="next">Next <span aria-hidden="true">&rarr;</span></a>
							</li>
						</ul>
					</nav>
				</div>

				<div id="info-content"></div>

				<div id="watch-content">
					<h3></h3>
					<div class="embed-responsive embed-responsive-4by3"></div>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="vendor/bootstrapv3/js/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="vendor/bootstrapv3/js/bootstrap.js"></script>

	<script type="text/javascript" src="vendor/alertify.js-0.3.11/lib/alertify.min.js"></script>

	<script type="text/javascript" src="js/loader.js"></script>
</body>
</html>