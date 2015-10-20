<?php

require_once "config.php";

class Bible {
	public static function getAllBooks() {
		try {
			global $db;

			$query = "SELECT * FROM books";
			$result = $db->query($query);

			if ( $result != false ) {
				while ( $row = $result->fetch_assoc() ) {
					$rows[] = $row;
				}
				$result->free();
			} else {
				return false;
			}

			return $rows;
		} catch (Exception $e) {
			error_log( $e->getMessage() );
			return false;
		}
	}

	public static function getBook($book_id) {
		try {
			global $db;

			$query = "SELECT * FROM books WHERE id=$book_id";
			$result = $db->query($query);

			if ( $result != false ) {
				$row = $result->fetch_assoc();
				return $row['book_name'];
			} else {
				return false;
			}
		} catch (Exception $e) {
			error_log( $e->getMessage() );
			return false;
		}
	}

	public static function getMaxChapter($book_id) {
		try {
			global $db;

			$query = "SELECT MAX(chapter_number) AS chapter FROM content WHERE book_id=$book_id";
			$result = $db->query($query);

			if ( $result != false ) {
				$row = $result->fetch_assoc();
				return $row['chapter'];
			} else {
				return false;
			}
		} catch (Exception $e) {
			error_log( $e->getMessage() );
			return false;
		}
	}

	public static function getMaxVerse($book_id, $chapter) {
		try {
			global $db;

			$query = "SELECT MAX(verse_number) AS verse FROM content
						WHERE book_id=$book_id AND chapter_number=$chapter";
			$result = $db->query($query);

			if ( $result != false ) {
				$row = $result->fetch_assoc();
				return $row['verse'];
			} else {
				return false;
			}
		} catch (Exception $e) {
			error_log( $e->getMessage() );
			return false;
		}
	}

	public static function getVerseText($book_id, $chapter, $verse) {
		try {
			global $db;

			$query = "SELECT verse_text FROM content
						WHERE book_id=$book_id AND chapter_number=$chapter AND verse_number=$verse";
			$result = $db->query($query);

			if ( $result != false ) {
				$row = $result->fetch_assoc();
				return $row['verse_text'];
			} else {
				return false;
			}
		} catch (Exception $e) {
			error_log( $e->getMessage() );
			return false;
		}
	}

	public static function getInfo($book_id) {
		try {
			global $db;

			$query = "SELECT info FROM info WHERE book_id=$book_id";
			$result = $db->query($query);

			if ( $result != false ) {
				$info = $result->fetch_assoc();
				return $info['info'];
			} else {
				return false;
			}
		} catch (Exception $e) {
			error_log( $e->getMessage() );
			return false;			
		}
	}

	public static function getUrl($book_id) {
		try {
			global $db;

			$query = "SELECT url FROM url WHERE book_id=$book_id";
			$result = $db->query($query);

			if ( $result != false ) {
				$url = $result->fetch_assoc();
				return $url['url'];
			} else {
				return false;
			}
		} catch (Exception $e) {
			error_log( $e->getMessage() );
			return false;			
		}
	}
}