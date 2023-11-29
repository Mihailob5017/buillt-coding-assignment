'use client';
import React from 'react';
import styles from './items.module.css';
import { fetchItems } from '@/lib/api/requests';
import { useSelector, useDispatch } from '../../lib/redux/store';
import { loadItems } from '@/lib/redux';
import Item from '../components/Items/Item';
import * as messages from './Items.messages';
import { Nav } from '../components/Nav/Nav';
const Items = () => {
	const { items, item_count } = useSelector((state) => state.items);
	const dispatch = useDispatch();

	React.useEffect(() => {
		fetchItems().then((res) => {
			dispatch(loadItems(res));
		});
	}, []);

	return (
		<>
			<Nav />
			<div className={styles.items_header}>
				<p>{messages.ItemsHeader1}</p>
				<p>{messages.ItemsHeader2(item_count)}</p>
			</div>
			<div className={styles.items_grid}>
				{items.map((el) => (
					<Item key={el.id} {...el} />
				))}
			</div>
			;
		</>
	);
};

export default Items;
