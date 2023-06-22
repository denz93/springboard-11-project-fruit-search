/** @type {HTMLInputElement} */
const $input = document.querySelector('#fruit');
/** @type {HTMLUListElement} */
const $suggestions = document.querySelector('.suggestions ul');

const HAS_SUGGESTIONS_CLASS = 'has-suggestions'
const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let result = [];

	// TODO
	result = fruit.filter(fruitName => fruitName.toLowerCase().includes(str.toLowerCase()))
	return result;
}

/** @param {KeyboardEvent} e */
function searchHandler(e) {
	// TODO
	const searchStr = $input.value
	const fruits = search(searchStr)
	showSuggestions(fruits, searchStr)
}

/** 
 * @param {string[]} results
 * @param {string} inputVal 
 * */
function showSuggestions(results, inputVal) {

	// TODO
	clearChildren($suggestions)

	const eleList = results.map(fruitName => {
		const $ele = document.createElement('li')
		$ele.dataset.fruit = fruitName
		$ele.innerHTML = highlightText(fruitName, inputVal)
		return $ele
	})
	if (eleList.length > 0) {
		$suggestions.classList.add(HAS_SUGGESTIONS_CLASS)
	} else {
		$suggestions.classList.remove(HAS_SUGGESTIONS_CLASS)
	}
	$suggestions.append(...eleList)
}

/** @param {MouseEvent} e */
function useSuggestion(e) {
	// TODO
	/** @type {HTMLElement} */
	const target = e.target.tagName === 'LI' ? e.target : e.target.parentNode
	const fruitName = target.dataset.fruit
	$input.value = fruitName
	$suggestions.classList.remove(HAS_SUGGESTIONS_CLASS)
}

/** @param {HTMLElement} $ele */
function clearChildren($ele) {
	while ($ele.children.length > 0) {
		$ele.lastChild.remove()
	}
}

/** 
 * @param {string} text
 * @param {string} search
 */
function highlightText(text, search) {
	const startIdx = text.toLowerCase().indexOf(search.toLowerCase())
	const endIdx = startIdx + search.length - 1
	return `${text.substring(0, startIdx)}<b>${text.substring(startIdx, endIdx+1)}</b>${text.substring(endIdx+1)}`
}

$input.addEventListener('keyup', searchHandler);
$suggestions.addEventListener('click', useSuggestion);