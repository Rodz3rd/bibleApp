<?php 

require_once "Bible.php";

if ( isset( $_GET['initialLoadPage'] ) ) {
	echo json_encode(Bible::getAllBooks());
} elseif ( isset( $_GET['readEvent'] ) ) {
	$book_id = $_GET['book_id'];

	echo json_encode(
			[
				'book_name'   => Bible::getBook($book_id),
				'max_chapter' => Bible::getMaxChapter($book_id),
				'max_verse'	  => Bible::getMaxVerse($book_id, 1),
				'verse_text'  => Bible::getVerseText($book_id, 1, 1)
			]
	);
} elseif ( isset( $_GET['infoEvent'] ) ) {
	$book_id = $_GET['book_id'];

	echo json_encode(
		[
			'book_name' => Bible::getBook($book_id),
			'book_info' => Bible::getInfo($book_id)
		]
	);

} elseif ( isset( $_GET['watchEvent'] ) ) {
	$book_id = $_GET['book_id'];

	echo json_encode(
		[
			'book_name' => Bible::getBook($book_id),
			'book_url'  => Bible::getUrl($book_id)
		]
	);
} elseif ( isset( $_GET['chapterChangeEvent'] ) ) {
	$book_id = $_GET['book_id'];
	$chapter = $_GET['chapter'];

	$verse   = isset( $_GET['verse'] ) ? $_GET['verse'] : 1;

	echo json_encode(
		[
			'max_verse'  => Bible::getMaxVerse($book_id, $chapter),
			'verse_text' => Bible::getVerseText($book_id, $chapter, $verse),
		]
	);
} elseif ( $_GET['event'] == "nextBtnPress" ) {
	$book_id = $_GET['book_id'];
	$chapter = $_GET['chapter'];
	$verse   = isset( $_GET['verse'] ) ? $_GET['verse'] : 1;

	echo Bible::getMaxVerse($book_id, $chapter);
} elseif ( $_GET['event'] == "displayVerseText" ) {
	$book_id = $_GET['book_id'];
	$chapter = $_GET['chapter'];
	$verse   = isset( $_GET['verse'] ) ? $_GET['verse'] : 1;

	echo Bible::getVerseText($book_id, $chapter, $verse);
} else {
	echo false;
}

exit;