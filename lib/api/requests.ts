export const fetchItems = async () => {
	const res = await fetch('http://localhost:5000/items');
	const data = await res.json();
	return data;
};
