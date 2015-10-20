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

				$(".read, .info, .watch").click( function () {
					$("#bible-info").fadeOut();
				});
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
								console.log(r.book_url);
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


		/**
		* 	Load the content of Modal
		*/

		// books_all_info means the book, author, date, place
		var books_all_info =
				'<div class="table-responsive">\
					<table class="table table-condensed table-striped table-bordered">\
						<thead>\
							<tr>\
								<th>Books</th>\
								<th>Author</th>\
								<th>Date</th>\
								<th>Place</th>\
							</tr>\
						</thead>\
						<tbody>';
		var old_books_info= '<tr>\
								<td>Genesis</td>\
								<td>Moses</td>\
								<td>1513 BC</td>\
								<td>Wilderness Of Sinai</td>\
							</tr>\
							<tr>\
								<td>Exodus</td>\
								<td>Moses</td>\
								<td>1512 BC</td>\
								<td>Wilderness Of Sinai</td>\
							</tr>\
							<tr>\
								<td>Leviticus</td>\
								<td>Moses</td>\
								<td>1512 BC</td>\
								<td>Wilderness Of Sinai</td>\
							</tr>\
							<tr>\
								<td>Numbers</td>\
								<td>Moses</td>\
								<td>1473 BC</td>\
								<td>Wilderness Of Sinai</td>\
							</tr>\
							<tr>\
								<td>Deuteronomy</td>\
								<td>Moses</td>\
								<td>1473 BC</td>\
								<td>Plains of Moab</td>\
							</tr>\
							<tr>\
								<td>Joshua</td>\
								<td>Joshua</td>\
								<td>1450 BC</td>\
								<td>Land of Canaan</td>\
							</tr>\
							<tr>\
								<td>Judges</td>\
								<td>Samuel</td>\
								<td>1100 BC</td>\
								<td>Israel</td>\
							</tr>\
							<tr>\
								<td>Ruth</td>\
								<td>Samuel</td>\
								<td>1090 BC</td>\
								<td>Israel</td>\
							</tr>\
							<tr>\
								<td>I Samuel</td>\
								<td>Samuel, Gad, Nathan</td>\
								<td>1077 BC</td>\
								<td>Israel</td>\
							</tr>\
							<tr>\
								<td>II Samuel</td>\
								<td>Gad, Nathan</td>\
								<td>1040 BC</td>\
								<td>Israel</td>\
							</tr>\
							<tr>\
								<td>I Kings</td>\
								<td>Jeremiah</td>\
								<td>580 BC</td>\
								<td>Jerusalem</td>\
							</tr>\
							<tr>\
								<td>II Kings</td>\
								<td>Jeremiah</td>\
								<td>580 BC</td>\
								<td>Jerusalem and Egypt</td>\
							</tr>\
							<tr>\
								<td>I Chronicles</td>\
								<td>Ezra</td>\
								<td>460 BC</td>\
								<td>Jerusalem</td>\
							</tr>\
							<tr>\
								<td>II Chronicles</td>\
								<td>Ezra</td>\
								<td>160 BC</td>\
								<td>Jerusalem</td>\
							</tr>\
							<tr>\
								<td>Ezra</td>\
								<td>Ezra</td>\
								<td>160 BC</td>\
								<td>Jerusalem</td>\
							</tr>\
							<tr>\
								<td>Nehemiah</td>\
								<td>Nehemiah</td>\
								<td>433 BC</td>\
								<td>Jerusalem</td>\
							</tr>\
							<tr>\
								<td>Esther</td>\
								<td>Mordecai</td>\
								<td>474 BC</td>\
								<td>Elam, Shushan</td>\
							</tr>\
							<tr>\
								<td>Job</td>\
								<td>Moses</td>\
								<td>1473 BC</td>\
								<td>Wilderness Of Sinai</td>\
							</tr>\
							<tr>\
								<td>Psalms</td>\
								<td>David, Moses, Heman, Ethan</td>\
								<td>760 BC</td>\
								<td></td>\
							</tr>\
							<tr>\
								<td>Proverbs</td>\
								<td>Solomon, Agur, Lemuel</td>\
								<td>716 BC</td>\
								<td></td>\
							</tr>\
							<tr>\
								<td>Ecclesiastes</td>\
								<td>Solomon</td>\
								<td>1000 BC</td>\
								<td></td>\
							</tr>\
							<tr>\
								<td>Songs of Solomon</td>\
								<td>Solomon</td>\
								<td>1020 BC</td>\
								<td>Jerusalem</td>\
							</tr>\
							<tr>\
								<td>Isaiah</td>\
								<td>Isaiah</td>\
								<td>732 BC</td>\
								<td>Jerusalem</td>\
							</tr>\
							<tr>\
								<td>Jeremiah</td>\
								<td>Jeremiah</td>\
								<td>580 BC</td>\
								<td>Judah, Jerusalem, Egypt</td>\
							</tr>\
							<tr>\
								<td>Lamentation</td>\
								<td>Jeremiah</td>\
								<td>607 BC</td>\
								<td>Near Jerusalem</td>\
							</tr>\
							<tr>\
								<td>Ezekiel</td>\
								<td>Ezekiel</td>\
								<td>591 BC</td>\
								<td>Babylon</td>\
							</tr>\
							<tr>\
								<td>Daniel</td>\
								<td>Daniel</td>\
								<td>536 BC</td>\
								<td>Babylon</td>\
							</tr>\
							<tr>\
								<td>Hosea</td>\
								<td>Hosea</td>\
								<td>745 BC</td>\
								<td>Samaria District</td>\
							</tr>\
							<tr>\
								<td>Joel</td>\
								<td>Joel</td>\
								<td>820 BC</td>\
								<td>Judah when the kingdom is divided</td>\
							</tr>\
							<tr>\
								<td>Amos</td>\
								<td>Amos</td>\
								<td>803 BC</td>\
								<td>Judah</td>\
							</tr>\
							<tr>\
								<td>Obadiah</td>\
								<td>Obadiah</td>\
								<td>807 BC</td>\
								<td>Babylon during captivity</td>\
							</tr>\
							<tr>\
								<td>Jonah</td>\
								<td>Jonah</td>\
								<td>844 BC</td>\
								<td></td>\
							</tr>\
							<tr>\
								<td>Micah</td>\
								<td>Micah</td>\
								<td>716 BC</td>\
								<td>Judah</td>\
							</tr>\
							<tr>\
								<td>Nahum</td>\
								<td>Nahum</td>\
								<td>532 BC</td>\
								<td>Judah</td>\
							</tr>\
							<tr>\
								<td>Habakkuk</td>\
								<td>Havakkuk</td>\
								<td>628 BC</td>\
								<td>Judah</td>\
							</tr>\
							<tr>\
								<td>Zephaniah</td>\
								<td>Zephaniah</td>\
								<td>648 BC</td>\
								<td>Judah</td>\
							</tr>\
							<tr>\
								<td>Haggai</td>\
								<td>Haggai</td>\
								<td>520 BC</td>\
								<td>Jerusalem was rebuilt</td>\
							</tr>\
							<tr>\
								<td>Zechariah</td>\
								<td>Zechariah</td>\
								<td>518 BC</td>\
								<td>Jerusalem was rebuilt</td>\
							</tr>\
							<tr>\
								<td>Malachi</td>\
								<td>Malachi</td>\
								<td>443 BC</td>\
								<td>Jerusalem was rebuilt</td>\
							</tr>';
		var new_books_info='<tr>\
								<td>Matthew</td>\
								<td>Matthew</td>\
								<td>41 AD</td>\
								<td>Palestine</td>\
							</tr>\
							<tr>\
								<td>Mark</td>\
								<td>Mark</td>\
								<td>60-65 AD</td>\
								<td>Rome</td>\
							</tr>\
							<tr>\
								<td>Luke</td>\
								<td>Luke</td>\
								<td>56 AD</td>\
								<td>Caesarea</td>\
							</tr>\
							<tr>\
								<td>John</td>\
								<td>John</td>\
								<td>98 AD</td>\
								<td>Ephesus</td>\
							</tr>\
							<tr>\
								<td>Acts</td>\
								<td>Luke</td>\
								<td>61 AD</td>\
								<td>Rome</td>\
							</tr>\
							<tr>\
								<td>Romans</td>\
								<td>Paul</td>\
								<td>56 AD</td>\
								<td>Corinth</td>\
							</tr>\
							<tr>\
								<td>I Corinthians</td>\
								<td>Paul</td>\
								<td>55 AD</td>\
								<td>Ephesus</td>\
							</tr>\
							<tr>\
								<td>II Corinthians</td>\
								<td>Paul</td>\
								<td>55 AD</td>\
								<td>Macedonia</td>\
							</tr>\
							<tr>\
								<td>Galatians</td>\
								<td>Paul</td>\
								<td>50-52 AD</td>\
								<td>Corinth and Antioch</td>\
							</tr>\
							<tr>\
								<td>Ephesians</td>\
								<td>Paul</td>\
								<td>60-61 AD</td>\
								<td>Rome</td>\
							</tr>\
							<tr>\
								<td>Philippians</td>\
								<td>Paul</td>\
								<td>60-61 AD</td>\
								<td>Rome</td>\
							</tr>\
							<tr>\
								<td>Colossians</td>\
								<td>Paul</td>\
								<td>60-61 AD</td>\
								<td>Rome</td>\
							</tr>\
							<tr>\
								<td>I Thessalonians</td>\
								<td>Paul</td>\
								<td>50 AD</td>\
								<td>Corinth</td>\
							</tr>\
							<tr>\
								<td>II Thessalonians</td>\
								<td>Paul</td>\
								<td>51 AD</td>\
								<td>Corinth</td>\
							</tr>\
							<tr>\
								<td>I Timothy</td>\
								<td>Paul</td>\
								<td>61-64 AD</td>\
								<td>Macedonia</td>\
							</tr>\
							<tr>\
								<td>II Timothy</td>\
								<td>Paul</td>\
								<td>65 AD</td>\
								<td>Rome</td>\
							</tr>\
							<tr>\
								<td>Titus</td>\
								<td>Paul</td>\
								<td>61-64 AD</td>\
								<td>Macedonia</td>\
							</tr>\
							<tr>\
								<td>Philemon</td>\
								<td>Paul</td>\
								<td>60-61 AD</td>\
								<td>Rome</td>\
							</tr>\
							<tr>\
								<td>Hebrew</td>\
								<td>Paul</td>\
								<td>61 AD</td>\
								<td>Rome</td>\
							</tr>\
							<tr>\
								<td>James</td>\
								<td>James</td>\
								<td>61-62 AD</td>\
								<td>Jerusalem</td>\
							</tr>\
							<tr>\
								<td>I Peter</td>\
								<td>St. Peter</td>\
								<td>62-64 AD</td>\
								<td>Babylon</td>\
							</tr>\
							<tr>\
								<td>II Peter</td>\
								<td>St. Peter</td>\
								<td>64 AD</td>\
								<td>Babylon</td>\
							</tr>\
							<tr>\
								<td>I John</td>\
								<td>John</td>\
								<td>98 AD</td>\
								<td>Ephesus</td>\
							</tr>\
							<tr>\
								<td>II John</td>\
								<td>John</td>\
								<td>98 AD</td>\
								<td>Ephesus</td>\
							</tr>\
							<tr>\
								<td>III John</td>\
								<td>John</td>\
								<td>98 AD</td>\
								<td>Near Ephesus</td>\
							</tr>\
							<tr>\
								<td>Jude</td>\
								<td>Jude</td>\
								<td>65 AD</td>\
								<td>Palestine</td>\
							</tr>\
							<tr>\
								<td>Revelations</td>\
								<td>John</td>\
								<td>96 AD</td>\
								<td>Island of Patmos</td>\
						</tbody>';
		var books_all_info_foot =
						'<tfoot>\
							<tr>\
								<td colspan="4">\
									<button class="btn btn-sm btn-default pull-right" data-dismiss="modal">Close</button>\
								</td>\
							</tr>\
						</tfoot>\
					</table>\
				</div>';

		$("#old-books-info").html(books_all_info + old_books_info + books_all_info_foot);
		$("#new-books-info").html(books_all_info + new_books_info + books_all_info_foot);
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