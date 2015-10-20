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
				<div class="panel panel-default" id="bible-info" >
					<div class="panel-heading">
						<h3 class="panel-title">Bible (KJV)</h3>
					</div>
					<div class="panel-body">
						<a href="#" class="thumbnail" data-toggle="tooltip" data-placement="left" data-title="Bible" >
							<img src="img/bible.jpg" id="bible-image" alt="bible" />
						</a>
						<div class="table-responsive" id="div-book">
							<table class="table table-condensed table-striped table-bordered">
								<thead>
									<tr>
										<th>Books</th>
										<th>Author</th>
										<th>When was written</th>
										<th>Where was written</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Genesis</td>
										<td>Moses</td>
										<td>1513 BC</td>
										<td>Wilderness Of Sinai</td>
									</tr>
									<tr>
										<td>Exodus</td>
										<td>Moses</td>
										<td>1512 BC</td>
										<td>Wilderness Of Sinai</td>
									</tr>
									<tr>
										<td>Leviticus</td>
										<td>Moses</td>
										<td>1512 BC</td>
										<td>Wilderness Of Sinai</td>
									</tr>
									<tr>
										<td>Numbers</td>
										<td>Moses</td>
										<td>1473 BC</td>
										<td>Wilderness Of Sinai</td>
									</tr>
									<tr>
										<td>Deuteronomy</td>
										<td>Moses</td>
										<td>1473 BC</td>
										<td>Wilderness Of Sinai</td>
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<td colspan="4">
											<a href="#view-more" class="btn btn-sm btn-default pull-right" data-toggle="modal">View More</a>
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				</div>
				<br /><br />
				<div id="read-content" hidden>
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
					<div class="embed-responsive embed-responsive-16by9"></div>
				</div>
			</div>

			<div class="modal fade" id="view-more" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-body">
							<div role="tab-panel">
								<ul class="nav nav-tabs" role="tab-list">
									<li role="presentation" class="active">
										<a href="#old-books-info" arial-controls="old-books-info" role="tab" data-toggle="tab">Old Testament</a>
									</li>
									<li role="presentation">
										<a href="#new-books-info" arial-controls="new-books-info" role="tab" data-toggle="tab">New Testament</a>
									</li>
								</ul>

								<!-- Content Of Tab -->
								<div class="tab-content">
									<div role="tab-panel" class="tab-pane fade in active" id="old-books-info">
										<!-- Old Testament table will be load -->
									</div>
									<div role="tab-panel" class="tab-pane fade" id="new-books-info">
										<!-- New Testament table will be load -->
									</div>
								</div>
							</div>
						</div>
					</div>
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