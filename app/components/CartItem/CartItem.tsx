import React from 'react';
import styles from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import {
	increaseQuantity,
	decreaseQuantity,
	removeFromCart,
} from '@/lib/redux';
type Item = {
	id: string;
	name: string;
	price: number;
	weight: string;
	oldPrice?: number;
	state: {
		quantity: number;
	};
};

const CartItem: React.FC<Item> = ({
	name,
	price,
	oldPrice,
	weight,
	id,
	state,
}) => {
	const dispatch = useDispatch();

	return (
		<div className={styles.item_wrapper}>
			<div className={styles.item_image}></div>
			<div className={styles.info_wrapper}>
				<div className={styles.item_desc}>
					<div className={styles.item_name_wrapper}>
						<h1 className={styles.item_name}>{name}</h1>
						<p className={styles.item_weight}>{weight}</p>
					</div>

					<div className={styles.item_quantity_wrapper}>
						<div className={styles.item_quantity_buttons_wrapper}>
							<button
								onClick={() => dispatch(decreaseQuantity(id))}
								className={styles.item_quantity_button}
							>
								-
							</button>
							<p className={styles.item_quantity}>{state.quantity}</p>
							<button
								onClick={() => {
									dispatch(increaseQuantity(id));
								}}
								className={styles.item_quantity_button}
							>
								+
							</button>
						</div>

						<p
							onClick={() => dispatch(removeFromCart(id))}
							className={styles.item_remove}
						>
							Ukloni
						</p>
					</div>
				</div>

				<div className={styles.item_price_wrapper}>
					<h1 className={styles.item_price}>
						<label>{price}</label> <label>RSD</label>
					</h1>
					{oldPrice && (
						<h1 className={styles.old_item_price}>
							<label>{oldPrice}</label> <label>RSD</label>
						</h1>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartItem;
