$(document).ready( function () {
	initialLoad();

	function initialLoad() {
		var	top = '<table class="table table-striped table-hover table-bordered">\
						<thead>\
							<tr>\
								<th>Books</th>\
								<th colspan="3" class="text-center">Actions</th>\
							</tr>\
						</thead>\
						<tbody>';

		var bottom =   '</tbody>\
					</table>';
		$.ajax({
			url: "getterValue.php",
			data: {initialLoadPage: true},
			dataType: "JSON",
			method: "GET",

			success: function (r) {
				var str = top;

				for (i = 0; i < 39; i++) {
					str += "<tr>";
					str += 		"<td>";
					str += 		r[i].book_name;
					str += 		"</td>";
					str += 		"<td>"
					str += 			"<button class='read btn btn-primary col-xs-12' data-id="+r[i].id+">Read <span class='glyphicon glyphicon-'></span></button>";
					str += 		"</td>";
					str += 		"<td>"
					str += 			"<button class='info btn btn-info col-xs-12' data-id="+r[i].id+">Info</button>";
					str += 		"</td>";
					str += 		"<td>"
					str += 			"<button class='watch btn btn-success col-xs-12' data-id="+r[i].id+">Watch</button>";
					str += 		"</td>";
					str += "</tr>";
				}
				str += bottom;
				$("#old").html(str);

				str = top;
				for (i = 40-1; i < 66; i++) {
					str += "<tr>";
					str += 		"<td>";
					str += 		r[i].book_name;
					str += 		"</td>";
					str += 		"<td>"
					str += 			"<button class='read btn btn-primary col-xs-12' data-id="+r[i].id+">Read <span class='glyphicon glyphicon-'></span></button>";
					str += 		"</td>";
					str += 		"<td>"
					str += 			"<button class='info btn btn-info col-xs-12' data-id="+r[i].id+">Info</button>";
					str += 		"</td>";
					str += 		"<td>"
					str += 			"<button class='watch btn btn-success col-xs-12' data-id="+r[i].id+">Watch</button>";
					str += 		"</td>";
					str += "</tr>";
				}
				str += bottom;
				$("#new").html(str);


				// Event Listener

				/**
				* 	Scope of Read Button
				*/
				var book_id;
				$(".read").click( function () {
					$(":disabled").removeAttr("disabled", true);
					$(this).attr("disabled", true);

					book_id = $(this).data('id');

					$("#info-content, #watch-content").slideUp(500);
					$("#read-content").slideUp(500, function () {
						$("#book-name, #verse-text").hide();

						$.ajax({
							url: "getterValue.php",
							data: {
								book_id: book_id,
								readEvent: true
							},
							dataType: "JSON",
							method: "GET",

							success: function (r) {
								var chapters = '<option>Chapter</option>';
								var verses   = '<option>Verse</option>';

								for ( chapter = 1; chapter <= r.max_chapter; chapter++ ) {
									chapters += "<option>"+chapter+"</option>";
								}

								for ( verse = 1; verse <= r.max_verse; verse++ ) {
									verses += "<option>"+verse+"</option>";
								}

								$("#chapter").html(chapters);
								$("#verse").html(verses);
								$("#book-name").html(r.book_name);
								$("#verse-text").html(r.verse_text);

								$("#read-content").fadeIn(500, function () {
									$("#book-name").slideDown(500);
									$("#verse-text").slideDown(1000);
								});
							},

							error: function () {
								alert("Read error: !. Please contact the developer to fix this.");
							}
						});

					});					
				});
				// OnChange Chapter And Verse Listener
				$("#chapter").change( function () {
					$.ajax({
						url: 'getterValue.php',
						data: {
							book_id: book_id,
							chapter: $(this).val(),
							chapterChangeEvent: true
						},
						dataType: "JSON",
						method: 'GET',
						
						success: function (r) {
							var verses = "<option>Verse</option>";
							for ( verse = 1; verse <= r.max_verse; verse++ ) {
								verses += "<option>"+verse+"</option>";
							}

							$("#verse").html(verses);
							$("#verse").val(1);
						}
					});
					displayVerseText(book_id, $(this).val(), 1);
				});

				$("#verse").change( function () {
					var chapter;
					if ( $("#chapter").val() == "Chapter" ) {
						chapter = 1;
						$("#chapter").val(1);
					} else {
						chapter = $("#chapter").val();
					}

					displayVerseText(book_id, chapter, $(this).val());
				});
				// Previous Next Listener
				$("#prev").click( function () {
					chapter = $("#chapter").val() == "Chapter" ? 1 : $("#chapter").val();
					verse   = $("#verse").val()   == "Verse"   ? 1 : parseInt($("#verse").val());

					verse--;
					if ( verse == 0 ) {
						alertify.error("Alert! No more verse.");
						return;
					}
					$("#chapter").val(chapter);
					$("#verse").val(verse);
					displayVerseText(book_id, chapter, verse);

					console.log(book_id + " " + chapter + " " + verse);
				});
				$("#next").click( function () {
					chapter = $("#chapter").val() == "Chapter" ? 1 : $("#chapter").val();
					verse   = $("#verse").val()   == "Verse"   ? 1 : parseInt($("#verse").val());

					verse++;
					$.ajax({
						url: "getterValue.php",
						data: {
							book_id: book_id,
							chapter: chapter,
							verse: verse,
							event: "nextBtnPress"
						},
						method: "GET",

						success: function (max_verse) {
							if ( verse > max_verse ) {
								alertify.error("Alert! No more verse.");
								return;
							}
							$("#chapter").val(chapter);
							$("#verse").val(verse);

							displayVerseText(book_id, chapter, verse);
							console.log(book_id + " " + chapter + " " + verse);
						}
					});
				});
				
				/**
				* 	Scope of Info Button
				*/
				$(".info").click( function () {
					$(":disabled").removeAttr("disabled", true);
					$(this).attr("disabled", true);

					var book_id = $(this).data('id');

					$("#read-content, #watch-content").slideUp(500);
					$("#info-content").slideUp(500, function () {
						$.ajax({
							url: "getterValue.php",
							data: {
								book_id: book_id,
								infoEvent: true
							},
							dataType: "JSON",
							method: "GET",

							success: function (r) {
								var str = '<h3>'+r.book_name+'</h3>\
											<p class="well">'+r.book_info+'</p>';
								$("#info-content").html(str);
								$("#info-content").fadeIn(800);

							},

							error: function () {
								alert("Info error: !. Please contact the developer to fix this.");
							}
						});
					});
				});

				$(".watch").click( function () {
					$(":disabled").removeAttr("disabled", true);
					$(this).attr("disabled", true);
					
					var book_id = $(this).data('id');

					$("#read-content, #info-content").slideUp(500);
					$("#watch-content").slideUp(500, function () {
						$.ajax({
							url: "getterValue.php",
							data: {
								book_id: book_id,
								watchEvent: true
							},
							dataType: "JSON",
							method: "GET",

							success: function (r) {
								console.log(r.book_name);
								$("#watch-content > h3").html(r.book_name);
								$("#watch-content div").html('<iframe class="embed-responsive-item" src="'+r.book_url+'"></iframe>')
								$("#watch-content").slideDown(500);
							},

							error: function () {
								alert("Watch error: !. Please contact the developer to fix this.");
							}
						});
					});
				});
			}
		});
	}

	function displayVerseText(book_id, chapter, verse) {
		$.ajax({
			url: 'getterValue.php',
			data: {
				book_id: book_id,
				chapter: chapter,
				verse  : verse,
				event: "displayVerseText"
			},
			method: 'GET',

			success: function (verse_text) {
				$("#verse-text").html((verse_text !== false) ? verse_text : "No word or phrase found!");
			},

			error: function () {
				alert("Error Display Verse Text: !. Please contact the developer to fix this.");
			}
		});
	}
});